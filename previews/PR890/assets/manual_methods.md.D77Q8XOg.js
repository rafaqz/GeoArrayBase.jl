import{_ as e,c as a,o as s,ai as r}from"./chunks/framework.C3Twhi_y.js";const p=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"manual/methods.md","filePath":"manual/methods.md","lastUpdated":null}'),o={name:"manual/methods.md"};function l(d,t,i,n,c,h){return s(),a("div",null,t[0]||(t[0]=[r('<h2 id="Point,-polygon-and-table-operations" tabindex="-1">Point, polygon and table operations <a class="header-anchor" href="#Point,-polygon-and-table-operations" aria-label="Permalink to &quot;Point, polygon and table operations {#Point,-polygon-and-table-operations}&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;">Methods</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.rasterize"><code>rasterize</code></a></td><td style="text-align:left;">rasterize points and geometries.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.extract"><code>extract</code></a></td><td style="text-align:left;">extract values from points or geometries.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.zonal-Tuple{Any, Union{AbstractRaster, AbstractRasterStack}}"><code>zonal</code></a></td><td style="text-align:left;">calculate zonal statistics for an object masked by geometries.</td></tr></tbody></table><h2 id="Methods-that-change-the-resolution-or-extent-of-an-object" tabindex="-1">Methods that change the resolution or extent of an object <a class="header-anchor" href="#Methods-that-change-the-resolution-or-extent-of-an-object" aria-label="Permalink to &quot;Methods that change the resolution or extent of an object {#Methods-that-change-the-resolution-or-extent-of-an-object}&quot;">​</a></h2><p>Click through to the function documentation for more in-depth descriptions and examples.</p><table tabindex="0"><thead><tr><th style="text-align:left;">Methods</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.aggregate"><code>aggregate</code></a></td><td style="text-align:left;">aggregate data by the same or different amounts for each axis.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.disaggregate"><code>disaggregate</code></a></td><td style="text-align:left;">similarly disaggregate data.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.mosaic-Tuple{Function, Union{AbstractRaster, AbstractRasterStack}, Vararg{Union{AbstractRaster, AbstractRasterStack}}}"><code>mosaic</code></a></td><td style="text-align:left;">join rasters covering different extents into a single array or file.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.crop"><code>crop</code></a></td><td style="text-align:left;">shrink objects to specific dimension sizes or the extent of another object.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.extend"><code>extend</code></a></td><td style="text-align:left;">extend objects to specific dimension sizes or the extent of another object.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.trim-Tuple{Union{AbstractRaster, AbstractRasterStack}}"><code>trim</code></a></td><td style="text-align:left;">trims areas of missing values for arrays and across stack layers.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.resample-Tuple"><code>resample</code></a></td><td style="text-align:left;">resample data to a different size and projection, or snap to another object.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.warp-Tuple"><code>warp</code></a></td><td style="text-align:left;">use <code>gdalwarp</code> on any object, e.g. a multidimensional NetCDF stack.</td></tr></tbody></table><h2 id="Methods-that-change-an-objects-values" tabindex="-1">Methods that change an objects values <a class="header-anchor" href="#Methods-that-change-an-objects-values" aria-label="Permalink to &quot;Methods that change an objects values {#Methods-that-change-an-objects-values}&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;">Methods</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.classify"><code>classify</code></a></td><td style="text-align:left;">classify values into categories.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Rasters.mask-Tuple{Any}"><code>mask</code></a></td><td style="text-align:left;">mask an object by a polygon or <code>Raster</code> along <code>X/Y</code>, or other dimensions.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/tutorials/array_operations#replace_missing"><code>replace_missing</code></a></td><td style="text-align:left;">replace all missing values in an object and update <code>missingval</code>.</td></tr></tbody></table><div class="tip custom-block"><p class="custom-block-title">Info</p><p>Note that most regular Julia methods, such as <code>replace</code>, work as for a standard <code>Array</code>. These additional methods are commonly required in GIS applications.</p></div><h2 id="Methods-to-load,-write-and-modify-data-sources" tabindex="-1">Methods to load, write and modify data sources <a class="header-anchor" href="#Methods-to-load,-write-and-modify-data-sources" aria-label="Permalink to &quot;Methods to load, write and modify data sources {#Methods-to-load,-write-and-modify-data-sources}&quot;">​</a></h2><table tabindex="0"><thead><tr><th style="text-align:left;">Methods</th><th style="text-align:left;">Description</th></tr></thead><tbody><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#DimensionalData.modify-Tuple{Any, AbstractRasterSeries}"><code>modify</code></a></td><td style="text-align:left;">replace the data in objects. Useful to e.g. move objects to/from a GPU.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Base.read-Tuple{Union{AbstractRaster, AbstractRasterSeries, AbstractRasterStack}}"><code>read</code></a></td><td style="text-align:left;">read data to memory if it is on disk.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Base.read!-Tuple{AbstractRaster, AbstractArray}"><code>read!</code></a></td><td style="text-align:left;">read data to predefined memory.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Base.open-Tuple{Function, AbstractRaster}"><code>open</code></a></td><td style="text-align:left;">open the underlying data for manually reading or writing.</td></tr><tr><td style="text-align:left;"><a href="/Rasters.jl/previews/PR890/api#Base.write-Tuple{AbstractString, AbstractRasterSeries}"><code>write</code></a></td><td style="text-align:left;">write objects to file.</td></tr></tbody></table>',10)]))}const g=e(o,[["render",l]]);export{p as __pageData,g as default};
