"""
   extract(x, geoms; atol)

Extracts the value of `Raster` or `RasterStack` at given points, returning
an iterable of `NamedTuple` with properties for `:geometry` and raster or 
stack layer values.

Note that if objects have more dimensions than the length of the point tuples,
sliced arrays or stacks will be returned instead of single values.

# Arguments

- `x`: a `Raster` or `RasterStack` to extract values from.
- `geoms`: GeoInterface.jl compatible geometries, or tables or iterables of geometries.

# Keywords

- `atol`: a tolorerance for floating point lookup values for when the `LookupArray`
    contains `Points`. `atol` is ignored for `Intervals`.

# Example

Here we extact points matching the occurrence of the Mountain Pygmy Possum,
_Burramis parvus_. This could be used to fit a species distribution model.

```jldoctest
using Rasters, GBIF, CSV

# Get a stack of BioClim layers, and replace missing values with `missing`
st = RasterStack(WorldClim{BioClim}, (1, 3, 5, 7, 12))[Band(1)] |> replace_missing

# Download some occurrence data
obs = GBIF.occurrences("scientificName" => "Burramys parvus", "limit" => 5)

# Convert observations to points
points = ((o.longitude, o.latitude) for o in obs if !ismissing(o.longitude))

# use `extract` to get values for all layers at each observation point.
vals = collect(extract(st, points))

# output
4-element Vector{NamedTuple{(:geometry, :bio1, :bio3, :bio5, :bio7, :bio12), Tuple{Tuple{Float64, Float64}, Float32, Float32, Float32, Float32, Float32}}}:
 (geometry = (148.450743, -35.999643), bio1 = 8.269542, bio3 = 41.030262, bio5 = 21.4485, bio7 = 23.858, bio12 = 1440.0)
 (geometry = (148.450743, -35.999643), bio1 = 8.269542, bio3 = 41.030262, bio5 = 21.4485, bio7 = 23.858, bio12 = 1440.0)
 (geometry = (148.451335, -35.999862), bio1 = 8.269542, bio3 = 41.030262, bio5 = 21.4485, bio7 = 23.858, bio12 = 1440.0)
 (geometry = (148.451335, -35.999862), bio1 = 8.269542, bio3 = 41.030262, bio5 = 21.4485, bio7 = 23.858, bio12 = 1440.0)
```
"""
function extract(x::RasterStackOrArray, data; 
    dims=DD.dims(x, DEFAULT_POINT_ORDER), kw...
)
    _extract(x, data; dims, names=_names(x), kw...)
end
_extract(A::RasterStackOrArray, point::Missing; kw...) = missing
function _extract(A::RasterStackOrArray, geom; kw...) 
    _extract(A, GI.geomtrait(geom), geom; kw...) 
end
function _extract(A::RasterStackOrArray, ::Nothing, geoms; kw...) 
    geom1 = first(skipmissing(geoms))
    if GI.isgeometry(geom1) || GI.isfeature(geom1) || GI.isfeaturecollection(geom1)
        (_extract(A, g; kw...) for g in geoms)
    else
        throw(ArgumentError("`data` does not contain geomety objects"))
    end
end
function _extract(A::RasterStackOrArray, ::GI.AbstractFeatureTrait, feature; kw...) 
    _extract(A, GI.geometry(feature); kw...) 
end
function _extract(A::RasterStackOrArray, ::GI.AbstractMultiPointTrait, geom; kw...) 
    (_extract(A, p; kw...) for p in GI.getpoint(geom))
end
function _extract(A::RasterStackOrArray, ::GI.AbstractGeometryTrait, geom; names, kw...) 
    B = boolmask(geom; to=dims(A, DEFAULT_POINT_ORDER), kw...)
    pts = DimPoints(B)
    dis = DimIndices(B)
    ((; geometry=_geom_nt(dims(B), pts[I]), _prop_nt(A, I, names)...) for I in CartesianIndices(B) if B[I])  
end
_geom_nt(dims::DimTuple, pts) = NamedTuple{map(dim2key, dims)}(pts) 
_prop_nt(st::AbstractRasterStack, I, names::NamedTuple{K}) where K = NamedTuple{K}(values(st[I]))
_prop_nt(A::AbstractRaster, I, names::NamedTuple{K}) where K = NamedTuple{K}((A[I],))

function _extract(x::RasterStackOrArray, ::GI.PointTrait, point; dims, names, atol=nothing)
    # Get the actual dimensions available in the object
    coords = map(DD.dims(x)) do d
        _dimcoord(d, point)
    end

    # Extract the values
    if any(map(ismissing, coords)) 
        # TODO test this branch somehow
        geometry = map(_ -> missing, coords)
        layer_vals = map(_ -> missing, names)
    else
        selectors = map(dims, coords) do d, c
            _at_or_contains(d, c, atol)
        end
        layer_vals = if DD.hasselection(x, selectors)
            x isa Raster ? (x[selectors...],) : x[selectors...]
        else
            map(_ -> missing, names)
        end
        geometry = point
    end
    properties = NamedTuple{keys(names)}(layer_vals)
    return (; geometry, properties...)
end

_names(A::AbstractRaster) = NamedTuple{(Symbol(name(A)),)}((Symbol(name(A)),))
_names(A::AbstractRasterStack) = NamedTuple{keys(A)}(keys(A))
