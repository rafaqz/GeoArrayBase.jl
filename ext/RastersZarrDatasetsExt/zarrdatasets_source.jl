RA.sourceconstructor(::Type{Zarrsource}) = ZD.ZarrDataset

function RA.checkmode(::Zarrsource, filename, append::Bool, force::Bool)
    append && throw(ArgumentError("ZarrDatasets.jl does not support appending"))
    RA.check_can_write(filename, force)
    return "c"
end

# In ZarrDatasets, the file is open for reading the values and closed afterwards. 
Base.close(os::RA.OpenStack{Zarrsource}) = nothing

function RA._open(f, ::Zarrsource, filename::AbstractString; write=false, kw...)
    ds = ZarrDatasets.ZarrDataset(filename)
    RA._open(f, Zarrsource(), ds; kw...)
end

RA._sourcetrait(::ZD.ZarrVariable) = Zarrsource()
RA._sourcetrait(::ZD.ZarrDataset) = Zarrsource()

RA.missingval(var::ZD.ZarrVariable, args...) = RA.missingval(RA.Metadata{Zarrsource}(CDM.attribs(var)))
RA.missingval(var::ZD.ZarrVariable, md::RA.Metadata{<:Zarrsource}) = RA.missingval(md)

# TODO move this upstream to CommonDataModel.jl and Datasets packages
function RA.missingval(md::RA.Metadata{<:Zarrsource})
    fv = get(md, "_FillValue", nothing)
    mv = get(md, "missing_value", nothing)
    if isnothing(fv)
        if mv isa Vector
            length(mv) > 1 && @warn "'missing_value' $mv has multiple values. Currently we only uses the first."
            return first(mv)
        else
            return mv
        end
    else
        if !isnothing(mv) 
            fv == mv || @warn "Both '_FillValue' $fv and 'missing_value' $mv were found. Currently we only use the first."
        end
        return fv
    end
end