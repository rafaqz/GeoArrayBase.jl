using Rasters, DimensionalData, Test, Statistics, Dates, CFTime, Plots
using Rasters.LookupArrays, Rasters.Dimensions
import ArchGDAL, NCDatasets
using Rasters: FileArray, FileStack, NCDfile, crs
include(joinpath(dirname(pathof(Rasters)), "../test/test_utils.jl"))

ncexamples = "https://www.unidata.ucar.edu/software/netcdf/examples/"
ncsingle = maybedownload(joinpath(ncexamples, "tos_O1_2001-2002.nc"))
ncmulti = maybedownload(joinpath(ncexamples, "test_echam_spectral.nc"))

stackkeys = (
    :abso4, :aclcac, :aclcov, :ahfcon, :ahfice, :ahfl, :ahfliac, :ahfllac,
    :ahflwac, :ahfres, :ahfs, :ahfsiac, :ahfslac, :ahfswac, :albedo, :albedo_nir,
    :albedo_nir_dif, :albedo_nir_dir, :albedo_vis, :albedo_vis_dif, :albedo_vis_dir,
    :alsobs, :alsoi, :alsol, :alsom, :alsow, :ameltdepth, :ameltfrac, :amlcorac,
    :ao3, :apmeb, :apmegl, :aprc, :aprl, :aprs, :aps, :az0i, :az0l, :az0w,
    :barefrac, :dew2, :drain, :evap, :evapiac, :evaplac, :evapwac, :fage, :friac,
    :geosp, :glac, :gld, :hyai, :hyam, :hybi, :hybm, :lsp, :q, :qres, :qvi, :relhum,
    :runoff, :sd, :seaice, :siced, :sicepdi, :sicepdw, :sicepres, :slm, :sn, :snacl,
    :snc, :sni, :snifrac, :snmel, :sofliac, :sofllac, :soflwac, :srad0, :srad0d,
    :srad0u, :sradl, :srads, :sradsu, :sraf0, :srafl, :srafs, :st, :svo, :t2max,
    :t2min, :temp2, :thvsig, :topmax, :tpot, :trad0, :tradl, :trads, :tradsu,
    :traf0, :trafl, :trafs, :trfliac, :trfllac, :trflwac, :tropo, :tsi, :tsicepdi,
    :tslm1, :tsurf, :tsw, :u10, :ustr, :ustri, :ustrl, :ustrw, :v10, :vdis, :vdisgw,
    :vstr, :vstri, :vstrl, :vstrw, :wimax, :wind10, :wl, :ws, :wsmx, :xi, :xivi,
    :xl, :xlvi
)

@testset "Raster" begin
    @time ncarray = Raster(ncsingle)

    @testset "lazyness" begin
        @time read(Raster(ncsingle));
        @time lazyarray = Raster(ncsingle; lazy=true);
        @time eagerarray = Raster(ncsingle; lazy=false);
        # Lazy is the default
        @test parent(ncarray) isa FileArray
        @test parent(lazyarray) isa FileArray
        @test parent(eagerarray) isa Array
    end

    @testset "open" begin
        @test all(open(A -> A[Y=1], ncarray) .=== ncarray[:, 1, :])
    end

    @testset "read" begin
        @time A = read(ncarray);
        @test A isa Raster
        @test parent(A) isa Array
        A2 = zero(A)
        @time read!(ncarray, A2);
        A3 = zero(A)
        @time read!(ncsingle, A3)
        @test all(A .=== A2) 
        @test all(A .=== A3)
    end

    @testset "array properties" begin
        @test size(ncarray) == (180, 170, 24)
        @test ncarray isa Raster
        @test index(ncarray, Ti) == DateTime360Day(2001, 1, 16):Month(1):DateTime360Day(2002, 12, 16)
        @test index(ncarray, Y) == -79.5:89.5
        @test index(ncarray, X) == 1.0:2:359.0
        @test bounds(ncarray) == (
            (0.0, 360.0), 
            (-80.0, 90.0), 
            (DateTime360Day(2001, 1, 1), DateTime360Day(2003, 1, 1)),
        )
    end

    @testset "dimensions" begin
        @test ndims(ncarray) == 3
        @test length.(dims(ncarray)) == (180, 170, 24)
        @test dims(ncarray) isa Tuple{<:X,<:Y,<:Ti}
        @test refdims(ncarray) == ()
        @test val.(span(ncarray)) == 
            (vcat((0.0:2.0:358.0)', (2.0:2.0:360.0)'),
             vcat((-80.0:89.0)', (-79.0:90.0)'),
             vcat(permutedims(DateTime360Day(2001, 1, 1):Month(1):DateTime360Day(2002, 12, 1)), 
                  permutedims(DateTime360Day(2001, 2, 1):Month(1):DateTime360Day(2003, 1, 1)))
            )
        @test typeof(lookup(ncarray)) <: Tuple{<:Mapped,<:Mapped,<:Sampled}
        @test bounds(ncarray) == ((0.0, 360.0), (-80.0, 90.0), (DateTime360Day(2001, 1, 1), DateTime360Day(2003, 1, 1)))
    end
    tempfile = tempname() * ".nc"


    @testset "other fields" begin
        @test ismissing(missingval(ncarray))
        @test metadata(ncarray) isa Metadata{NCDfile}
        @test name(ncarray) == :tos
    end

    @testset "indexing" begin
        @test ncarray[Ti(1)] isa Raster{<:Any,2}
        @test ncarray[Y(1), Ti(1)] isa Raster{<:Any,1}
        @test ncarray[X(1), Ti(1)] isa Raster{<:Any,1}
        @test ncarray[X(1), Y(1), Ti(1)] isa Missing
        @test ncarray[X(30), Y(30), Ti(1)] isa Float32
        # Russia
        @test ncarray[X(50), Y(100), Ti(1)] isa Missing
        # Alaska
        @test ncarray[Y(Near(64.2008)), X(Near(149.4937)), Ti(1)] isa Missing
        @test ncarray[Ti(2), X(At(59.0)), Y(At(-50.5))] == ncarray[30, 30, 2] === 278.47168f0
    end

    @testset "methods" begin 
        @testset "mean" begin
            @test all(mean(ncarray; dims=Y) .=== mean(parent(ncarray); dims=2))
        end
        @testset "trim, crop, extend" begin
            a = read(ncarray)
            a[X(1:20)] .= missingval(a)
            trimmed = trim(a)
            @test size(trimmed) == (160, 169, 24)
            cropped = crop(a; to=trimmed)
            @test size(cropped) == (160, 169, 24)
            @test all(collect(cropped .=== trimmed))
            extended = extend(cropped; to=a)
            @test all(collect(extended .=== a))
        end
        @testset "mask and mask!" begin
            msk = read(ncarray)
            msk[X(1:100), Y([1, 5, 95])] .= missingval(msk)
            @test !all(ncarray[X(1:100)] .=== missingval(msk))
            masked = mask(ncarray; with=msk)
            @test all(masked[X(1:100), Y([1, 5, 95])] .=== missingval(msk))
            tempfile = tempname() * ".nc"
            cp(ncsingle, tempfile)
            @test !all(Raster(tempfile)[X(1:100), Y([1, 5, 95])] .=== missing)
            open(Raster(tempfile); write=true) do A
                mask!(A; with=msk, missingval=missing)
                # TODO: replace the CFVariable with a FileArray{NCDfile} so this is not required
                nothing
            end
            @test all(Raster(tempfile)[X(1:100), Y([1, 5, 95])] .=== missing)
            rm(tempfile)
        end
        @testset "mosaic" begin
            @time ncarray = Raster(ncsingle)
            A1 = ncarray[X(1:80), Y(1:100)]
            A2 = ncarray[X(50:150), Y(90:150)]
            tempfile = tempname() * ".nc"
            Afile = mosaic(first, read(A1), read(A2); missingval=missing, atol=1e-7, filename=tempfile)
            Amem = mosaic(first, A1, A2; missingval=missing, atol=1e-7)
            Atest = ncarray[X(1:150), Y(1:150)]
            Atest[X(1:49), Y(101:150)] .= missing
            Atest[X(81:150), Y(1:89)] .= missing
            @test all(Atest .=== Afile .=== Amem)
        end
        @testset "chunk_series" begin
            @test Rasters.chunk_series(ncarray) isa RasterSeries
            @test size(Rasters.chunk_series(ncarray)) == (1, 1, 1)
        end
        @testset "slice" begin
            @test_throws ArgumentError Rasters.slice(ncarray, Z)
            ser = Rasters.slice(ncarray, Ti) 
            @test ser isa RasterSeries
            @test size(ser) == (24,)
            @test index(ser, Ti) == DateTime360Day(2001, 1, 16):Month(1):DateTime360Day(2002, 12, 16)
            @test bounds(ser) == ((DateTime360Day(2001, 1, 1), DateTime360Day(2003, 1, 1)),)
            A = ser[1]
            @test index(A, Y) == -79.5:89.5
            @test index(A, X) == 1.0:2:359.0
            @test bounds(A) == ((0.0, 360.0), (-80.0, 90.0))
        end
    end

    @testset "indexing with reverse lat" begin
        if !haskey(ENV, "CI") # CI downloads fail. But run locally
            ncrevlat = maybedownload("ftp://ftp.cdc.noaa.gov/Datasets/noaa.ersst.v5/sst.mon.ltm.1981-2010.nc")
            ncrevlatarray = Raster(ncrevlat; key=:sst, missingval=-9.96921f36)
            @test order(dims(ncrevlatarray, Y)) == ReverseOrdered()
            @test ncrevlatarray[Y(At(40)), X(At(100)), Ti(1)] == missingval(ncrevlatarray)
            @test ncrevlatarray[Y(At(-40)), X(At(100)), Ti(1)] == ncrevlatarray[51, 65, 1] == 14.5916605f0
            @test val(span(ncrevlatarray, Ti)) == Month(1)
            @test val(span(ncrevlatarray, Ti)) isa Month # Not CompoundPeriod
        end
    end

    @testset "selectors" begin
        a = ncarray[X(At(21.0)), Y(Between(50, 52)), Ti(Near(DateTime360Day(2002, 12)))]
        @test bounds(a) == ((50.0, 52.0),)
        x = ncarray[X(Near(150)), Y(Near(30)), Ti(1)]
        size(ncarray)
        @test x isa Float32
        lookup(ncarray)
        dimz = X(Between(-0.0, 360)), Y(Between(-90, 90)), 
               Ti(Between(DateTime360Day(2001, 1, 1), DateTime360Day(2003, 01, 02)))
        @test size(ncarray[dimz...]) == (180, 170, 24)
        @test index(ncarray[dimz...]) == index(ncarray)
        nca = ncarray[Y(Between(-80, -25)), X(Between(-0.0, 180.0)), Ti(Contains(DateTime360Day(2002, 02, 20)))]
        @test size(nca) == (90, 55)
        @test index(nca, Y) == index(ncarray[1:90, 1:55, 2], Y)
        @test all(nca .=== ncarray[1:90, 1:55, 14])
    end

    @testset "conversion to Raster" begin
        geoA = ncarray[X(1:50), Y(20:20), Ti(1)]
        @test size(geoA) == (50, 1)
        @test eltype(geoA) <: Union{Missing,Float32}
        @test geoA isa Raster{Union{Missing,Float32},2}
        @test dims(geoA) isa Tuple{<:X,<:Y}
        @test refdims(geoA) isa Tuple{<:Ti}
        @test metadata(geoA) == metadata(ncarray)
        @test ismissing(missingval(geoA))
        @test name(geoA) == :tos
    end

    @testset "write" begin
        @testset "to netcdf" begin
            # TODO save and load subset
            geoA = read(ncarray)
            @test size(geoA) == size(ncarray)
            filename = tempname() * ".nc"
            write(filename, geoA)
            saved = read(Raster(filename))
            @test size(saved) == size(geoA)
            @test refdims(saved) == refdims(geoA)
            @test missingval(saved) === missingval(geoA)
            @test map(metadata.(dims(saved)), metadata.(dims(Raster))) do s, g
                all(s .== g)
            end |> all
            @test metadata(saved) == metadata(geoA)
            @test all(metadata.(dims(saved)) == metadata.(dims(geoA)))
            @test Rasters.name(saved) == Rasters.name(geoA)
            @test all(lookup.(dims(saved)) .== lookup.(dims(geoA)))
            @test all(order.(dims(saved)) .== order.(dims(geoA)))
            @test all(typeof.(span.(dims(saved))) .== typeof.(span.(dims(geoA))))
            @test all(val.(span.(dims(saved))) .== val.(span.(dims(geoA))))
            @test all(sampling.(dims(saved)) .== sampling.(dims(geoA)))
            @test typeof(dims(saved)) <: typeof(dims(geoA))
            @test index(saved, 3) == index(geoA, 3)
            @test all(val.(dims(saved)) .== val.(dims(geoA)))
            @test all(parent(saved) .=== parent(geoA))
            @test saved isa typeof(geoA)
            # TODO test crs

            # test for nc `kw...`
            geoA = read(ncarray)
            write("tos.nc", geoA) # default `deflatelevel = 0`
            write("tos_small.nc", geoA; deflatelevel=2)
            @test filesize("tos_small.nc") * 1.5 < filesize("tos.nc") # compress ratio >= 1.5
            isfile("tos.nc") && rm("tos.nc")
            isfile("tos_small.nc") && rm("tos_small.nc")

            # test for nc `append`
            n = 100
            x = rand(n, n)
            r1 = Raster(x, (X, Y); name = "v1")
            r2 = Raster(x, (X, Y); name = "v2")
            f = "test.nc"
            isfile(f) && rm(f)
            write(f, r1, append = false); size1 = filesize(f)
            write(f, r2; append = true); size2 = filesize(f)
            @test size2 > size1*1.8 # two variable 
            isfile(f) && rm(f)
        end
        @testset "to gdal" begin
            gdalfilename = tempname() * ".tif"
            nccleaned = replace_missing(ncarray[Ti(1)], -9999.0)
            write(gdalfilename, nccleaned)
            gdalarray = Raster(gdalfilename)
            # gdalarray WKT is missing one AUTHORITY
            # @test_broken crs(gdalarray) == convert(WellKnownText, EPSG(4326))
            # But the Proj representation is the same
            @test convert(ProjString, crs(gdalarray)) == convert(ProjString, EPSG(4326))
            @test bounds(gdalarray) == (bounds(nccleaned)..., (1, 1))
            # Tiff locus = Start, Netcdf locus = Center
            @test reverse(index(gdalarray, Y)) .+ 0.5 ≈ index(nccleaned, Y)
            @test index(gdalarray, X) .+ 1.0  ≈ index(nccleaned, X)
            @test reverse(Raster(gdalarray); dims=Y()) ≈ nccleaned
        end
        @testset "to grd" begin
            nccleaned = replace_missing(ncarray[Ti(1)], -9999.0)
            write("testgrd.gri", nccleaned)
            grdarray = Raster("testgrd.gri");
            @test crs(grdarray) == convert(ProjString, EPSG(4326))
            @test bounds(grdarray) == (bounds(nccleaned)..., (1, 1))
            @test reverse(index(grdarray, Y)) ≈ index(nccleaned, Y) .- 0.5
            @test index(grdarray, X) ≈ index(nccleaned, X) .- 1.0
            @test Raster(grdarray) ≈ reverse(nccleaned; dims=Y)
        end
    end

    @testset "show" begin
        sh = sprint(show, MIME("text/plain"), ncarray)
        # Test but don't lock this down too much
        @test occursin("Raster", sh)
        @test occursin("Y", sh)
        @test occursin("X", sh)
        @test occursin("Time", sh)
    end

    @testset "plot" begin
        ncarray[Ti(1:3:12)] |> plot
        ncarray[Ti(1)] |> plot
        ncarray[Y(100), Ti(1)] |> plot
    end

end

@testset "Single file stack" begin
    @time ncstack = RasterStack(ncmulti)

    @testset "lazyness" begin
        @time read(RasterStack(ncmulti));
        @time lazystack = RasterStack(ncmulti; lazy=true)
        @time eagerstack = RasterStack(ncmulti; lazy=false);
        # Lazy is the default
        @test parent(ncstack[:xi]) isa FileArray
        @test parent(lazystack[:xi]) isa FileArray
        @test parent(eagerstack[:xi]) isa Array
    end

    @testset "load ncstack" begin
        @test ncstack isa RasterStack
        @test ismissing(missingval(ncstack))
        @test metadata(ncstack) isa Metadata{NCDfile}
        @test dims(ncstack[:abso4]) == dims(ncstack, (X, Y, Ti)) 
        @test refdims(ncstack) == ()
        # Loads child as a regular Raster
        @test ncstack[:albedo] isa Raster{<:Any,3}
        @test ncstack[:albedo][2, 3, 1] isa Float32
        @test ncstack[:albedo][:, 3, 1] isa Raster{<:Any,1}
        @test_throws ErrorException ncstack[:not_a_key]
        @test dims(ncstack[:albedo]) isa Tuple{<:X,<:Y,<:Ti}
        @test keys(ncstack) isa NTuple{131,Symbol}
        @test keys(ncstack) == stackkeys
        @test first(keys(ncstack)) == :abso4
        @test metadata(ncstack) isa Metadata{NCDfile}
        @test metadata(ncstack)["institution"] == "Max-Planck-Institute for Meteorology"
        @test metadata(ncstack[:albedo]) isa Metadata{NCDfile}
        @test metadata(ncstack[:albedo])["long_name"] == "surface albedo"
        # Test some DimensionalData.jl tools work
        # Time dim should be reduced to length 1 by mean
        @test axes(mean(ncstack[:albedo, Y(1:20)] , dims=Ti)) ==
              (Base.OneTo(192), Base.OneTo(20), Base.OneTo(1))
        geoA = ncstack[:albedo][Ti(4:6), X(1), Y(2)]
        @test geoA == ncstack[:albedo, Ti(4:6), X(1), Y(2)]
        @test size(geoA) == (3,)
    end

    if VERSION > v"1.1-"
        @testset "copy" begin
            geoA = read(ncstack[:albedo]) .* 2
            copy!(geoA, ncstack, :albedo);
            # First wrap with Raster() here or == loads from disk for each cell.
            # we need a general way of avoiding this in all disk-based sources
            @test geoA == read(ncstack[:albedo])
        end
    end

    @testset "indexing" begin
        ncmultistack = RasterStack(ncsingle)
        @test dims(ncmultistack[:tos]) isa Tuple{<:X,<:Y,<:Ti}
        @test ncmultistack[:tos] isa Raster{<:Any,3}
        @test ncmultistack[:tos][Ti(1)] isa Raster{<:Any,2}
        @test ncmultistack[:tos, Y(1), Ti(1)] isa Raster{<:Any,1}
        @test ncmultistack[:tos, 8, 30, 10] isa Float32
    end

    @testset "Subsetting keys" begin
        smallstack = subset(ncstack, (:albedo, :evap, :runoff))
        @test keys(smallstack) == (:albedo, :evap, :runoff)
    end

    # This is slow. We combine read/save to reduce test time
    # And it seems the memory is not garbage collected??
    @testset "read and write" begin
        @time st = read(ncstack)
        @test st isa RasterStack
        @test st.data isa NamedTuple
        @test first(st.data) isa Array
        length(dims(st[:aclcac]))
        filename = tempname() * ".nc"
        write(filename, st);
        saved = RasterStack(RasterStack(filename))
        @test keys(saved) == keys(st)
        @test metadata(saved)["advection"] == "Lin & Rood"
        @test metadata(saved) == metadata(st) == metadata(ncstack)
        @test all(first(DimensionalData.layers(saved)) .== first(DimensionalData.layers(st)))
    end

    @testset "show" begin
        ncstack = view(RasterStack(ncmulti), X(7:99), Y(3:90));
        sh = sprint(show, MIME("text/plain"), ncstack)
        # Test but don't lock this down too much
        @test occursin("RasterStack", sh)
        @test occursin("Y", sh)
        @test occursin("X", sh)
        @test occursin("Ti", sh)
        @test occursin(":tropo", sh)
        @test occursin(":tsurf", sh)
        @test occursin(":aclcac", sh)
        @test occursin("test_echam_spectral.nc", sh)
    end

end

@testset "series" begin
    @time ncseries = RasterSeries([ncsingle, ncsingle], (Ti,); child=RasterStack)
    @testset "read" begin
        @time geoseries = read(ncseries)
        @test geoseries isa RasterSeries{<:RasterStack}
        @test geoseries.data isa Vector{<:RasterStack}
    end
    geoA = Raster(ncsingle; key=:tos)
    @test all(read(ncseries[Ti(1)][:tos]) .=== read(geoA))
end

nothing
