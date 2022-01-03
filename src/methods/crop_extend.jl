"""
    crop(x; to)
    crop(xs...; to)

Crop one or multiple [`AbstractRaster`](@ref) or [`AbstractRasterStack`](@ref) `x`
to match the size of the object `to`, or smallest of any dimensions that are shared.

Otherwise crop to the size of the keyword argument `to`. This can be a
`Tuple` of `Dimension` or any object that will return one from `dims(to)`.

`crop` is lazy, using a `view` into the object rather than alocating new memory.

# Keywords

- `to`: the object to crop to. If `to` keyword is passed, the smallest shared
    area of all `xs` is used.

As `crop` is lazy, `filename` and `suffix` keywords don't apply.

# Example

```jldoctest
using Rasters, Plots
evenness = Raster(EarthEnv{HabitatHeterogeneity}, :evenness)
rnge = Raster(EarthEnv{HabitatHeterogeneity}, :range)

# Roughly cut out New Zealand from the evenness raster
nz_bounds = X(Between(165, 180)), Y(Between(-32, -50))
nz_evenness = evenness[nz_bounds...]

# Crop range to match evenness
nz_range = crop(rnge; to=nz_evenness)
plot(nz_range)

savefig("build/crop_example.png")
# output

using Rasters, Plots, Dates, Shapefile, Downloads
using Rasters.LookupArrays

# Download a borders shapefile
shapefile_url = "https://github.com/nvkelso/natural-earth-vector/raw/master/10m_cultural/ne_10m_admin_0_countries.shp"
shapefile_name = "boundary_lines.shp"
isfile(shapefile_name) || Downloads.download(shapefile_url, shapefile_name)
shp = Shapefile.Handle(shapefile_name).shapes

nz_range = crop(evenness; to=shp, atol=1e-7)

```

![crop]/crop_example.png)

$EXPERIMENTAL
"""
function crop end
function crop(l1::RasterStackOrArray, l2::RasterStackOrArray, ls::RasterStackOrArray...; kw...)
    crop((l1, l2, ls); kw...)
end
function crop(xs; to=nothing, kw...)
    if isnothing(to)
        to = _subsetbounds((max, min), xs)
        map(l -> _crop_to_bounds(l, to), xs)
    else
        map(l -> crop(l; to, kw...), xs)
    end
end
crop(x::RasterStackOrArray; to, kw...) = _crop_to(x, to; kw...)

# crop `A` to values of dims of `to`
_crop_to(A::RasterStackOrArray, to::RasterStackOrArray; kw...) = _crop_to(A, dims(to); kw...)
function _crop_to(x::RasterStackOrArray, to::DimTuple; atol=maybe_eps(to))
    # We can only crop to sampled dims (e.g. not categorical dims like Band)
    sampled = reduce(to; init=()) do acc, d 
        lookup(d) isa AbstractSampled ? (acc..., d) : acc
    end
    wrapped_bounds = map(d ->  rebuild(d, bounds(d)), sampled)
    return _crop_to_bounds(x, wrapped_bounds)
end
function _crop_to(x::RasterStackOrArray, to; order=nothing)
    if Tables.istable(to)
        order = _table_point_order(dims(x), to, order)
        wrapped_bounds = _wrapped_table_bounds(dims(x), to, order)
    else
        order = isnothing(order) ? DEFAULT_POINT_ORDER : order
        # Wrap the bounds in dims so we can reorder them
        wrapped_bounds = _wrapped_geom_bounds(dims(x), to, order)
    end
    order, wrapped_bounds = _order_and_bounds(x, to, order)
    return _crop_to_bounds(x, wrapped_bounds)
end

function _crop_to_bounds(x, wrapped_bounds)
    # Take a view over the bounds
    _without_mapped_crs(x) do x1
        dimranges = map(wrapped_bounds) do d
            x_d = dims(x1, d)
            range = DD.selectindices(x_d, Between(parent(d)))
            rebuild(x_d, range)
        end
        view(x1, dimranges...)
    end
end

"""
    extend(xs...; [to])
    extend(xs; [to])
    extend(x::Union{AbstractRaster,AbstractRasterStack}; to, kw...)

Extend one or multiple [`AbstractRaster`](@ref) to match the area
covered by all `xs`, or by the keyword argument `to`.

# Keywords

- `to`: the Raster or dims to extend to. If no `to` keyword is passed, the largest
    shared area of all `xs` is used.
- `atol`: the absolute tolerance value to use when comparing the index of x and `to`.
- `filename`: a filename to write to directly, useful for large files.
- `suffix`: a string or value to append to the filename.
    A tuple of `suffix` will be applied to stack layers. `keys(st)` are the default.

```jldoctest
using Rasters, Plots
evenness = Raster(EarthEnv{HabitatHeterogeneity}, :evenness)
rnge = Raster(EarthEnv{HabitatHeterogeneity}, :range)

# Roughly cut out South America
sa_bounds = X(Between(-88, -32)), Y(Between(-57, 13))
sa_evenness = evenness[sa_bounds...]

# Extend range to match the whole-world raster
sa_range = extend(sa_evenness; to=rnge)
plot(sa_range)

savefig("build/extend_example.png")
# output

```

![extend](extend_example.png)

$EXPERIMENTAL
"""
function extend end
function extend(l1::RasterStackOrArray, l2::RasterStackOrArray, ls::RasterStackOrArray...; kw...)
    extend((l1, l2, ls...); kw...)
end
function extend(xs; to=nothing)
    if isnothing(to)
        to = _subsetbounds((min, max), xs)
        map(l -> _extend_to_bounds(l, to), xs)
    else
        map(l -> extend(l; to), xs)
    end
end
extend(x::RasterStackOrArray; to=dims(x), kw...) = _extend_to(x, to; kw...)

_extend_to(x::RasterStackOrArray, to::RasterStackOrArray; kw...) = _extend_to(x, dims(to); kw...)
function _extend_to(x::RasterStackOrArray, to; order=nothing, kw...)
    order, wrapped_bounds = _order_and_bounds(x, to, order)
    all(map(s -> s isa Regular, span(x, order))) || throw(ArgumentError("All dims must have `Regular` span to be extended with a polygon"))
    return _extend_to_bounds(x, wrapped_bounds; kw...)
end
function _extend_to(A::AbstractRaster, to::DimTuple;
    filename=nothing, suffix=nothing
)
    # Calculate the range of the old array in the extended array
    ranges = _without_mapped_crs(A) do A
        _without_mapped_crs(to) do to
            map(dims(A), to) do d, t
                range = DD.selectindices(t, Between(bounds(d)))
                rebuild(d, range)
            end
        end
    end
    # Create a new extended array
    newA = create(filename, eltype(A), to;
        suffix, parent=parent(A), missingval=missingval(A),
        name=name(A), metadata=metadata(A)
    )
    # The missingval may have changed for disk-based arrays
    if !isequal(missingval(A), missingval(newA))
        A = replace_missing(A, missingval(newA))
    end
    open(newA; write=true) do O
        # Fill it with missing/nodata values
        O .= missingval(O)
        # Copy the original data to the new array
        # Somehow this is slow from disk?
        broadcast_dims!(identity, view(O, ranges...), A)
    end
    return newA
end
function _extend_to(st::AbstractRasterStack, to::Tuple; suffix=keys(st), kw...)
    mapargs((A, s) -> _extend_to(A, to; suffix=s, kw...), st, suffix)
end

function _extend_to_bounds(x, wrapped_bounds; kw...)
    newdims = map(wrapped_bounds) do wb
        d = dims(x, wb)
        b = parent(wb)
        l = lookup(d)
        # Use ranges for math because they have TwicePrecision magic
        # Define a range down to the lowest value,
        # but anchored at the existing value
        fl = LA.ordered_first(l); ll = LA.ordered_last(l)
        fb = first(b); lb = last(b)
        s = step(l)
        lowerrange = fb < first(bounds(l)) ? (fl:-s:fb) : (fl:-s:fl)
        upperrange = lb > last(bounds(l))  ? (ll: s:lb) : (ll: s:ll)
        if DD.order(l) isa ForwardOrdered
            newrange = last(lowerrange):s:last(upperrange)
        elseif order(d) isa ReverseOrdered
            newrange = last(upperrange):s:last(lowerrange)
        end
        newlookup = rebuild(l; data=newrange)
        rebuild(d, newlookup)
    end
    return _extend_to(x, newdims; kw...)
end

# Shared utils

# Get the largest or smallest dimensions in a tuple of AbstractRaster
function _subsetbounds(fs, layers)
    # Combine the dimensions of all layers
    dims = DD.combinedims(layers...; check=false)
    # Search through all the dimensions choosing the shortest
    alldims = map(DD.dims, layers)
    map(dims) do d
        matchingdims = map(ds -> DD.dims(ds, (d,)), alldims)
        bounds = reduce(matchingdims) do a, b
            _choosebounds(fs, a, b)
        end
        rebuild(d, bounds)
    end
end

function _order_and_bounds(x, to, order)
    if Tables.istable(to)
        order = _table_point_order(dims(x), order)
        wrapped_bounds = _wrapped_table_bounds(dims(x), to, order)
    else
        order = isnothing(order) ? DEFAULT_POINT_ORDER : order
        wrapped_bounds = _wrapped_geom_bounds(dims(x), to, order)
    end
    return order, wrapped_bounds
end

# Choose bounds from either missing dimension
# (empty Tuple) or a comparison between two 1-Tuples
_choosebounds((f1, f2), (a,)::Tuple{<:Dimension}, ::Tuple{}) = bounds(a)
_choosebounds((f1, f2), (a,)::Tuple{<:Dimension}, b::Tuple{<:Dimension}) = _choosebounds((f1, f2), bounds(a), b)
_choosebounds((f1, f2), ::Tuple{}, ::Tuple{}) = ()
_choosebounds((f1, f2), ::Tuple{}, (b,)::DimTuple) = bounds(b)
_choosebounds((f1, f2), a::Tuple, ::Tuple{}) = a
function _choosebounds((f1, f2), (a1, a2)::Tuple{<:Any,<:Any}, (b,)::Tuple{<:Dimension}) 
    b1, b2 = bounds(b)
    return f1(a1, b1), f2(a2, b2)
end
