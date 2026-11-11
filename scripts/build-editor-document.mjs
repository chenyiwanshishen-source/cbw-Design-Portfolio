import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'public/demos/visual-code-canvas');
let html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
html=html.replace(/<script[^>]*src="([^"]+)"[^>]*><\/script>/g,(_,src)=>{
 let code=fs.readFileSync(path.resolve(dir,src),'utf8');
 const bridge='data:text/javascript;base64,'+fs.readFileSync(path.join(dir,'runtime-bridge.js')).toString('base64');
 code=code.replaceAll('new URL("./runtime-bridge.js",window.location.href).href',JSON.stringify(bridge));
 return '<script>(()=>{const start=()=>{'+code.replaceAll('</script','<\\/script')+'};if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();})();</script>';
});
html=html.replace(/<link[^>]*href="([^"]+\.css)"[^>]*>/g,(_,href)=>'<style>'+fs.readFileSync(path.resolve(dir,href),'utf8')+'</style>');
html=html.replace('<head>','<head><style>#codex-preview-frame { visibility: hidden !important; }</style>');
fs.writeFileSync(path.join(root,'src/app/demos/editor-document.ts'),'// Generated from the existing editor demo. Regenerate with scripts/build-editor-document.mjs.\nexport const editorDocument = '+JSON.stringify(html)+';\n');
console.log('Self-contained editor document:',Buffer.byteLength(html));
