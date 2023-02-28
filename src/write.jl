"""
    Base.write(filename::AbstractString, A::AbstractRaster; kw...)

Write an [`AbstractRaster`](@ref) to file, guessing the backend from the file extension.

Keyword arguments are passed to the `write` method for the backend.
"""
function Base.write(
    filename::AbstractString, A::AbstractRaster; kw...
)
    write(filename, _sourcetype(filename), A; kw...)
end
Base.write(A::AbstractRaster) = write(filename(A), A)

"""
    Base.write(filename::AbstractString, s::AbstractRasterStack; suffix, kw...)

Write any [`AbstractRasterStack`](@ref) to file, guessing the backend from the file extension.

## Keywords

- `suffix`: suffix to append to file names. By default the layer key is used. 

Other keyword arguments are passed to the `write` method for the backend.

If the source can't be saved as a stack-like object, individual array layers will be saved.
"""
function Base.write(filename::AbstractString, s::AbstractRasterStack; suffix=nothing, ext=nothing, kw...)
    if isnothing(ext)
        base, ext = splitext(filename)
    else
        base = filename
    end
    T = _sourcetype(filename)
    if haslayers(T)
        write(filename, _sourcetype(filename), s; kw...)
    else
        # Otherwise write separate files for each layer
        suffix1 = if suffix === nothing
            divider = Sys.iswindows() ? '\\' : '/'
            # Add an underscore to the key if there is a file name already
            spacer = last(filename) == divider ? "" : "_"
            map(k -> string(spacer, k), keys(s))
        else
            suffix 
        end
        @warn string("Cannot write stacks to \"", ext, "\", writing layers as individual files")
        map(keys(s), suffix1) do key, sfx
            fn = string(base, sfx, ext)
            write(fn, _sourcetype(filename), s[key])
        end
    end
end

"""
    Base.write(filename::AbstractString, s::AbstractRasterSeries; kw...)

Write any [`AbstractRasterSeries`](@ref) to file, guessing the backend from the file extension.

The lookup values of the series will be appended to the filename (before the extension),
separated by underscores.

## Keywords

See other docs for `write`. All keywords are passed through to `Raster` and `RasterStack` methods.
"""
function Base.write(
    filename::AbstractString, A::AbstractRasterSeries; kw...
)
    S = _sourcetype(filename) 
    base, ext = splitext(filename)
    map(A, DimPoints(A)) do raster, p
        slice_filename = string(base, "_", join(map(string, p), "_"), ext)
        write(slice_filename, S, raster; kw...)
    end
end

# Trait for source data that has stack layers
haslayers(T) = false
