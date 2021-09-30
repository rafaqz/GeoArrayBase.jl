using GeoData, Test, Dates
using GeoData.LookupArrays, GeoData.Dimensions

# GeoSeries from GeoArray/GeoStack components

data1 = [1 2 3 4
         5 6 7 8]
data2 = 2 * data1
data3 = 3 * data1
data4 = 4 * data1
dimz = X([30, 40]), Y(-10.0:10.0:20.0)
ga1 = GeoArray(data1, dimz)
ga2 = GeoArray(data2, dimz)
ga1a = GeoArray(data3, dimz)
ga2a = GeoArray(data4, dimz)
stack1 = GeoStack(ga1, ga2; keys=(:ga1, :ga2))
stack2 = GeoStack(ga1a, ga2a; keys=(:ga1, :ga2))
dates =[DateTime(2017), DateTime(2018)]
ser = GeoSeries([stack1, stack2], (Ti(dates),))
@test issorted(dates)

@testset "getindex returns the currect types" begin
    @test ser[Ti(1)] isa GeoStack{<:NamedTuple}
    @test ser[Ti(1)][:ga2] isa GeoArray{Int,2}
    @test ser[Ti(1)][:ga2, 1, 1] isa Int
    @test ser[Ti(1)][:ga2][1, 1] isa Int
end

@testset "properties" begin
    @test refdims(ser) === ()
    # Should these be real fields? what is the use-case?  @test metadata(ser) === nothing @test name(ser) === ""
    @test label(ser) === ""
end

@testset "getindex returns the currect results" begin
    @test ser[Ti(Near(DateTime(2017)))][:ga1][X(1), Y(3)] === 3
    @test ser[Ti(At(DateTime(2017)))][:ga1, X(1), Y(3)] === 3
    @test ser[Ti(At(DateTime(2018)))][:ga2][X(2), Y(4)] === 32
    @test ser[Ti(At(DateTime(2018)))][:ga2, X(2), Y(4)] === 32
    @test ser[Ti(1)][:ga1, X(1), Y(2)] == 2
    @test ser[Ti(1)][:ga2, X(2), Y(3:4)] == [14, 16] 
end

@testset "getindex is type stable all the way down" begin
    # @inferred ser[Ti(At(DateTime(2017)))][:ga1, X(1), Y(2)]
    @inferred ser[Ti(1)][:ga1][X(1), Y(2)]
    # @inferred ser[Ti(1)][:ga1, X(1), Y(2:4)]
    # @inferred ser[Ti(1)][:ga1][X(1), Y(2:4)]
    # @inferred ser[1][:ga1, X(1:2), Y(:)]
    # @inferred ser[1][:ga1][X(1:2), Y(:)]
end

@testset "setindex!" begin
    ser[1] = ser[2]
    @test typeof(ser[1]) == typeof(ser[2]) == eltype(parent(ser))
    typeof(parent(ser)[1]) == eltype(ser)
    ser[Ti(1)] = ser[Ti(2)]
    @test ser[Ti(1)] == ser[Ti(2)]
end

@testset "rebuild" begin
    @test rebuild(ser, parent(ser)) === ser
    @test rebuild(ser; dims=dims(ser)) === ser
    @test rebuild(ser; dims=(X(),)) !== ser
    @test rebuild(ser; name=nothing) === ser
    @test rebuild(ser; metadata=nothing) === ser
end

@testset "slice, combine" begin
    ga1 = GeoArray(ones(4, 5, 10), (X(), Y(), Ti(10:10:100))) .* reshape(1:10, (1, 1, 10))
    ga2 = ga1 .* 2
    ser = slice(ga1, Ti)
    @test size(ser) == (10,)
    combined = GeoData.combine(ser, Ti())
    @test combined == ga1
    @test dims(combined) === dims(ga1)
    ser = slice(ga1, (X, Ti))
    @test size(ser) == (4, 10)
    ser = slice(ga1, (X, Y, Ti))
    combined2 = GeoData.combine(ser, (X, Y, Ti))
    @test combined == ga1 == permutedims(combined2, (X, Y, Ti))
    @test dims(combined) === dims(ga1) == dims(permutedims(combined2, (X, Y, Ti)))
    stack = GeoStack((ga1=ga1, ga2=ga2))
    ser = slice(stack, Ti)
    @test size(ser) == (10,)
    combined = GeoData.combine(ser, Ti)
    ser = slice(stack, (Y, Ti))
    @test size(ser) == (5, 10,)
    combined = GeoData.combine(ser, (Y, Ti))
end


@testset "show" begin
    # 2d
    ser2 = slice(ga1, (X, Y))
    sh = sprint(show, MIME("text/plain"), ser2)
    # Test but don't lock this down too much
    @test occursin("GeoSeries", sh)
    @test occursin("GeoArray", sh)
    @test occursin("X", sh)
    @test occursin("Y", sh)
    # 1d
    ser1 = slice(ga1, X)
    sh = sprint(show, MIME("text/plain"), ser1)
    # Test but don't lock this down too much
    @test occursin("GeoSeries", sh)
    @test occursin("GeoArray", sh)
    @test occursin("X", sh)
end
