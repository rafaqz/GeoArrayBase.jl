"""
    warp(A::AbstractRaster, flags::Dict)

Gives access to the GDALs `gdalwarp` method given a `Dict` of flags,
where arguments than can be converted to strings, or vectors
of such arguments for flags that take multiple space-separated arguments.

Arrays with additional dimensions not handled by GDAL (ie other than X, Y, Band)
are sliced, warped, and then combined - these dimensions will not change.

See [the gdalwarp docs](https://gdal.org/programs/gdalwarp.html) for a list of arguments.

## Example

This simply resamples the array with the `:tr` (output file resolution) and `:r`
flags, giving us a pixelated version:

```jldoctest
using Rasters, RasterDataSources, Plots
A = Raster(WorldClim{Climate}, :prec; month=1)
plot(A)
savefig("build/warp_example_before.png")
flags = Dict(
    :tr => [2.0, 2.0],
    :r => :near,
)
warp(A, flags) |> plot

savefig("build/warp_example_after.png")
# output
```

### Before `warp`:

![before warp](warp_example_before.png)

### After `warp`:

![after warp](warp_example_after.png)

In practise, prefer [`resample`](@ref) for this. But `warp` may be more flexible.

$EXPERIMENTAL
"""
function warp(A::AbstractRaster, flags::Dict; kw...)
    odims = otherdims(A, (X, Y, Band))
    if length(odims) > 0
        # Handle dimensions other than X, Y, Band
        slices = slice(A, odims)
        warped = map(A -> _warp(A, flags), slices)
        return combine(warped, odims)
    else
        return _warp(A, flags; kw...)
    end
end
function warp(st::AbstractRasterStack, flags::Dict; filename=nothing, suffix=keys(st), kw...)
    mapargs((A, s) -> warp(A, flags; filename, suffix=s), st, suffix; kw...)
end

function _warp(A::AbstractRaster, flags::Dict; filename=nothing, suffix="", kw...)
    filename = _maybe_add_suffix(filename, suffix)
    flagvect = reduce([flags...]; init=[]) do acc, (key, val)
        append!(acc, String[_asflag(key), _stringvect(val)...])
    end
    tempfile = isnothing(filename) ? nothing : tempname() * ".tif"
    warp_kw = isnothing(filename) || filename == "/vsimem/tmp" ? () : (; dest=filename)
    AG.Dataset(A; filename=tempfile, kw...) do dataset
        AG.gdalwarp([dataset], flagvect; warp_kw...) do warped
            raster = _maybe_permute_from_gdal(Raster(warped), dims(A))
            # Drop the Band dim unless it exists in `A`
            if hasdim(A, Band())
                raster 
            else
                if hasdim(raster, Band())
                    rebuild(view(raster, Band(1)); refdims=refdims(A))
                else
                    raster
                end
            end
        end
    end
end

_asflag(x) = string(x)[1] == '-' ? x : string("-", x)

_stringvect(x::AbstractVector) = Vector(string.(x))
_stringvect(x::Tuple) = [map(string, x)...]
_stringvect(x) = [string(x)]

