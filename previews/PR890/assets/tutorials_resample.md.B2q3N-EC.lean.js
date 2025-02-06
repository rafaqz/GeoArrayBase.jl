import{_ as p,C as k,c as d,o as r,ai as l,G as e,w as n,j as s,a as i}from"./chunks/framework.C3Twhi_y.js";const g="/Rasters.jl/previews/PR890/assets/sdjrfkf.BDm3KuYD.png",E="/Rasters.jl/previews/PR890/assets/hwnmmep.Czv1U7Yt.png",o="/Rasters.jl/previews/PR890/assets/uueweei.DiS76DjI.png",y="/Rasters.jl/previews/PR890/assets/fallzja.BEz2b9t9.png",c="/Rasters.jl/previews/PR890/assets/sfbxszw.COZtemuK.png",u="/Rasters.jl/previews/PR890/assets/jdvrlzr.FyCPqsB9.png",F="/Rasters.jl/previews/PR890/assets/qdrycpk.BtVap_ds.png",B=JSON.parse('{"title":"Reprojection and resampling","description":"","frontmatter":{},"headers":[],"relativePath":"tutorials/resample.md","filePath":"tutorials/resample.md","lastUpdated":null}'),f={name:"tutorials/resample.md"};function C(N,a,m,v,b,D){const t=k("PluginTabsTab"),h=k("PluginTabs");return r(),d("div",null,[a[4]||(a[4]=l("",18)),e(h,null,{default:n(()=>[e(t,{label:"size"},{default:n(()=>a[0]||(a[0]=[s("div",{class:"language-julia vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"julia"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"julia"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},">"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ras_sample "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," resample"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m; size"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1440"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"720"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"), method"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"average"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")])])])],-1),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"┌ "),s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"1440"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"×"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"720"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}}," Raster{Float64, 2}"),s("span",{style:{"--shiki-light":"#00afaf","--shiki-dark":"#00afaf"}}," bio5"),s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}}," ┐")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"├──────────────────────────────────┴───────────────────────────────────── dims ┐")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  ↓ "),s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"X"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}}," Projected{Float64} "),s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"-180.0:0.25:179.75"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," ForwardOrdered"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Regular"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Intervals{Start}"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"  → "),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"Y"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}}," Projected{Float64} "),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"89.75:-0.25:-90.0"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," ReverseOrdered"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Regular"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Intervals{Start}")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"├──────────────────────────────────────────────────────────────────── metadata ┤")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  Metadata{Rasters.GDALsource}"),s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}}," of "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"Dict{String, Any} with 1 entry:")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},'  "filepath" => "/vsimem/tmp"')]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"├────────────────────────────────────────────────────────────────────── raster ┤")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"  missingval: "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"NaN")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"  extent: "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"Extent(X = (-180.0, 180.0), Y = (-90.0, 90.0))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"  crs: "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.25722...')]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"└──────────────────────────────────────────────────────────────────────────────┘")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"    ↓"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}}," →"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"    89.75"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   89.5"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   89.25"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   89.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  …  "),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"-89.5"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"     -89.75"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"    -90.0")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}}," -180.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"   NaN     NaN    NaN     NaN       -15.7547  -15.0816  -14.1678")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}}," -179.75"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN     NaN    NaN     NaN       -16.1382  -15.5151  -14.5793")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"    ⋮                                   ⋱                        ⋮")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  179.25"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN     NaN    NaN     NaN       -18.594   -17.7993  -16.7431")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  179.5"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"   NaN     NaN    NaN     NaN       -18.4647  -17.7799  -16.732")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  179.75"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN     NaN    NaN     NaN    …  -17.6831  -16.9734  -15.9826")])])])],-1)])),_:1}),e(t,{label:"resolution"},{default:n(()=>a[1]||(a[1]=[s("div",{class:"language-julia vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"julia"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"julia"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},">"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ras_sample "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," resample"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m; res"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1.0"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", method"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"average"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")])])])],-1),s("div",{class:"language- vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"}),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"┌ "),s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"360"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"×"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"180"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}}," Raster{Float64, 2}"),s("span",{style:{"--shiki-light":"#00afaf","--shiki-dark":"#00afaf"}}," bio5"),s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}}," ┐")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"├─────────────────────────────────┴────────────────────────────────────── dims ┐")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  ↓ "),s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"X"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}}," Projected{Float64} "),s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"-180.0:1.0:179.0"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," ForwardOrdered"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Regular"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Intervals{Start}"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},",")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"  → "),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"Y"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}}," Projected{Float64} "),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"89.0:-1.0:-90.0"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," ReverseOrdered"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Regular"),s("span",{style:{"--shiki-light":"#808080","--shiki-dark":"#808080"}}," Intervals{Start}")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"├──────────────────────────────────────────────────────────────────── metadata ┤")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  Metadata{Rasters.GDALsource}"),s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}}," of "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"Dict{String, Any} with 1 entry:")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},'  "filepath" => "/vsimem/tmp"')]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"├────────────────────────────────────────────────────────────────────── raster ┤")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"  missingval: "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"NaN")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"  extent: "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"Extent(X = (-180.0, 180.0), Y = (-90.0, 90.0))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"  crs: "),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.25722...')]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#959da5","--shiki-dark":"#959da5"}},"└──────────────────────────────────────────────────────────────────────────────┘")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"    ↓"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}}," →"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   89.0"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   88.0"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   87.0"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   86.0"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"   85.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  …  "),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"-88.0"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"     -89.0"),s("span",{style:{"--shiki-light":"#0087d7","--shiki-dark":"#0087d7"}},"     -90.0")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}}," -180.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN    NaN    NaN    NaN    NaN       -19.728   -19.2911  -15.9072")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}}," -179.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN    NaN    NaN    NaN    NaN       -21.4924  -22.4063  -18.6251")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"    ⋮                                  ⋮    ⋱                        ⋮")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  177.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN    NaN    NaN    NaN    NaN       -24.8445  -25.6942  -22.5898")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  178.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN    NaN    NaN    NaN    NaN       -24.738   -25.6031  -21.3692")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#ff875f","--shiki-dark":"#ff875f"}},"  179.0"),s("span",{style:{"--shiki-light":"#24292e","--shiki-dark":"#e1e4e8"}},"  NaN    NaN    NaN    NaN    NaN    …  -22.5468  -21.9183  -18.1424")])])])],-1)])),_:1})]),_:1}),a[5]||(a[5]=l("",3)),e(h,null,{default:n(()=>[e(t,{label:"sizes and methods"},{default:n(()=>a[2]||(a[2]=[s("div",{class:"language-julia vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"julia"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"method_sizes "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ["),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"resample"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m; size"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"size, method"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"method) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," method "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," methods "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," size "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," sizes]")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"with_theme"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(Rasters"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"theme_rasters"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"do")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    colorrange "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nanminimum"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m), "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nanmaximum"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    hm"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nothing")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    fig "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," Figure"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(; size "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1000"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"600"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    axs "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ["),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Axis"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig[i,j], title"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"size='),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"$(size)"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},", method=:"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"$(method)"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", titlefont"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},":regular"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"        for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (i, method) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," enumerate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(methods) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (j, size) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," enumerate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(sizes)]")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (i, ax) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," enumerate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(axs)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        hm "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," heatmap!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ax, method_sizes[i]; colorrange)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    end")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    Colorbar"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig[:,"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"end"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"+"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"], hm)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    hidedecorations!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},".(axs; grid"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"false"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    rowgap!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"layout, "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"5"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    colgap!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"layout, "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"10"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    fig")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"end")])])])],-1),s("p",null,[s("img",{src:g,alt:""})],-1)])),_:1}),e(t,{label:"resolutions and methods"},{default:n(()=>a[3]||(a[3]=[s("div",{class:"language-julia vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"julia"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"method_res "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ["),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"resample"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m; res"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"res, method"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"method) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," method "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," methods "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," res "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," resolutions]")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"with_theme"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(Rasters"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"theme_rasters"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"do")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    colorrange "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nanminimum"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m), "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nanmaximum"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ras_m))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    hm"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"nothing")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    fig "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," Figure"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(; size "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ("),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1000"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"600"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    axs "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ["),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Axis"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig[i,j], title"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"res='),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"$(round(res, digits"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"4))"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},", method=:"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"$(method)"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"'),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", titlefont"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},":regular"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"        for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (i, method) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," enumerate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(methods) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (j, res) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," enumerate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(resolutions)]")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    for"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (i, ax) "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"in"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," enumerate"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(axs)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        hm "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," heatmap!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(ax, method_res[i]; colorrange)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    end")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    Colorbar"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig[:,"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"end"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"+"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"], hm)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    hidedecorations!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},".(axs; grid"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"false"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    rowgap!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"layout, "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"5"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    colgap!"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(fig"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"."),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"layout, "),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"10"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    fig")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"end")])])])],-1),s("p",null,[s("img",{src:E,alt:""})],-1)])),_:1})]),_:1}),a[6]||(a[6]=l("",48))])}const _=p(f,[["render",C]]);export{B as __pageData,_ as default};
