"""
    read(A::AbstractGeoArray)
    read(A::AbstractGeoStack)
    read(A::AbstractGeoSeries)

`read` will move a GeoData.jl object completely to memory.
```
"""
function Base.read(x::Union{AbstractGeoArray,AbstractGeoStack,AbstractGeoSeries})
    modify(x) do ds
        # Some backends don't implement `Array` properly.
        Array{eltype(ds),ndims(ds)}(undef, size(ds)) .= ds
    end
end

"""
    read!(src::Union{AbstractString,AbstractGeoArray}, dst::AbstractGeoArray)
    read!(src::Union{AbstractString,AbstractGeoStack}, dst::AbstractGeoStack)
    read!(scr::AbstractGeoSeries, dst::AbstractGeoSeries)

`read!` will move the data from `src` to `dst`, where `src` can be an object
or a file name `String`.
```
"""
Base.read!(src::AbstractGeoArray, dst::AbstractArray) = dst .= src
function Base.read!(src::AbstractGeoStack, dst::AbstractGeoStack)
    map(k -> read!(src[k], dst[k]), keys(dst))
    return dst
end
function Base.read!(src::AbstractGeoSeries, dst::AbstractGeoSeries)
    map(read!, src, dst)
    return dst
end

# Filename methods
function Base.read!(filename::AbstractString, dst::AbstractGeoArray)
    src = geoarray(filename;
        dims=dims(dst), refdims=refdims(dst), name=name(dst),
        metadata=metadata(dst), missingval=missingval(dst),
    )
    read!(src, dst)
end
function Base.read!(filenames::Union{NamedTuple,<:AbstractVector{<:AbstractString}}, dst::AbstractGeoStack)
    _readstack!(filenames, dst)
end
function Base.read!(filenames::AbstractString, dst::AbstractGeoStack)
    _readstack!(filenames, dst)
end
function Base.read!(filenames::AbstractVector{<:Union{AbstractString,NamedTuple}}, dst::AbstractGeoSeries)
    map((fn, d) -> read!(fn, d), filenames, dst)
    return dst
end

function _readstack!(filenames, dst)
    src = stack(filenames;
        dims=dims(dst), refdims=refdims(dst), keys=keys(dst), metadata=metadata(dst),
        layermetadata=DD.layermetadata(dst), layermissingval=layermissingval(dst),
    )
    read!(src, dst)
end
