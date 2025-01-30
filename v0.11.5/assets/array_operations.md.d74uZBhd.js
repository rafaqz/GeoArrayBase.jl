import{_ as s,c as a,o as n,a7 as t}from"./chunks/framework.DuVDcrla.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"array_operations.md","filePath":"array_operations.md","lastUpdated":null}'),e={name:"array_operations.md"},i=t(`<p>Most base methods work as for regular julia <code>Array</code>s, such as <code>reverse</code> and rotations like <code>rotl90</code>. Base, statistics and linear algebra methods like <code>mean</code> that take a <code>dims</code> argument can also use the dimension name.</p><h2 id="Mean-over-the-time-dimension:" tabindex="-1">Mean over the time dimension: <a class="header-anchor" href="#Mean-over-the-time-dimension:" aria-label="Permalink to &quot;Mean over the time dimension: {#Mean-over-the-time-dimension:}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Rasters, Statistics, RasterDataSources</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Raster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(WorldClim{BioClim}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭──────────────────────────────────╮</span></span>
<span class="line"><span>│ 2160×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├──────────────────────────────────┴───────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ X Projected{Float64} LinRange{Float64}(-180.0, 179.83333333333331, 2160) ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(X = (-180.0, 179.99999999999997), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -3.4f38</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →    89.8333  89.6667  89.5     89.3333  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0    -3.4f38  -3.4f38  -3.4f38  -3.4f38     -15.399   -13.805   -14.046</span></span>
<span class="line"><span>    ⋮                                          ⋱              ⋮       </span></span>
<span class="line"><span>  179.833  -3.4f38  -3.4f38  -3.4f38  -3.4f38     -17.1478  -15.4243  -15.701</span></span></code></pre></div><p>Then we do the mean over the <code>X</code> dimension</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">mean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A, dims</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">X) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Ti if time were available would also be possible</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭───────────────────────────────╮</span></span>
<span class="line"><span>│ 1×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├───────────────────────────────┴──────────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ X Projected{Float64} -180.0:360.0:-180.0 ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(X = (-180.0, 180.0), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -3.4f38</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →   89.8333   89.6667   89.5   89.3333  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0  -Inf      -Inf      -Inf   -Inf         -23.0768  -22.9373  -22.0094</span></span></code></pre></div><p><code>broadcast</code> works lazily from disk when <code>lazy=true</code>, and is only applied when data is directly indexed. Adding a dot to any function will use broadcast over a <code>Raster</code> just like an <code>Array</code>.</p><h2 id="broadcasting" tabindex="-1">Broadcasting <a class="header-anchor" href="#broadcasting" aria-label="Permalink to &quot;Broadcasting&quot;">​</a></h2><p>For a disk-based array <code>A</code>, this will only be applied when indexing occurs or when we <a href="/Rasters.jl/v0.11.5/api#Base.read-Tuple{Union{AbstractRaster, AbstractRasterSeries, AbstractRasterStack}}"><code>read</code></a> the array.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.*=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭──────────────────────────────────╮</span></span>
<span class="line"><span>│ 2160×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├──────────────────────────────────┴───────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ X Projected{Float64} LinRange{Float64}(-180.0, 179.83333333333331, 2160) ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(X = (-180.0, 179.99999999999997), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -3.4f38</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →     89.8333   89.6667   89.5  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0    -Inf      -Inf      -Inf      -30.798   -27.61    -28.092</span></span>
<span class="line"><span>    ⋮                                 ⋱              ⋮       </span></span>
<span class="line"><span>  179.833  -Inf      -Inf      -Inf      -34.2955  -30.8485  -31.402</span></span></code></pre></div><p>To broadcast directly to disk, we need to open the file in write mode:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Raster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(filename); write</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> O</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   O </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.*=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>To broadcast over a <code>RasterStack</code> use <code>map</code>, which applies a function to the raster layers of the stack.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">newstack </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(stack) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> raster</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   raster </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><h2 id="Modifying-object-properties" tabindex="-1">Modifying object properties <a class="header-anchor" href="#Modifying-object-properties" aria-label="Permalink to &quot;Modifying object properties {#Modifying-object-properties}&quot;">​</a></h2><p><code>rebuild</code> can be used to modify the fields of an object, generating a new object (but possibly holding the same arrays or files).</p><p>If you know that a file had an incorrectly specified missing value, you can do:</p><h3 id="rebuild" tabindex="-1">rebuild <a class="header-anchor" href="#rebuild" aria-label="Permalink to &quot;rebuild&quot;">​</a></h3><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">A </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Raster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(WorldClim{BioClim}, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">rebuild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A; missingval</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9999</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭──────────────────────────────────╮</span></span>
<span class="line"><span>│ 2160×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├──────────────────────────────────┴───────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ X Projected{Float64} LinRange{Float64}(-180.0, 179.83333333333331, 2160) ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(X = (-180.0, 179.99999999999997), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -9999.0f0</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →    89.8333  89.6667  89.5     89.3333  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0    -3.4f38  -3.4f38  -3.4f38  -3.4f38     -15.399   -13.805   -14.046</span></span>
<span class="line"><span>    ⋮                                          ⋱              ⋮       </span></span>
<span class="line"><span>  179.833  -3.4f38  -3.4f38  -3.4f38  -3.4f38     -17.1478  -15.4243  -15.701</span></span></code></pre></div><p>(<code>replace_missing</code> will actually replace the current values).</p><p>Or if you need to change the name of the layer:</p><p>Then use <code>rebuild</code> as</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">B </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rebuild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A; name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:temperature</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">B</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>:temperature</span></span></code></pre></div><h3 id="replace-missing" tabindex="-1">replace_missing <a class="header-anchor" href="#replace-missing" aria-label="Permalink to &quot;replace_missing&quot;">​</a></h3><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">replace_missing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A, missingval</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9999</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭──────────────────────────────────╮</span></span>
<span class="line"><span>│ 2160×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├──────────────────────────────────┴───────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ X Projected{Float64} LinRange{Float64}(-180.0, 179.83333333333331, 2160) ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(X = (-180.0, 179.99999999999997), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -9999.0f0</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →       89.8333     89.6667     89.5  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0    -9999.0     -9999.0     -9999.0     -15.399   -13.805   -14.046</span></span>
<span class="line"><span>    ⋮                                       ⋱              ⋮       </span></span>
<span class="line"><span>  179.833  -9999.0     -9999.0     -9999.0     -17.1478  -15.4243  -15.701</span></span></code></pre></div><h3 id="set" tabindex="-1">set <a class="header-anchor" href="#set" aria-label="Permalink to &quot;set&quot;">​</a></h3><p><code>set</code> can be used to modify the nested properties of an objects dimensions, that are more difficult to change with <code>rebuild</code>. <code>set</code> works on the principle that dimension properties can only be in one specific field, so we generally don&#39;t have to specify which one it is. <code>set</code> will also try to update anything affected by a change you make.</p><p>This will set the <code>X</code> axis to specify points, instead of intervals:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Rasters</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Points</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A, X </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Points)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭──────────────────────────────────╮</span></span>
<span class="line"><span>│ 2160×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├──────────────────────────────────┴───────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ X Projected{Float64} LinRange{Float64}(-180.0, 179.83333333333331, 2160) ForwardOrdered Regular Points,</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(X = (-180.0, 179.83333333333331), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -3.4f38</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →    89.8333  89.6667  89.5     89.3333  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0    -3.4f38  -3.4f38  -3.4f38  -3.4f38     -15.399   -13.805   -14.046</span></span>
<span class="line"><span>    ⋮                                          ⋱              ⋮       </span></span>
<span class="line"><span>  179.833  -3.4f38  -3.4f38  -3.4f38  -3.4f38     -17.1478  -15.4243  -15.701</span></span></code></pre></div><p>We can also reassign dimensions, here <code>X</code> becomes <code>Z</code>:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(A, X </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Z)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>╭──────────────────────────────────╮</span></span>
<span class="line"><span>│ 2160×1080 Raster{Float32,2} bio5 │</span></span>
<span class="line"><span>├──────────────────────────────────┴───────────────────────────────────── dims ┐</span></span>
<span class="line"><span>  ↓ Z Projected{Float64} LinRange{Float64}(-180.0, 179.83333333333331, 2160) ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span>  → Y Projected{Float64} LinRange{Float64}(89.83333333333333, -90.0, 1080) ReverseOrdered Regular Intervals{Start}</span></span>
<span class="line"><span>├──────────────────────────────────────────────────────────────────── metadata ┤</span></span>
<span class="line"><span>  Metadata{Rasters.GDALsource} of Dict{String, Any} with 4 entries:</span></span>
<span class="line"><span>  &quot;units&quot;    =&gt; &quot;&quot;</span></span>
<span class="line"><span>  &quot;offset&quot;   =&gt; 0.0</span></span>
<span class="line"><span>  &quot;filepath&quot; =&gt; &quot;./WorldClim/BioClim/wc2.1_10m_bio_5.tif&quot;</span></span>
<span class="line"><span>  &quot;scale&quot;    =&gt; 1.0</span></span>
<span class="line"><span>├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span>  extent: Extent(Z = (-180.0, 179.99999999999997), Y = (-90.0, 90.0))</span></span>
<span class="line"><span>  missingval: -3.4f38</span></span>
<span class="line"><span>  crs: GEOGCS[&quot;WGS 84&quot;,DATUM[&quot;WGS_1984&quot;,SPHEROID[&quot;WGS 84&quot;,6378137,298.257223563,AUTHORITY[&quot;EPSG&quot;,&quot;7030&quot;]],AUTHORITY[&quot;EPSG&quot;,&quot;6326&quot;]],PRIMEM[&quot;Greenwich&quot;,0,AUTHORITY[&quot;EPSG&quot;,&quot;8901&quot;]],UNIT[&quot;degree&quot;,0.0174532925199433,AUTHORITY[&quot;EPSG&quot;,&quot;9122&quot;]],AXIS[&quot;Latitude&quot;,NORTH],AXIS[&quot;Longitude&quot;,EAST],AUTHORITY[&quot;EPSG&quot;,&quot;4326&quot;]]</span></span>
<span class="line"><span>└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    ↓ →    89.8333  89.6667  89.5     89.3333  …  -89.6667  -89.8333  -90.0</span></span>
<span class="line"><span> -180.0    -3.4f38  -3.4f38  -3.4f38  -3.4f38     -15.399   -13.805   -14.046</span></span>
<span class="line"><span>    ⋮                                          ⋱              ⋮       </span></span>
<span class="line"><span>  179.833  -3.4f38  -3.4f38  -3.4f38  -3.4f38     -17.1478  -15.4243  -15.701</span></span></code></pre></div><p><code>setcrs(A, crs)</code> and <code>setmappedcrs(A, crs)</code> will set the crs value/s of an object to any <code>GeoFormat</code> from GeoFormatTypes.jl.</p>`,39),p=[i];function l(o,u,c,d,r,h){return n(),a("div",null,p)}const g=s(e,[["render",l]]);export{k as __pageData,g as default};
