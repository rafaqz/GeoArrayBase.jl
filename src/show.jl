function Base.show(io::IO, A::AbstractGeoArray)
    l = nameof(typeof(A))
    printstyled(io, nameof(typeof(A)); color=:blue)
    if label(A) != ""
        print(io, " (named ")
        printstyled(io, label(A); color=:blue)
        print(io, ")")
    end
    print(io, " with dimensions:\n")
    for d in dims(A)
        print(io, " ", d, " (length ", length(d), ") \n")
    end
    if !isempty(refdims(A))
        print(io, "and referenced dimensions:\n")
        for d in refdims(A)
            print(io, " ", d, "\n")
        end
    end
    A isa DiskGeoArray && print(io, "\n  From file: $(filename(A))")
end

function Base.show(io::IO, stack::AbstractGeoStack)
    n_fields = length(keys(stack))
    fields_str = n_fields == 1 ? "field" : "fields"
    printstyled(io, "$(Base.typename(typeof(stack)))", color=:blue)
    print(io, " with $n_fields $fields_str")
    stack isa DiskGeoStack && print(io, ": $(filename(stack))")
    print(io, '\n')

    for var in keys(stack)
        printstyled(io, " $var", color=:green)

        field_dims = dims(stack, var)
        n_dims = length(field_dims)
        dims_str = n_dims == 1 ? "dimension" : "dimensions"
        print(io, " with $n_dims $dims_str: ")
        if n_dims > 0
            for (d, dim) in enumerate(field_dims)
                printstyled(io, "$(name(dim))", color=:red)
                d != length(field_dims) && print(io, ", ")
            end
            print(io, " (size ")
            for (d, dim) in enumerate(field_dims)
                print(io, "$(length(dim))")
                d != length(field_dims) && print(io, '×')
            end
            print(io, ')')
        end
        print(io, '\n')
    end

    n_windows = length(window(stack))
    if n_windows > 0
        print(io, "and with window:\n")
        for window in window(stack)
            print(io, ' ')
            show(window)
            print(io, '\n')
        end
    end

    if !isnothing(metadata(stack))
        n_metadata = length(metadata(stack))
        entries_str = n_metadata == 1 ? "entry" : "entries"
        if n_metadata > 0
            print(io, "and $n_metadata metadata $entries_str:\n")
            display(stack.metadata)
        end
    end
end

function Base.show(io::IO, mode::AbstractProjected)
    DD._printmode(io, mode)
    DD._printorder(io, mode)
    print(io, " ", nameof(typeof(span(mode))))
    print(io, " ", nameof(typeof(sampling(mode))))
    print(io, " crs: ", nameof(typeof(crs(mode))))
    print(io, " mappedcrs: ", nameof(typeof(mappedcrs(mode))))
end
