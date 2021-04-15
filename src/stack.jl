# Accept either Symbol or String keys, but allways convert to Symbol
const Key = Union{Symbol,AbstractString}

"""
    AbstractGeoStack

Abstract supertype for objects that hold multiple [`AbstractGeoArray`](@ref)
that share spatial bounds.

They are `NamedTuple`-like structures that may either contain `NamedTuple`
of [`AbstractGeoArray`](@ref), string paths that will load [`AbstractGeoArray`](@ref),
or a single path that points to as a file itself containing multiple layers, like
NetCDF or HDF5. Use and syntax is similar or identical for all cases.

`getindex` on a `AbstractGeoStack` generally returns a memory backed standard
[`GeoArray`](@ref). `geoarray[:somelayer] |> plot` plots the layers array,
while `geoarray[:somelayer, X(1:100), Band(2)] |> plot` will plot the
subset without loading the whole array.

`getindex` on a `AbstractGeoStack` with a key returns another stack with
getindex applied to all the arrays in the stack.
"""
abstract type AbstractGeoStack{T} end

# Standard fields

DD.refdims(s::AbstractGeoStack) = s.refdims
DD.metadata(s::AbstractGeoStack) = s.metadata
window(s::AbstractGeoStack) = s.window

"""
    childkwargs(s::AbstractGeoStack)

Returns the keyword arguments that will be passed to the child array constructor.
"""
childkwargs(s::AbstractGeoStack) = s.childkwargs


# Interface methods ############################################################

"""
    modify(f, series::AbstractGeoStack)

Apply function `f` to the data of the child `AbstractGeoArray`s.

`f` must return an idenically sized array.

This method triggers a complete rebuild of all objects,
and disk based objects will be transferred to memory.

This is useful for swapping out array backend for an
entire stack to `CuArray` from CUDA.jl to copy data to a GPU,
and potentially other types like `DAarray` from Distributed.jl.
"""
DD.modify(f, s::AbstractGeoStack) = GeoStack(s; data=_mapdata(A -> modify(f, A), s))

# Base methods #################################################################

@propagate_inbounds function Base.getindex(s::AbstractGeoStack, I...)
    rebuild(s; data=NamedTuple{keys(s)}(a[I...] for a in values(s)))
end
# Dict/Array hybrid with dims
@propagate_inbounds function Base.getindex(s::AbstractGeoStack, key::Key, I::Vararg{<:Dimension})
    getindex(s, key, DD.dims2indices(dims(s, key), I)...)
end

Base.values(s::AbstractGeoStack) = (s[key] for key in keys(s))
Base.length(s::AbstractGeoStack) = length(keys(s))
Base.keys(s::AbstractGeoStack{<:AbstractString}) = Symbol.(querychild(keys, getsource(s), s))
Base.keys(s::AbstractGeoStack{<:NamedTuple}) = Symbol.(keys(getsource(s)))
Base.haskey(s::AbstractGeoStack, k) = k in keys(s)
Base.names(s::AbstractGeoStack) = keys(s)
Base.map(f, s::AbstractGeoStack) = rebuild(s; data=_mapdata(f, s))
Base.first(s::AbstractGeoStack) = s[first(keys(s))]
Base.last(s::AbstractGeoStack) = s[last(keys(s))]

"""
    Base.copy!(dst::AbstractArray, src::DiskGeoStack, key::Key)

Copy the stack layer `key` to `dst`, which can be any `AbstractArray`.

## Example

Copy the `:humidity` layer from `stack` to `array`.

```julia
copy!(array, stack, :humidity)
```
"""
Base.copy!(dst::AbstractArray, src::AbstractGeoStack, key) = copy!(dst, src[key])

"""
    Base.cat(stacks::AbstractGeoStack...; [keys=keys(stacks[1])], dims)

Concatenate all or a subset of layers for all passed in stacks.

# Keywords

- `keys`: `Tuple` of `Symbol` for the stack keys to concatenate.
- `dims`: Dimension of child array to concatenate on.

# Example

Concatenate the :sea_surface_temp and :humidity layers in the time dimension:

```julia
cat(stacks...; keys=(:sea_surface_temp, :humidity), dims=Ti)
```
"""
function Base.cat(stacks::AbstractGeoStack...; keys=keys(stacks[1]), dims)
    vals = Tuple(cat((s[key] for s in stacks)...; dims=dims) for key in keys)
    GeoStack(stacks[1], data=NamedTuple{keys}(vals))
end

_mapdata(f, s::AbstractGeoStack) = NamedTuple{cleankeys(keys(s))}(map(f, values(s)))


# Memory-based stacks ######################################################

"""
    MemGeoStack <: AbstractGeoStack

Abstract supertype for [`AbstractGeoStack`](@ref) stored in memory.
"""
abstract type MemGeoStack{T} <: AbstractGeoStack{T} end

DD.data(s::MemGeoStack) = s.data
DD.data(s::MemGeoStack{<:NamedTuple}, key::Key) = data(s)[Symbol(key)]

function DD.rebuild(s::T;
    data=data(s), refdims=refdims(s), window=window(s),
    metadata=metadata(s), childkwargs=childkwargs(s), kwargs...
) where T<:MemGeoStack
    DD.basetypeof(T)(data, refdims, window, metadata, childkwargs)
end

getsource(s::MemGeoStack{<:NamedTuple}, args...) = data(s, args...)

childdata(f, childobj, ::AbstractGeoStack) = f(childobj)

@propagate_inbounds function Base.view(s::MemGeoStack, I...)
    rebuild(s; data=NamedTuple{keys(s)}(view(a, I...) for a in values(s)))
end

@propagate_inbounds function Base.getindex(s::MemGeoStack, key::Key)
    A = rebuild(data(s)[key]; childkwargs(s)...)
    window_ = maybewindow2indices(dims(A), window(s))
    readwindowed(A, window_)
end
@propagate_inbounds function Base.getindex(
    s::MemGeoStack, key::Key, i1::StandardIndices, I::StandardIndices...
)
    A = rebuild(data(s)[key]; childkwargs(s)...)
    window_ = maybewindow2indices(dims(A), window(s))
    readwindowed(A, window_, i1, I...)
end

"""
    Base.copy!(dst::AbstractGeoStack, src::AbstractGeoStack, [keys=keys(dst)])

Copy all or a subset of layers from one stack to another.

## Example

Copy just the `:sea_surface_temp` and `:humidity` layers from `src` to `dst`.

```julia
copy!(dst::AbstractGeoStack, src::AbstractGeoStack, keys=(:sea_surface_temp, :humidity))
```
"""
function Base.copy!(dst::MemGeoStack, src::AbstractGeoStack, keys=keys(dst))
    symkeys = Symbol.(keys)
    # Check all keys first so we don't copy anything if there is any error
    for key in symkeys
        key in Symbol.(Base.keys(dst)) || throw(ArgumentError("key $key not found in dest keys"))
        key in Symbol.(Base.keys(src)) || throw(ArgumentError("key $key not found in source keys"))
    end
    for key in symkeys
        copy!(dst[key], src[key])
    end
end

# Disk-based stacks ######################################################

"""
    DiskGeoStack <: AbstractGeoStack

Abstract supertype of [`AbstractGeoStack`](@ref)s stored on disk.
"""
abstract type DiskGeoStack{T} <: AbstractGeoStack{T} end

function DD.rebuild(s::T;
    data=filename(s), refdims=refdims(s), window=window(s), metadata=metadata(s),
    childtype=childtype(s), childkwargs=childkwargs(s), kwargs...
) where T<:DiskGeoStack
    DD.basetypeof(T)(data, refdims, window, metadata, childtype, childkwargs)
end

getsource(s::DiskGeoStack, args...) = filename(s, args...)

childtype(stack::DiskGeoStack) = stack.childtype

"""
    filename(s::DiskGeoStack)

Return the filename field of a `DiskGeoStack`.
This may be a `Vector` of `String`, or a `String`.
"""
filename(s::DiskGeoStack) = s.filename
"""
    filename(s::DiskGeoStack, key)

Return the filename field of a `DiskGeoStack` for a given key.

This will always be a single string. However, in some cases
all keys may have the same filename.
"""
filename(s::DiskGeoStack{<:NamedTuple}, key::Key) = filename(s)[Symbol(key)]
filename(s::DiskGeoStack, key::Key) = filename(s)

# Default to using the same method as GeoStack.
# But a method for withsourcedata dispatching on the
# array object may save time in some cases, like when
# the array size has to be determined before loading the data
# like with mmaped grd files.
withsourcedata(f, A::DiskGeoArray, key...) =
    withsourcedata(f, typeof(A), filename(A), key...)
# By default assume the source object is a single object with all info and data.
withsourcedata(f, childtype::Type, path, key...) = withsource(f, childtype, path, key...)

withsource(f, childtype::Type, path, key...) = f(path)

# Base methods

function Base.getindex(s::DiskGeoStack, key::Key)
    filename_ = filename(s, key)
    withsource(childtype(s), filename_, key) do dataset
        A = childtype(s)(dataset, filename_, key; name=Symbol(key), childkwargs(s)...)
        window_ = maybewindow2indices(A, window(s))
        readwindowed(A, window_)
    end
end
function Base.getindex(s::DiskGeoStack, key::Key, i1::StandardIndices, I::StandardIndices...)
    filename_ = filename(s, key)
    withsource(childtype(s), filename_, key) do dataset
        A = childtype(s)(dataset, filename_, key; name=Symbol(key), childkwargs(s)...)
        window_ = maybewindow2indices(dims(A), window(s))
        readwindowed(A, window_, i1, I...)
    end
end

@inline Base.view(s::DiskGeoStack, I...) = rebuild(s; window=I)

Base.map(f, s::DiskGeoStack) = GeoStack(s; data=_mapdata(f, s))


# Default dims, metadata and missingval methods
#
# For DiskStack we query the underlying object - avoiding building
# an AbstractGeoArray unless we have to. Examples may be an NCDatasets,
# ArchGDAL, or HDF5 `Dataset` object. These sources will add a
# For MemGeoStack the childobj is just a GeoArray as it is allready loaded in memory.
for func in (:(DD.dims), :(DD.metadata), :missingval)
    @eval begin
        $func(s::AbstractGeoStack, key::Key) = $func(s[key])
        function $func(s::DiskGeoStack, key::Key)
            withsource(childtype(s), getsource(s, key), key) do sourceobj
                $func(sourceobj, key)
            end
        end
    end
end

# Concrete MemGeoStack implementation ######################################################

"""
    GeoStack <: MemGeoStack

    GeoStack(data...; keys, kwargs...)
    GeoStack(data::Union{Vector,Tuple}; keys, kwargs...)
    GeoStack(data::NamedTuple; window=(), metadata=nothing, refdims=(), childkwargs=()) =
    GeoStack(s::AbstractGeoStack; [keys, data, refdims, window, metadata])

A concrete `MemGeoStack` implementation. Holds layers of [`GeoArray`](@ref).

# Arguments

- `data`: A `NamedTuple` of [`GeoArray`](@ref), or a `Vector`, `Tuple` or splatted arguments
    of [`GeoArray`](@ref). The latter options must pass a `keys` keyword argument.

# Keywords

- `keys`: Used as stack keys when a `Tuple` or `Vector` or splat of geoarrays are passed in.
- `window`: A `Tuple` of `Dimension`/`Selector`/indices that will be applied to the
    contained arrays when they are accessed.
- `refdims`: Reference dimensions from earlier subsetting.
- `metadata`: Metadata as a `DimensionalData.AbstractStackMetadata` object.
- `childkwargs`: A `NamedTuple` of keyword arguments to pass to the constructor.
- `refdims`: `Tuple` of  position `Dimension` the array was sliced from.
"""
struct GeoStack{T,R,W,M,K} <: MemGeoStack{T}
    data::T
    refdims::R
    window::W
    metadata::M
    childkwargs::K
end
function GeoStack(data::AbstractGeoArray...; keys=name.(data), kw...)
    GeoStack(NamedTuple{cleankeys(keys)}(data); kw...)
end
function GeoStack(data::NamedTuple;
         refdims=(),
         window=(),
         metadata=nothing,
         childkwargs=())
    GeoStack(data, refdims, window, metadata, childkwargs)
end
function GeoStack(s::AbstractGeoStack; keys=cleankeys(Base.keys(s)),
         data=NamedTuple{keys}(s[key] for key in keys),
         refdims=refdims(s),
         window=(),
         metadata=metadata(s),
         childkwargs=())
    GeoStack(data, refdims, window, metadata, childkwargs)
end

Base.convert(::Type{GeoStack}, src::AbstractGeoStack) = GeoStack(src)


# Concrete DiskGeoStack implementation ######################################################
"""
    DiskStack(filenames...; keys, kw...)
    DiskStack(filenames; keys, kw...)
    DiskStack(filenames::NamedTuple; kw...)

Concrete [`DiskGeoStack`](@ref) implementation. Loads a stack of files lazily from disk.

# Arguments

- `filename`: a NamedTuple of stack keys and `String` filenames.

# Keywords

- `keys`: Used as stack keys when a `Tuple`, `Vector` or splat of filenames are passed in.
- `window`: A `Tuple` of `Dimension`/`Selector`/indices that will be applied to the
    contained arrays when they are accessed.
- `metadata`: Metadata as a `DimensionalData.StackMetadata` object.
- `childtype`: The type of the child data. eg. `GDALarray`. Required.
- `childkwargs`: A `NamedTuple` of keyword arguments to pass to the `childtype` constructor.
- `refdims`: `Tuple` of  position `Dimension` the array was sliced from.
"""
struct DiskStack{T,R,W,M,C,K} <: DiskGeoStack{T}
    filename::T
    refdims::R
    window::W
    metadata::M
    childtype::C
    childkwargs::K
end
function DiskStack(filenames::NamedTuple;
    refdims=(), window=(), metadata=nothing, childtype, childkwargs=()
)
    DiskStack(filenames, refdims, window, metadata, childtype, childkwargs)
end
function DiskStack(filenames; keys, kw...)
    DiskStack(NamedTuple{cleankeys(keys)}((filenames...,)); kw...)
end
DiskStack(filenames::AbstractString...; kw...) = DiskStack(filenames; kw...)

# Other base methods

Base.copy(stack::AbstractGeoStack) = rebuild(stack; data=map(copy, getsource(stack)))
