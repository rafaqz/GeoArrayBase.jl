export GRDstack, GRDarray

const GRD_INDEX_ORDER = ForwardIndex()
const GRD_X_ARRAY = ForwardArray()
const GRD_Y_ARRAY = ReverseArray()
const GRD_BAND_ARRAY = ForwardArray()
const GRD_X_RELATION = ForwardRelation()
const GRD_Y_RELATION = ReverseRelation()
const GRD_BAND_RELATION= ForwardRelation()

const GRD_DATATYPE_TRANSLATION = Dict{String, DataType}(
    "LOG1S" => Bool,
    "INT1S" => Int8,
    "INT2S" => Int16,
    "INT4S" => Int32,
    "INT8S" => Int64,
    "INT1U" => UInt8,
    "INT2U" => UInt16,
    "INT4U" => UInt32,
    "INT8U" => UInt64,
    "FLT4S" => Float32,
    "FLT8S" => Float64
)
const REVGRDfile_DATATYPE_TRANSLATION =
    Dict{DataType, String}(v => k for (k,v) in GRD_DATATYPE_TRANSLATION)

# GRD attributes wrapper. Only used during file load, for dispatch.
struct GRDattrib{T,F}
    filename::F
    attrib::Dict{String,String}
    write::Bool
end
function GRDattrib(filename::AbstractString; write=false)
    filename = first(splitext(filename))
    lines = readlines(filename * ".grd")
    entries = filter!(x -> !isempty(x) && !(x[1] == '['), lines)
    matches = (match(r"([^=]+)=(.*)", st) for st in entries)
    captures = (string.(strip.(m.captures[1:2])) for m in matches)
    pairs = map(c -> Pair(c[1], c[2]), captures)
    attrib = Dict(pairs...)
    T = GRD_DATATYPE_TRANSLATION[attrib["datatype"]]
    GRDattrib{T,typeof(filename)}(filename, attrib, write)
end

attrib(grd::GRDattrib) = grd.attrib
filename(grd::GRDattrib) = grd.filename
filekey(grd::GRDattrib, key::Nothing) = get(attrib(grd), "layername", Symbol(""))

function DD.dims(grd::GRDattrib, crs=nothing, mappedcrs=nothing)
    attrib = grd.attrib
    crs = crs isa Nothing ? ProjString(attrib["projection"]) : crs

    ncols, nrows, nbands = size(grd)

    xbounds = parse.(Float64, (attrib["xmin"], attrib["xmax"]))
    ybounds = parse.(Float64, (attrib["ymin"], attrib["ymax"]))

    xspan = (xbounds[2] - xbounds[1]) / ncols
    yspan = (ybounds[2] - ybounds[1]) / nrows

    # Not fully implemented yet
    xy_metadata = Metadata{GRDfile}(Dict())

    xmode = Projected(
        order=Ordered(GRD_INDEX_ORDER, GRD_X_ARRAY, GRD_X_RELATION),
        span=Regular(xspan),
        sampling=Intervals(Start()),
        crs=crs,
        mappedcrs=mappedcrs,
    )
    ymode = Projected(
        order=Ordered(GRD_INDEX_ORDER, GRD_Y_ARRAY, GRD_Y_RELATION),
        span=Regular(yspan),
        sampling=Intervals(Start()),
        crs=crs,
        mappedcrs=mappedcrs,
    )
    x = X(LinRange(xbounds[1], xbounds[2] - xspan, ncols), xmode, xy_metadata)
    y = Y(LinRange(ybounds[1], ybounds[2] - yspan, nrows), ymode, xy_metadata)
    band = Band(1:nbands; mode=Categorical(Ordered()))
    x, y, band
end

DD.name(grd::GRDattrib) = Symbol(get(grd.attrib, "layername", ""))

function DD.metadata(grd::GRDattrib, args...)
    metadata = Metadata{GRDfile}()
    for key in ("creator", "created", "history")
        val = get(grd.attrib, key, "")
        if val != ""
            metadata[key] = val
        end
    end
    metadata
end

function missingval(grd::GRDattrib{T}) where T
    if haskey(grd.attrib, "nodatavalue")
        ndv = grd.attrib["nodatavalue"]
        ndv === "nothing" && return nothing
        try
            return parse(T, ndv)
        catch
            @warn "nodatavalue $(ndv) is not convertible to data type $T. `missingval` set to `nothing`."
            return nothing
        end
    else
        return nothing
    end
end


Base.eltype(::GRDattrib{T}) where T = T

function Base.size(grd::GRDattrib)
    ncols = parse(Int, grd.attrib["ncols"])
    nrows = parse(Int, grd.attrib["nrows"])
    nbands = parse(Int, grd.attrib["nbands"])
    # The order is backwards to jula array order
    ncols, nrows, nbands
end

Base.Array(grd::GRDattrib) = _mmapgrd(Array, grd)


# Array ########################################################################

@deprecate GRDarray(args...; kw...) GeoArray(args...; source=GRDfile, kw...)

function FileArray(grd::GRDattrib, filename=filename(grd); kw...)
    filename = first(splitext(filename))
    size_ = size(grd)
    eachchunk = DiskArrays.GridChunks(size_, size_)
    haschunks = DiskArrays.Unchunked()
    T = eltype(grd)
    N = length(size_)
    FileArray{GRDfile,T,N}(filename, size_; eachchunk, haschunks, kw...)
end

# Base methods

"""
    Base.write(filename::AbstractString, ::Type{GRDfile}, s::AbstractGeoArray)

Write a `GeoArray` to a .grd file with a .gri header file. 
The extension of `filename` will be ignored.

Currently the `metadata` field is lost on `write`.

Returns `filename`.
"""
function Base.write(filename::String, ::Type{GRDfile}, A::AbstractGeoArray)
    if hasdim(A, Band)
        correctedA = permutedims(A, (X, Y, Band)) |>
            a -> reorder(a, GRD_INDEX_ORDER) |>
            a -> reorder(a, (X(GRD_X_RELATION), Y(GRD_Y_RELATION), Band(GRD_BAND_RELATION)))
        checkarrayorder(correctedA, (GRD_X_ARRAY, GRD_Y_ARRAY, GRD_BAND_ARRAY))
        nbands = length(val(dims(correctedA, Band)))
    else
        correctedA = permutedims(A, (X, Y)) |>
            a -> reorder(a, GRD_INDEX_ORDER) |>
            a -> reorder(a, (X(GRD_X_RELATION), Y(GRD_Y_RELATION)))
            checkarrayorder(correctedA, (GRD_X_ARRAY, GRD_Y_ARRAY))
        nbands = 1
    end
    # Remove extension
    filename = splitext(filename)[1]
    minvalue = minimum(filter(x -> x !== missingval(A), parent(A)))
    maxvalue = maximum(filter(x -> x !== missingval(A), parent(A)))
    _write_grd(filename, eltype(A), dims(A), missingval(A), minvalue, maxvalue, name(A))

    # Data: gri file
    open(filename * ".gri", write=true) do IO
        write(IO, parent(correctedA))
    end

    return filename
end

function _write_grd(filename, T, dims, missingval, minvalue, maxvalue, name)
    filename = splitext(filename)[1]

    x, y = map(DD.dims(dims, (X(), Y()))) do d
        convertmode(Projected, d)
    end

    nbands = hasdim(dims, Band) ? length(DD.dims(dims, Band)) : 1
    ncols, nrows = length(x), length(y)
    xmin, xmax = bounds(x)
    ymin, ymax = bounds(y)
    proj = convert(String, convert(ProjString, crs(x)))
    datatype = REVGRDfile_DATATYPE_TRANSLATION[T]
    nodatavalue = missingval

    # Metadata: grd file
    open(filename * ".grd"; write=true) do IO
        write(IO,
            """
            [general]
            creator=GeoData.jl
            created= $(string(now()))
            [georeference]
            nrows= $nrows
            ncols= $ncols
            xmin= $xmin
            ymin= $ymin
            xmax= $xmax
            ymax= $ymax
            projection= $proj
            [data]
            datatype= $datatype
            nodatavalue= $nodatavalue
            byteorder= little
            nbands= $nbands
            minvalue= $minvalue
            maxvalue= $maxvalue
            [description]
            layername= $name
            """
        )
    end
end


function create(filename, ::Type{GRDfile}, T::Type, dims::DD.DimTuple; 
    name="layer", missingval=nothing, metadata=nothing, keys=nothing,
)
    # Remove extension
    basename = splitext(filename)[1]
    minvalue = maxvalue = zero(T)
    sze = map(length, DD.dims(dims, (XDim, YDim, Band)))

    # Metadata: grd file
    _write_grd(basename, T, dims, missingval, minvalue, maxvalue, name)

    # Data: gri file
    open(basename * ".gri", write=true) do IO
        write(IO, FillArrays.Zeros(sze))
    end
    return filename
end

# AbstractGeoStack methods

@deprecate GRDstack(args...; kw...) GeoStack(args...; source=GRDfile, kw...)

# Custom `open` because the data and metadata objects are separate
# Here we _mmapgrd instead of `_open`
function Base.open(f::Function, A::FileArray{GRDfile}, key...; write=A.write)
    _mmapgrd(mm -> f(GeoDiskArray{GRDfile}(mm, A.eachchunk, A.haschunks)), A; write)
end

_open(f, ::Type{GRDfile}, filename; key=nothing, write=false) = f(GRDattrib(filename; write))

haslayers(::Type{GRDfile}) = false

# Utils ########################################################################

function _mmapgrd(f, x::Union{FileArray,GRDattrib}; kw...)
    _mmapgrd(f, filename(x), eltype(x), size(x); kw...)
end
function _mmapgrd(f, filename::AbstractString, T::Type, size::Tuple; write=false)
    arg = write ? "r+" : "r"  
    open(filename * ".gri", arg) do io
        mmap = Mmap.mmap(io, Array{T,length(size)}, size)
        output = f(mmap)
        close(io)
        output
    end
end


# precompilation

T = UInt16
for T in (Any, UInt8, UInt16, Int16, UInt32, Int32, Int64, Float32, Float64)
    precompile(GRDattrib, (String,))
    DS = GeoData.GRDattrib{T,String}
    precompile(crs, (DS,))
    precompile(GeoData.FileArray, (DS, String))
    precompile(dims, (DS,))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},Nothing))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},EPSG))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},ProjString))
    precompile(dims, (DS,WellKnownText{GeoFormatTypes.CRS,String},WellKnownText{GeoFormatTypes.CRS,String}))
    precompile(metadata, (DS, ))
    precompile(metadata, (DS, Symbol))
    precompile(missingval, (DS,))
    precompile(GeoArray, (DS, String, Nothing))
    precompile(GeoArray, (DS, String, Symbol))
end
