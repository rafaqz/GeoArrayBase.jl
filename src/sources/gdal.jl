export GDALstack, GDALarray

const AG = ArchGDAL

const GDAL_X_INDEX = ForwardIndex()
const GDAL_Y_INDEX = ReverseIndex()
const GDAL_BAND_INDEX = ForwardIndex()
const GDAL_X_ARRAY = ForwardArray()
const GDAL_Y_ARRAY = ReverseArray()
const GDAL_BAND_ARRAY = ForwardArray()
const GDAL_RELATION = ForwardRelation()
const GDAL_X_LOCUS = Start()
const GDAL_Y_LOCUS = Start()

# Array ######################################################################## @deprecate GDALarray(args...; kw...) GeoArray(args...; source=GDALfile, kw...)

@deprecate GDALarray(args...; kw...) GeoArray(args...; source=GDALfile, kw...)

function FileArray(raster::AG.RasterDataset{T}, filename; kw...) where {T}
    eachchunk = DA.eachchunk(raster)
    haschunks = DA.haschunks(raster)
    FileArray{GDALfile,T,3}(filename, size(raster); eachchunk, haschunks, kw...)
end

cleanreturn(A::AG.RasterDataset) = Array(A)

haslayers(::Type{GDALfile}) = false

# AbstractGeoArray methods

"""
    Base.write(filename::AbstractString, ::Type{GDALfile}, A::AbstractGeoArray; kw...)

Write a `GeoArray` to file using GDAL.

# Keywords

- `driver::String`: a GDAL driver name. Guessed from the filename extension by default.
- `compress::String`: GeoTIFF compression flag. "DEFLATE" by default.
- `tiled::Bool`: GeoTiff tiling. Defaults to `true`.

Returns `filename`.
"""
function Base.write(
    filename::AbstractString, ::Type{GDALfile}, A::AbstractGeoArray{T,2}; kw...
) where T
    all(hasdim(A, (X, Y))) || error("Array must have Y and X dims")
    map(dims(A, (X, Y))) do d
    end

    correctedA = _maybe_permute_to_gdal(A) |>
        a -> noindex_to_sampled(a) |>
        a -> reorder(a, (X(GDAL_X_INDEX), Y(GDAL_Y_INDEX))) |>
        a -> reorder(a, GDAL_RELATION)
    checkarrayorder(correctedA, (GDAL_X_ARRAY, GDAL_Y_ARRAY))
    checkindexorder(correctedA, (GDAL_X_INDEX, GDAL_Y_INDEX))

    nbands = 1 
    _gdalwrite(filename, correctedA, nbands; kw...)
end
function Base.write(
    filename::AbstractString, ::Type{GDALfile}, A::AbstractGeoArray{T,3}, kw...
) where T
    all(hasdim(A, (X, Y))) || error("Array must have Y and X dims")
    hasdim(A, Band()) || error("Must have a `Band` dimension to write a 3-dimensional array")

    correctedA = _maybe_permute_to_gdal(A) |>
        a -> noindex_to_sampled(a) |>
        a -> reorder(a, (X(GDAL_X_INDEX), Y(GDAL_Y_INDEX), Band(GDAL_BAND_INDEX))) |>
        a -> reorder(a, GDAL_RELATION)
    checkarrayorder(correctedA, (GDAL_X_ARRAY, GDAL_Y_ARRAY, GDAL_BAND_ARRAY))
    checkindexorder(correctedA, (GDAL_X_INDEX, GDAL_Y_INDEX, GDAL_BAND_INDEX))

    nbands = size(correctedA, Band())
    _gdalwrite(filename, correctedA, nbands; kw...)
end

function create(filename, ::Type{GDALfile}, T::Type, dims::DD.DimTuple; 
    missingval=nothing, metadata=nothing, name=nothing, keys=(name,),
    driver=AG.extensiondriver(filename), compress="DEFLATE", chunk=nothing
)
    if !(keys isa Nothing || keys isa Symbol) && length(keys) > 1
        throw(ArgumentError("GDAL cant write more than one layer per file, but keys $keys have $(length(keys))"))
    end
    x, y = map(DD.dims(dims, (XDim, YDim))) do d
        mode(d) isa NoIndex ? set(d, Sampled) : d
    end
    x = reorder(x, typeof(GDAL_X_INDEX))
    y = reorder(y, typeof(GDAL_Y_INDEX))

    nbands = hasdim(dims, Band) ? length(DD.dims(dims, Band)) : 1
    kw = (width=length(x), height=length(y), nbands=nbands, dtype=T)
    gdaldriver = AG.getdriver(driver)
    if driver == "GTiff"
        # block_x, block_y = DA.eachchunk(A).chunksize
        # tileoptions = if chunk === nothing
            # ["TILED=NO"]
        tileoptions = ["TILED=YES"]
        # else
            # ["TILED=YES", "BLOCKXSIZE=$block_x", "BLOCKYSIZE=$block_y"]
        # end
        options = ["COMPRESS=$compress", tileoptions...]
        AG.create(filename; driver=gdaldriver, options=options, kw...) do ds
            _gdalsetproperties!(ds, dims, missingval)
            rds = AG.RasterDataset(ds)
        end
    else
        # Create a memory object and copy it to disk, as ArchGDAL.create
        # does not support direct creation of ASCII etc. rasters
        ArchGDAL.create(tempname() * ".tif"; driver=AG.getdriver("GTiff"), kw...) do ds
            _gdalsetproperties!(ds, dims, missingval)
            rds = AG.RasterDataset(ds)
            AG.copy(ds; filename=filename, driver=gdaldriver) |> AG.destroy
        end
    end
    return GeoArray(filename)
end

# DimensionalData methods for ArchGDAL types ###############################

@deprecate GDALstack(args...; kw...) GeoStack(args...; source=GDALfile, kw...)

function DD.dims(raster::AG.RasterDataset, crs=nothing, mappedcrs=nothing)
    gt = try
        AG.getgeotransform(raster) 
    catch 
        GDAL_EMPTY_TRANSFORM 
    end
    xsize, ysize = size(raster)

    nbands = AG.nraster(raster)
    band = Band(1:nbands, mode=Categorical(Ordered()))
    crs = crs isa Nothing ? GeoData.crs(raster) : crs
    xy_metadata = Metadata{GDALfile}()

    # Output Sampled index dims when the transformation is lat/lon alligned,
    # otherwise use Transformed index, with an affine map.
    if _isalligned(gt)
        xstep = gt[GDAL_WE_RES]
        xmin = gt[GDAL_TOPLEFT_X]
        xmax = gt[GDAL_TOPLEFT_X] + xstep * (xsize - 1)
        xindex = LinRange(xmin, xmax, xsize)

        ystep = gt[GDAL_NS_RES] # A negative number
        ymax = gt[GDAL_TOPLEFT_Y] + ystep
        ymin = gt[GDAL_TOPLEFT_Y] + ystep * ysize
        yindex = LinRange(ymax, ymin, ysize)

        # Spatial data defaults to area/inteval
        xsampling, ysampling = if _gdalmetadata(raster.ds, "AREA_OR_POINT") == "Point"
            Points(), Points()
        else
            # GeoTiff uses the "pixelCorner" convention
            Intervals(GDAL_X_LOCUS), Intervals(GDAL_Y_LOCUS)
        end

        # xindorder, xarrayorder = if xmin <= xmax 
        #     ForwardIndex(), ForwardArray() 
        # else
        #     ReverseIndex(), ReverseArray()
        # end
        # yindorder, yarrayorder = if ymin <= ymax
        #     ForwardIndex(), ForwardArray()
        # else
        #     ReverseIndex(), ReverseArray()
        # end
        xmode = Projected(
            order=Ordered(GDAL_X_INDEX, GDAL_X_ARRAY, GDAL_RELATION),
            span=Regular(step(xindex)),
            sampling=xsampling,
            crs=crs,
            mappedcrs=mappedcrs,
        )
        ymode = Projected(
            order=Ordered(GDAL_Y_INDEX, GDAL_Y_ARRAY, GDAL_RELATION),
            sampling=ysampling,
            # Use the range step as is will be different to ystep due to float error
            span=Regular(step(yindex)),
            crs=crs,
            mappedcrs=mappedcrs,
        )
        x = X(xindex; mode=xmode, metadata=xy_metadata)
        y = Y(yindex; mode=ymode, metadata=xy_metadata)

        DimensionalData._formatdims(map(Base.OneTo, (xsize, ysize, nbands)), (x, y, band))
    else
        error("Rotated/transformed dimensions are not handled yet. Open a github issue for GeoData.jl if you need this.")
        # affinemap = geotransform2affine(geotransform)
        # x = X(affinemap; mode=TransformedIndex(dims=X()))
        # y = Y(affinemap; mode=TransformedIndex(dims=Y()))

        # formatdims((xsize, ysize, nbands), (x, y, band))
    end
end

function DD.metadata(raster::AG.RasterDataset, args...)
    band = AG.getband(raster.ds, 1)
    # color = AG.getname(AG.getcolorinterp(band))
    scale = AG.getscale(band)
    offset = AG.getoffset(band)
    # norvw = AG.noverview(band)
    path = first(AG.filelist(raster))
    units = AG.getunittype(band)
    upair = units == "" ? () : (:units=>units,)
    Metadata{GDALfile}(Dict(:filepath=>path, :scale=>scale, :offset=>offset, upair...))
end

function missingval(raster::AG.RasterDataset, args...)
    # We can only handle data where all bands have the same missingval
    band = AG.getband(raster.ds, 1)
    nodata = AG.getnodatavalue(band)
    if nodata isa Nothing
        return nothing
    else
        return _gdalconvert(eltype(band), nodata)
    end
end

_gdalconvert(T::Type{<:AbstractFloat}, x::Real) = convert(T, x)
function _gdalconvert(T::Type{<:Integer}, x::AbstractFloat)
    if trunc(x) === x
        convert(T, x)
    else
        @warn "Missing value $x can't be converted to array eltype $T. `missingval` set to `nothing`"
        nothing
    end
end
function _gdalconvert(T::Type{<:Integer}, x::Integer)
    if x >= typemin(T) && x <= typemax(T)  
        convert(T, x)
    else
        @warn "Missing value $x can't be converted to array eltype $T. `missingval` set to `nothing`"
        nothing
    end
end
_gdalconvert(T, x) = x

function crs(raster::AG.RasterDataset, args...)
    WellKnownText(GeoFormatTypes.CRS(), string(AG.getproj(raster.ds)))
end


# Utils ########################################################################

function _open(f, ::Type{GDALfile}, filename::AbstractString; write=false, kw...)
    flags = write ? (; flags=AG.OF_Update) : () 
    AG.readraster(cleanreturn ∘ f, filename; flags...)
end

function _gdalwrite(filename, A::AbstractGeoArray, nbands; 
    driver=AG.extensiondriver(filename), compress="DEFLATE", chunk=nothing
)
    kw = (width=size(A, X()), height=size(A, Y()), nbands=nbands, dtype=eltype(A))
    gdaldriver = AG.getdriver(driver)
    if driver == "GTiff" 
        block_x, block_y = DA.eachchunk(A).chunksize
        tileoptions = if chunk === nothing
            ["TILED=NO"]
        else
            ["TILED=YES", "BLOCKXSIZE=$block_x", "BLOCKYSIZE=$block_y"]
        end
        options = ["COMPRESS=$compress", tileoptions...]
        AG.create(filename; driver=gdaldriver, options=options, kw...) do ds
            _gdalsetproperties!(ds, A)
            rds = AG.RasterDataset(ds)
            open(A; write=true) do O
                rds .= parent(O)
            end
        end
    else
        # Create a memory object and copy it to disk, as ArchGDAL.create
        # does not support direct creation of ASCII etc. rasters
        ArchGDAL.create(""; driver=AG.getdriver("MEM"), kw...) do ds
            _gdalsetproperties!(ds, A)
            rds = AG.RasterDataset(ds)
            open(A; write=true) do O
                rds .= parent(O)
            end
            AG.copy(ds; filename=filename, driver=gdaldriver) |> AG.destroy
        end
    end
    return filename
end
 

function _gdalmetadata(dataset::AG.Dataset, key)
    meta = AG.metadata(dataset)
    regex = Regex("$key=(.*)")
    i = findfirst(f -> occursin(regex, f), meta)
    if i isa Nothing
        nothing
    else
        match(regex, meta[i])[1]
    end
end

_gdalsetproperties!(ds, A) = _gdalsetproperties!(ds, dims(A), missingval(A))
function _gdalsetproperties!(dataset, dims, missingval)
    # Convert the dimensions to `Projected` if they are `Converted`
    # This allows saving NetCDF to Tiff
    # Set the index loci to the start of the cell for the lat and lon dimensions.
    # NetCDF or other formats use the center of the interval, so they need conversion.
    x = DD.maybeshiftlocus(GDAL_X_LOCUS, convertmode(Projected, DD.dims(dims, X)))
    y = DD.maybeshiftlocus(GDAL_Y_LOCUS, convertmode(Projected, DD.dims(dims, Y)))
    # Convert crs to WKT if it exists
    if !(crs(x) isa Nothing)
        AG.setproj!(dataset, convert(String, convert(WellKnownText, crs(x))))
    end
    # Get the geotransform from the updated lat/lon dims and write
    AG.setgeotransform!(dataset, _dims2geotransform(x, y))

    # Set the nodata value. GDAL can't handle missing. We could choose a default, 
    # but we would need to do this for all possible types. `nothing` means
    # there is no missing value.
    # TODO define default nodata values for missing?
    if (missingval !== missing) && (missingval !== nothing)
        # We use the axis instead of the values because
        # GDAL has to have values 1:N, not whatever the index holds
        bands = hasdim(dims, Band) ? axes(DD.dims(dims, Band), 1) : 1
        for i in bands
            AG.setnodatavalue!(AG.getband(dataset, i), missingval)
        end
    end

    return dataset
end

# Create a GeoArray from a memory-backed dataset
GeoArray(ds::AG.Dataset; kw...) = GeoArray(AG.RasterDataset(ds); kw...) 
function GeoArray(ds::AG.RasterDataset;
    crs=crs(ds), mappedcrs=nothing,
    dims=dims(ds, crs, mappedcrs),
    refdims=(), name=Symbol(""),
    metadata=metadata(ds),
    missingval=missingval(ds)
)
    args = dims, refdims, name, metadata, missingval
    filelist = AG.filelist(ds)
    if length(filelist) > 0
        filename = first(filelist)
        return GeoArray(FileArray(ds, filename), args...)
    else
        return GeoArray(Array(ds), args...)
    end
end

# Convert AbstractGeoArray to in-memory datasets

function AG.Dataset(f::Function, A::AbstractGeoArray)
    all(hasdim(A, (XDim, YDim))) || throw(ArgumentError("`AbstractGeoArray` must have both an `XDim` and `YDim` to use be converted to an ArchGDAL `Dataset`"))
    if ndims(A) === 3
        thirddim = otherdims(A, (X, Y))[1]
        thirddim isa Band || throw(ArgumentError("ArchGDAL can't handle $(DD.basetypeof(thirddim)) dims - only XDim, YDim, and Band"))
    elseif ndims(A) > 3
        throw(ArgumentError("ArchGDAL can only accept 2 or 3 dimensional arrays"))
    end

    dataset = unsafe_gdal_mem(A)
    try
        f(dataset)
    finally
        AG.destroy(dataset)
    end
end

# Create a memory-backed GDAL dataset from any AbstractGeoArray
function unsafe_gdal_mem(A::AbstractGeoArray)
    nbands = hasdim(A, Band) ? size(A, Band) : 1
    _unsafe_gdal_mem(_maybe_permute_to_gdal(A), nbands)
end

function _unsafe_gdal_mem(A::AbstractGeoArray, nbands)
    width = size(A, X)
    height = size(A, Y)
    ds = AG.unsafe_create("tmp";
        driver=AG.getdriver("MEM"),
        width=width,
        height=height,
        nbands=nbands,
        dtype=eltype(A)
    )
    _gdalsetproperties!(ds, A)
    # write bands to dataset
    open(A) do A
        AG.RasterDataset(ds) .= parent(A)
    end
    return ds
end

# _maybe_permute_gdal
# Permute dims unless the match the GDAL dimension order
_maybe_permute_to_gdal(A) = _maybe_permute_to_gdal(A, DD.dims(A, (X, Y, Band)))
_maybe_permute_to_gdal(A, dims::Tuple) = A
_maybe_permute_to_gdal(A, dims::Tuple{<:XDim,<:YDim,<:Band}) = permutedims(A, dims)
_maybe_permute_to_gdal(A, dims::Tuple{<:XDim,<:YDim}) = permutedims(A, dims)

_maybe_permute_from_gdal(A, dims::Tuple) = permutedims(A, dims)
_maybe_permute_from_gdal(A, dims::Tuple{<:XDim,<:YDim,<:Band}) = A
_maybe_permute_from_gdal(A, dims::Tuple{<:XDim,<:YDim}) = A

#= Geotranforms ########################################################################

See https://lists.osgeo.org/pipermail/gdal-dev/2011-July/029449.html

"In the particular, but common, case of a “north up” image without any rotation or
shearing, the georeferencing transform takes the following form" :
adfGeoTransform[0] /* top left x */
adfGeoTransform[1] /* w-e pixel resolution */
adfGeoTransform[2] /* 0 */
adfGeoTransform[3] /* top left y */
adfGeoTransform[4] /* 0 */
adfGeoTransform[5] /* n-s pixel resolution (negative value) */
=#

const GDAL_EMPTY_TRANSFORM = [0.0, 1.0, 0.0, 0.0, 0.0, 1.0]
const GDAL_TOPLEFT_X = 1
const GDAL_WE_RES = 2
const GDAL_ROT1 = 3
const GDAL_TOPLEFT_Y = 4
const GDAL_ROT2 = 5
const GDAL_NS_RES = 6

_isalligned(geotransform) = geotransform[GDAL_ROT1] == 0 && geotransform[GDAL_ROT2] == 0

# _geotransform2affine(gt) =
    # AffineMap([gt[GDAL_WE_RES] gt[GDAL_ROT1]; gt[GDAL_ROT2] gt[GDAL_NS_RES]],
              # [gt[GDAL_TOPLEFT_X], gt[GDAL_TOPLEFT_Y]])

function _dims2geotransform(x::X, y::Y)
    gt = zeros(6)
    gt[GDAL_TOPLEFT_X] = first(x)
    gt[GDAL_WE_RES] = step(x)
    gt[GDAL_ROT1] = zero(eltype(gt))
    gt[GDAL_TOPLEFT_Y] = first(y) - step(y)
    gt[GDAL_ROT2] = zero(eltype(gt))
    gt[GDAL_NS_RES] = step(y)
    return gt
end

# precompilation

for T in (Any, UInt8, UInt16, Int16, UInt32, Int32, Float32, Float64)
    DS = AG.RasterDataset{T,AG.Dataset}
    precompile(crs, (DS,))
    precompile(GeoData.FileArray, (DS, String))
    precompile(dims, (DS,))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},Nothing))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},EPSG))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},ProjString))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},WellKnownText{GeoFormatTypes.CRS,String}))
    precompile(metadata, (DS, key))
    precompile(missingval, (DS, key))
    precompile(GeoArray, (DS, key))
    precompile(GeoArray, (DS, String, Nothing))
    precompile(GeoArray, (DS, String, Symbol))
end
