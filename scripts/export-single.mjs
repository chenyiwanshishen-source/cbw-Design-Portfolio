import { build } from 'vite';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out='/tmp/portfolio-single-build';
await build({root,configFile:path.join(root,'vite.config.ts'),build:{outDir:out,emptyOutDir:true,cssCodeSplit:false,rollupOptions:{output:{inlineDynamicImports:true}}}});
const assets={};
const activeImageFolders=new Set(['qsight','qixin','ye','home','icons','illustration-skill','explorations','visual-editor']);
const mime={'.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.woff2':'font/woff2','.mp4':'video/mp4','.ico':'image/x-icon'};
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else{const rel=path.relative(out,file).replaceAll('\\','/');if(/\.(js|css|html)$/.test(rel)||['images/home/man-peek/man-peek.webp','images/home/man-peek/man-peek-original.webp'].includes(rel))continue;if(rel.startsWith('images/')&&!activeImageFolders.has(rel.split('/')[1]))continue;if(!rel.startsWith('images/')&&!rel.startsWith('assets/')&&!rel.startsWith('fonts/'))continue;assets[rel]='data:'+(mime[path.extname(file)]||'application/octet-stream')+';base64,'+fs.readFileSync(file).toString('base64');}}}
walk(out);
let html=fs.readFileSync(path.join(out,'index.html'),'utf8');
const cssFile=fs.readdirSync(path.join(out,'assets')).find(x=>x.endsWith('.css'));
let css=fs.readFileSync(path.join(out,'assets',cssFile),'utf8');
css=css.replace(/url\((['"]?)([^)'"\s]+)\1\)/g,(all,q,url)=>{const key=url.replace(/^\.\.\//,'').replace(/^\.\//,'').replace(/^\//,'');return assets[key]?`url("${assets[key]}")`:all;});
const jsFile=fs.readdirSync(path.join(out,'assets')).find(x=>x.endsWith('.js'));
let js=fs.readFileSync(path.join(out,'assets',jsFile),'utf8');

const shim=`const embeddedAssets=${JSON.stringify(Object.fromEntries(Object.entries(assets).filter(([key])=>!key.startsWith('fonts/'))))};
function assetURL(value){if(typeof value!=='string')return value;let key=value.replace(/^\\.\\//,'').replace(/^\\//,'');try{if(value.startsWith('file:'))key=decodeURIComponent(new URL(value).pathname).split('/').slice(-key.split('/').length).join('/');}catch{}return embeddedAssets[key]||value;}
const nativeAttr=Element.prototype.setAttribute;
function imageSource(image,value){const embedded=assetURL(value);if(embedded!==value)nativeAttr.call(image,"srcset",embedded+" 1x");else image.removeAttribute("srcset");}
const imageSrc=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");Object.defineProperty(HTMLImageElement.prototype,"src",{...imageSrc,set(v){imageSource(this,v);imageSrc.set.call(this,v);}});
for(const proto of [HTMLSourceElement.prototype,HTMLVideoElement.prototype]){const d=Object.getOwnPropertyDescriptor(proto,'src');if(d?.set)Object.defineProperty(proto,'src',{...d,set(v){d.set.call(this,assetURL(v));}});}
const sourceSet=Object.getOwnPropertyDescriptor(HTMLSourceElement.prototype,"srcset");if(sourceSet?.set)Object.defineProperty(HTMLSourceElement.prototype,"srcset",{...sourceSet,set(v){sourceSet.set.call(this,assetURL(v));}});
const oldAttr=Element.prototype.setAttribute;Element.prototype.setAttribute=function(k,v){if(this instanceof HTMLImageElement&&k==='src'){imageSource(this,v);return oldAttr.call(this,k,v);}return oldAttr.call(this,k,(k==='src'||k==='poster'||k==='srcset')?assetURL(v):v);};
const oldFetch=window.fetch.bind(window);window.fetch=(u,o)=>oldFetch(assetURL(u),o);
`;
html=html.replace(/<link[^>]+(?:fonts\.googleapis|fonts\.gstatic)[^>]*>/g,'').replace(/<link[^>]+rel="stylesheet"[^>]*>/g,'').replace(/<script type="module"[^>]*><\/script>/g,'');
html=html.replace(/<link[^>]+rel="preload"[^>]*>/g,'');
html=html.replace('</head>',()=>`<style>${css}</style></head>`).replace('</body>',()=>`<script>${shim.replaceAll('</script','<\\/script')}</script><script type="module">${js.replaceAll('</script','<\\/script')}</script></body>`);
const destination=process.argv[2] || path.resolve(root,'../陈俊学-产品体验设计作品集.html');fs.writeFileSync(destination,html);console.log('EXPORTED',destination,fs.statSync(destination).size);
