"""
    FileStack{X,K}

    FileStack{X,K}(filename, types, sizes, eachchunk, haschunks, write)

Wrapper object that holds file poiinter and size/chunking
metadata for a multi-layered stack stored in a single file.

`X` is a backend singleton like `GDALfile`, and `K` is a tuple
of `Symbol` keys.
"""
struct FileStack{X,K,F<:AbstractString,T<:NamedTuple,S<:NamedTuple,EC,HC}
    filename::F
    types::T
    sizes::S
    eachchunk::EC
    haschunks::HC
    write::Bool
end
function FileStack{X,K}(
    filename::F, types::T, sizes::S, eachchunk::EC, haschunks::HC, write::Bool
) where {X,K,F,T,S,EC,HC}
    FileStack{X,K,F,T,S,EC,HC}(filename, types, sizes, eachchunk, haschunks, write)
end

ConstructionBase.constructorof(::Type{<:FileStack{X,K}}) where {X,K} = FileStack{X,K} 

filename(fs::FileStack) = fs.filename
Base.keys(fs::FileStack{<:Any,K}) where K = K
Base.values(fs::FileStack{<:Any}) = (fs[k] for k in keys(fs))
function Base.getindex(fs::FileStack{X}, key::Symbol) where X
    size = fs.sizes[key]
    eachchunk = fs.eachchunk[key]
    haschunks = fs.haschunks[key]
    T = fs.types[key]
    N = length(size)
    A = FileArray{X,T,N}(filename(fs), size, key, eachchunk, haschunks, fs.write)
end
