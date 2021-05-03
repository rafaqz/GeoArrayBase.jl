using .RasterDataSources

using .RasterDataSources: RasterDataSource

const RDS = RasterDataSources

const LayerItr = Union{AbstractArray,Tuple}

"""
    geoarray(T::Type{<:RasterDataSource}, [layer]; kw...) => AbstractArray

Load a `RasterDataSource` as an `AbstractGeoArray`. `T`, `args` are
are passed to `getraster`, while `kw` args are for both `getraster` and
`AbstractGeoStack`.

# Keywords

- `month`: For `Climate` datasets
- `date`: For `Weather` datasets
- `res`: For datasets with multiple resolutions

Normal `geoarray` keywords are passed to the array constructor.
"""
geoarray(T::Type{<:RasterDataSource}; kw...) = geoarray(T, first(RDS.layers(T)); kw...) 
function geoarray(T::Type{<:RasterDataSource}, layer; kw...)
    rds_kw, gd_kw = _filterkw(kw)
    filename = getraster(T, layer; rds_kw...)
    geoarray(filename; name=_layerkey(T, layer), _sourcekw(T)..., gd_kw...)
end

"""
    stack(T::Type{<:RasterDataSource}, [layers::Union{Symbol,AbstractArray,Tuple}]; kw...) => AbstractGeoStack

Load a `RasterDataSource` as an `AbstractGeoStack`. `T`, `args` are
are passed to `getraster`, while `kw` args are for both `getraster` and
`AbstractGeoStack`.

# Keywords

- `month`: For `Climate` datasets
- `date`: For `Weather` datasets
- `res`: For datasets with multiple resolutions

Normal `stack` keywords are passed to the array constructor.
"""
stack(T::Type{<:RasterDataSource}, layer::Symbol; kw...) = stack(T, (layer,); kw...) 
stack(T::Type{<:RasterDataSource}; kw...) = stack(T, RDS.layers(T); kw...) 
function stack(T::Type{<:RasterDataSource}, layers::LayerItr; childkwargs=(), kw...)
    rds_kw, gd_kw = _filterkw(kw)
    filenames = map(l -> getraster(T, l; rds_kw...), layers)
    stack(filenames; keys=_layerkey(T, layers), childkwargs=(; _sourcekw(T)..., childkwargs...), gd_kw...)
end

"""
    series(T::Type{<:RasterDataSource}, [layers::Union{Symbol,AbstractArray,Tuple}]; kw...) => AbstractGeoSeries

Load a `RasterDataSource` as an `AbstractGeoSeries`. `T`, `args` are
are passed to `getraster`, while `kw` args are for both `getraster` and
`AbstractGeoSeries`.


# Keywords

- `month`: For `Climate` datasets
- `date`: For `Weather` datasets
- `res`: For datasets with multiple resolutions

Normal `stack` keywords are passed to the array constructor.
"""
series(T::Type{<:RasterDataSource}, layer::Symbol; kw...) = series(T, (layer,); kw...) 
series(T::Type{<:RasterDataSource}; kw...) = series(T, RDS.layers(T); kw...) 
# Int month time-series
function series(T::Type{WorldClim{Climate}}, layers::LayerItr;
    res=RDS.defres(T), month=1:12, window=(), kw...
)
    timedim = Ti(month; mode=Sampled(span=Regular(1), sampling=Intervals(Start())))
    stacks = [stack(T, layers; res=res, month=m, window=window) for m in month]
    GeoSeries(stacks, timedim; kw...)
end
# DateTime time-series
function series(T::Type{<:Union{WorldClim{Weather},ALWB,AWAP}}, layers::LayerItr; date, window=(), kw...)
    step = _seriesstep(T)
    dates = RDS._date_sequence(date, step)
    timedim = Ti(dates; mode=Sampled(Ordered(), Regular(step), Intervals(Start())))
    stacks = [stack(T, layers; date=d, window=window) for d in dates]
    GeoSeries(stacks, timedim; kw...)
end

_sourcekw(T) = ()
_sourcekw(T::Type{AWAP}) = (crs=EPSG(4326),)

_layerkey(T::Type{<:RasterDataSource}, keys::LayerItr) = map(k -> _layerkey(T, k), keys) 
_layerkey(T::Type{<:Union{CHELSA{BioClim},WorldClim{BioClim}}}, key::Int) = string("BIO", key)
_layerkey(T::Type{<:RasterDataSource}, key) = Symbol(key)

_seriesstep(T::Type{<:ALWB{M,P}}) where {M,P} = P(1)
_seriesstep(T::Type{<:WorldClim{<:Weather}}) = Month(1)
_seriesstep(T::Type{<:AWAP}) = Day(1)

function _filterkw(kw)
    rds = []; gd = []
    for p in kw
        dest = first(p) in (:date, :month, :res, :discover) ? rds : gd
        push!(dest, p)
    end
    rds, gd
end
