import{_ as h,c as t,j as i,a,G as l,a5 as e,B as k,o as p}from"./chunks/framework.DxMbCx6Y.js";const r="/Rasters.jl/previews/PR854/assets/ktcqpvq.DdtYyM8O.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"manual/cellarea.md","filePath":"manual/cellarea.md","lastUpdated":null}'),d={name:"manual/cellarea.md"},g={class:"jldocstring custom-block"};function y(c,s,o,E,f,F){const n=k("Badge");return p(),t("div",null,[s[3]||(s[3]=i("h2",{id:"cellarea",tabindex:"-1"},[i("code",null,"cellarea"),a(),i("a",{class:"header-anchor",href:"#cellarea","aria-label":'Permalink to "`cellarea` {#cellarea}"'},"​")],-1)),i("details",g,[i("summary",null,[s[0]||(s[0]=i("a",{id:"Rasters.cellarea-manual-cellarea",href:"#Rasters.cellarea-manual-cellarea"},[i("span",{class:"jlbinding"},"Rasters.cellarea")],-1)),s[1]||(s[1]=a()),l(n,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[2]||(s[2]=e(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cellarea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([method], x)</span></span></code></pre></div><p>Gives the approximate area of each gridcell of <code>x</code>. By assuming the earth is a sphere, it approximates the true size to about 0.1%, depending on latitude.</p><p>Run <code>using ArchGDAL</code> or <code>using Proj</code> to make this method fully available.</p><ul><li><p><code>method</code>: You can specify whether you want to compute the area in the plane of your projection <code>Planar()</code> or on a sphere of some radius <code>Spherical(; radius=...)</code>(the default).</p></li><li><p><code>Spherical</code> will compute cell area on the sphere, by transforming all points back to long-lat. You can specify the radius by the <code>radius</code> keyword argument here. By default, this is <code>6371008.8</code>, the mean radius of the Earth.</p></li><li><p><code>Planar</code> will compute cell area in the plane of the CRS you have chosen. Be warned that this will likely be incorrect for non-equal-area projections.</p></li></ul><p>Returns a Raster with the same x and y dimensions as the input, where each value in the raster encodes the area of the cell (in meters by default).</p><p><strong>Example</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Rasters, ArchGDAL, Rasters</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Lookups</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xdim </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> X</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Projected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">120</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; sampling</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Intervals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()), crs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EPSG</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4326</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ydim </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Projected</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; sampling</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Intervals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()), crs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">EPSG</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4326</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">myraster </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(xdim, ydim)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cellarea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(myraster)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># output</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">╭───────────────────────╮</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│ </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">×</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Raster{Float64,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├───────────────────────┴─────────────────────────────────────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ↓</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> X Projected{Float64} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">120.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ForwardOrdered Regular Intervals{Start},</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  →</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Y Projected{Float64} </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10.0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ForwardOrdered Regular Intervals{Start}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├───────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  extent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Extent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(X </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">90.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">130.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), Y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  crs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> EPSG</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4326</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─────────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   ↓</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> →</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        10.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        20.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        30.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            40.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      50.0</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  90.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.23017e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.19279e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.11917e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.01154e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  873182.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  708290.0</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.23017e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.19279e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.11917e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.01154e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  873182.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  708290.0</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 110.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.23017e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.19279e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.11917e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.01154e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  873182.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  708290.0</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 120.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  1.23017e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.19279e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.11917e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1.01154e6</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  873182.0</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  708290.0</span></span></code></pre></div><p>WARNING: This feature is experimental. It may change in future versions, and may not be 100% reliable in all cases. Please file github issues if problems occur.</p><p><a href="https://github.com/rafaqz/Rasters.jl/blob/2dd8ad8e5131b99b1cb8a0228e3f319f7fccf475/src/extensions.jl#L161-L205" target="_blank" rel="noreferrer">source</a></p>`,9))]),s[4]||(s[4]=e(`<p>Computing the area of each cell in a raster is useful for a number of reasons - if you have a variable like population per cell, or elevation (<a href="https://r-spatial.org/book/05-Attributes.html#sec-extensiveintensive" target="_blank" rel="noreferrer">spatially extensive variables</a>), you&#39;ll want to account for the fact that different cells have different areas.</p><p>Let&#39;s construct a raster and see what this looks like! We&#39;ll keep it in memory.</p><p>The spherical method relies on the <a href="https://github.com/JuliaGeo/Proj.jl" target="_blank" rel="noreferrer">Proj.jl</a> package to perform coordinate transformation, so that has to be loaded explicitly.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Rasters, Proj</span></span></code></pre></div><p>To construct a raster, we&#39;ll need to specify the <code>x</code> and <code>y</code> dimensions. These are called <code>lookups</code> in <code>Rasters.jl.</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Rasters</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Lookups</span></span></code></pre></div><p>We can now construct the x and y lookups. Here we&#39;ll use a start-at-one, step-by-five grid. Note that we&#39;re specifying that the &quot;sampling&quot;, i.e., what the coordinates actually mean, is <code>Intervals(Start())</code>, meaning that the coordinates are the starting point of each interval.</p><p>This is in contrast to <code>Points()</code> sampling, where each index in the raster represents the value at a sampling point; here, each index represents a grid cell, which is defined by the coordinate being at the start.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> X</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; sampling </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Intervals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()), crs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> EPSG</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4326</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">80</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; sampling </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Intervals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()), crs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> EPSG</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4326</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span></code></pre></div><p>I have chosen the y-range here specifically so we can show the difference between spherical and planar <code>cellarea</code>.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ras </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Raster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ones</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x, y); crs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> EPSG</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4326</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">┌ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">6</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">×</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">7</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Raster{Float64, 2}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> ┐</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────┴─────────────────────────────────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">X</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Projected{Int64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">1:5:26</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Intervals{Start}</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  → </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">Y</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Projected{Int64} </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">50:5:80</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Intervals{Start}</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">  extent: </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Extent(X = (1, 31), Y = (50, 85))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">  crs: </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">EPSG:4326</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;"> →</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  50</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">    55</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">    60</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">    65</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">    70</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">    75</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">    80</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  1</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.0   1.0   1.0   1.0   1.0   1.0   1.0</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  6</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.0   1.0   1.0   1.0   1.0   1.0   1.0</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 11</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.0   1.0   1.0   1.0   1.0   1.0   1.0</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 16</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.0   1.0   1.0   1.0   1.0   1.0   1.0</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 21</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.0   1.0   1.0   1.0   1.0   1.0   1.0</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 26</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.0   1.0   1.0   1.0   1.0   1.0   1.0</span></span></code></pre></div><p>We can just call <code>cellarea</code> on this raster, which returns cell areas in meters, on Earth, assuming it&#39;s a sphere:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cellarea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ras)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">┌ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">6</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">×</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">7</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Raster{Float64, 2}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> ┐</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────┴─────────────────────────────────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">X</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Projected{Int64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">1:5:26</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Intervals{Start}</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  → </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">Y</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Projected{Int64} </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">50:5:80</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Intervals{Start}</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">  extent: </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Extent(X = (1, 31), Y = (50, 85))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">  crs: </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">EPSG:4326</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;"> →</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  50</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">           55</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">           60</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">           …  </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">75</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">           80</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  1</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.88114e11   1.66031e11   1.42685e11      6.68821e10   4.0334e10</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  6</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.88114e11   1.66031e11   1.42685e11      6.68821e10   4.0334e10</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 11</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.88114e11   1.66031e11   1.42685e11      6.68821e10   4.0334e10</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 16</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.88114e11   1.66031e11   1.42685e11      6.68821e10   4.0334e10</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 21</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.88114e11   1.66031e11   1.42685e11  …   6.68821e10   4.0334e10</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 26</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">     1.88114e11   1.66031e11   1.42685e11      6.68821e10   4.0334e10</span></span></code></pre></div><p>and if we plot it, you can see the difference in cell area as we go from the equator to the poles:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CairoMakie</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">heatmap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cellarea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ras); axis </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (; aspect </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataAspect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()))</span></span></code></pre></div><p><img src="`+r+`" alt=""></p><p>We can also try this using the planar method, which simply computes the area of the rectangle using <code>area = x_side_length * y_side_length</code>:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> cellarea</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Planar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), ras)</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">┌ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">6</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">×</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">7</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Raster{Int64, 2}</span><span style="--shiki-light:#959da5;--shiki-dark:#959da5;"> ┐</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├──────────────────────┴───────────────────────────────────────────────── dims ┐</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓ </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">X</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Projected{Int64} </span><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">1:5:26</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Intervals{Start}</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">,</span></span>
<span class="line"><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  → </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">Y</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;"> Projected{Int64} </span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">50:5:80</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> ForwardOrdered</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Regular</span><span style="--shiki-light:#808080;--shiki-dark:#808080;"> Intervals{Start}</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">├────────────────────────────────────────────────────────────────────── raster ┤</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">  extent: </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">Extent(X = (1, 31), Y = (50, 85))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">  crs: </span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">EPSG:4326</span></span>
<span class="line"><span style="--shiki-light:#959da5;--shiki-dark:#959da5;">└──────────────────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  ↓</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;"> →</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  50</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  55</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  60</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  65</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  70</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  75</span><span style="--shiki-light:#0087d7;--shiki-dark:#0087d7;">  80</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  1</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">    25  25  25  25  25  25  25</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;">  6</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">    25  25  25  25  25  25  25</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 11</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">    25  25  25  25  25  25  25</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 16</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">    25  25  25  25  25  25  25</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 21</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">    25  25  25  25  25  25  25</span></span>
<span class="line"><span style="--shiki-light:#ff875f;--shiki-dark:#ff875f;"> 26</span><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">    25  25  25  25  25  25  25</span></span></code></pre></div><p>Note that this is of course wildly inaccurate for a geographic dataset - but if you&#39;re working in a projected coordinate system, like polar stereographic or Mercator, this can be very useful (and a <em>lot</em> faster)!</p>`,22))])}const m=h(d,[["render",y]]);export{u as __pageData,m as default};
