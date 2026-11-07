// Portfolio-only interaction adapter. All edits remain in this browser frame.
const $ = id => document.getElementById(id);
const initial = {text:'把想法，变成好用的产品。',fontSize:30,padding:28,borderRadius:16,color:'#1A1C24',backgroundColor:'#FFFFFF'};
let values={...initial},selected='card',history=[],future=[],zoom=100,mode='edit';
$('projectName').textContent='产品首页'; $('activeRoute').textContent='交互演示'; $('connectionStatus').textContent='前端演示';
$('canvasWorld').innerHTML=`<div class="demo-stage"><div class="demo-frame-title">Desktop · 1440</div><article id="demoCard" class="demo-card" tabindex="0"><div class="demo-eyebrow">WORKSPACE</div><h2 id="demoTitle">${initial.text}</h2><p>在这里整理项目、跟进进度，让每一步都清晰可见。</p><div class="demo-stats"><div><small>进行中的项目</small><strong>12</strong></div><div><small>本周已完成</small><strong>28</strong></div><div><small>团队成员</small><strong>8</strong></div></div><button id="demoAction" type="button">创建新项目 ↗</button></article><p class="demo-tip">点击卡片或标题，在右侧调整样式</p></div>`;
$('navigatorPageList').innerHTML='<button class="demo-layer active" data-select="card">▧　产品首页</button>';
$('layerTree').innerHTML='<button class="demo-layer" data-select="card">▧　项目卡片</button><button class="demo-layer" data-select="title">　T　标题</button><button class="demo-layer" data-select="button">　▣　创建按钮</button>';
$('designLayerTree').innerHTML=$('layerTree').innerHTML;
$('breakpointScope').innerHTML='<option>当前视窗档位</option><option>所有视窗</option>';
$('scopeHint').textContent='修改会立即显示在左侧画布中。';
function target(){return $(selected==='title'?'demoTitle':selected==='button'?'demoAction':'demoCard')}
const controls=[['text','文字','text'],['fontSize','字号','number'],['padding','内边距','number'],['borderRadius','圆角','number'],['color','文字颜色','color'],['backgroundColor','背景颜色','color']];
function render(){
 document.querySelectorAll('.demo-selected').forEach(e=>e.classList.remove('demo-selected'));target().classList.add('demo-selected');
 $('selectionTitle').textContent={card:'项目卡片',title:'标题',button:'创建按钮'}[selected];$('selectionBreadcrumbs').textContent='产品首页 / '+$('selectionTitle').textContent;$('sourceLocation').textContent=$('selectionTitle').textContent;$('layoutMode').textContent='Flex';
 $('propertyList').innerHTML=controls.map(([key,label,type])=>`<label class="demo-field"><span>${label}</span><input aria-label="${label}" data-property="${key}" type="${type}" value="${values[key]}" ${type==='number'?'min="0" max="100"':''}></label>`).join('');
 $('undoButton').disabled=!history.length;$('redoButton').disabled=!future.length;
}
function save(key,value){history.push({selected,values:{...values},style:target().getAttribute('style'),text:target().textContent});future=[];values[key]=value;apply(key,value);$('writeStatus').textContent='已更新预览';$('changeDiff').textContent=`${key}: ${value}`;render()}
function apply(key,value){if(key==='text'){if(selected==='card')$('demoTitle').textContent=value;else target().textContent=value}else target().style[key]=['fontSize','padding','borderRadius'].includes(key)?`${value}px`:value}
function choose(name){selected=name;const el=target(),s=getComputedStyle(el);values={text:name==='card'?$('demoTitle').textContent:el.textContent,fontSize:parseInt(s.fontSize),padding:parseInt(s.padding)||0,borderRadius:parseInt(s.borderRadius)||0,color:'#1A1C24',backgroundColor:name==='button'?'#2258F4':'#FFFFFF'};render()}
$('propertyList').addEventListener('change',e=>{if(e.target.dataset.property)save(e.target.dataset.property,e.target.value)});
document.addEventListener('click',e=>{const layer=e.target.closest('[data-select]');if(layer)choose(layer.dataset.select)});
$('demoCard').onclick=e=>{if(mode==='edit'){e.preventDefault();choose(e.target.closest('#demoAction')?'button':e.target.closest('#demoTitle')?'title':'card')}else if(e.target.closest('#demoAction'))toast('新项目已创建')};
function toast(text){$('toast').textContent=text;$('toast').hidden=false;setTimeout(()=>$('toast').hidden=true,1800)}
for(const name of ['Pages','DesignLayers','SourceLayers'])$('navigator'+name+'Tab').onclick=()=>{for(const n of ['Pages','DesignLayers','SourceLayers']){$('navigator'+n+'Panel').hidden=n!==name;$('navigator'+n+'Tab').setAttribute('aria-selected',String(n===name))}};
$('collapseLayerPanelButton').onclick=()=>$('layerPanel').classList.toggle('is-collapsed');$('collapseInspectorButton').onclick=()=>$('inspectorPanel').classList.toggle('is-collapsed');
function undo(){if(!history.length)return;const prev=history.pop();future.push({selected,values:{...values},style:target().getAttribute('style'),text:target().textContent});selected=prev.selected;const el=target();prev.style?el.setAttribute('style',prev.style):el.removeAttribute('style');if(selected!=='card')el.textContent=prev.text;else $('demoTitle').textContent=prev.values.text;values=prev.values;render();toast('已撤销')}
$('undoButton').onclick=undo;$('redoButton').onclick=()=>{if(!future.length)return;const next=future.pop();history.push({selected,values:{...values},style:target().getAttribute('style'),text:target().textContent});selected=next.selected;next.style?target().setAttribute('style',next.style):target().removeAttribute('style');if(selected==='card')$('demoTitle').textContent=next.values.text;else target().textContent=next.text;values=next.values;render();toast('已重做')};
function setZoom(n){zoom=Math.max(60,Math.min(130,n));document.querySelector('.demo-stage').style.transform=`translate(-50%,-50%) scale(${zoom/100})`;$('zoomLabel').textContent=zoom+'%'}
$('zoomInButton').onclick=()=>setZoom(zoom+10);$('zoomOutButton').onclick=()=>setZoom(zoom-10);$('fitButton').onclick=()=>setZoom(100);$('zoomLabel').onclick=()=>setZoom(100);
$('refreshButton').onclick=()=>{for(const id of ['demoCard','demoTitle','demoAction'])$(id).removeAttribute('style');$('demoTitle').textContent=initial.text;history=[];future=[];choose('card');toast('已恢复初始预览')};
document.querySelectorAll('[data-interaction-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.interactionMode;document.querySelectorAll('[data-interaction-mode]').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});toast(mode==='edit'?'编辑模式：点击选择元素':'交互模式：体验页面操作')});
document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-tool]').forEach(x=>x.classList.toggle('is-active',x===b));toast(b.dataset.tool==='hand'?'按住画布可拖动预览':'点击元素进行选择')});
$('addPageButton').onclick=()=>toast('当前演示页面：产品首页');$('addFrameButton').onclick=()=>{document.querySelector('.demo-stage').classList.toggle('demo-mobile');toast('已切换视窗尺寸')};$('projectButton').onclick=()=>toast('Visual Code Canvas · 前端交互演示');
let drag=null;document.querySelector('.demo-stage').addEventListener('pointerdown',e=>{if(document.querySelector('[data-tool="hand"].is-active')){drag={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId)}});document.querySelector('.demo-stage').addEventListener('pointermove',e=>{if(drag)e.currentTarget.style.margin=`${e.clientY-drag.y}px 0 0 ${e.clientX-drag.x}px`});document.addEventListener('pointerup',()=>drag=null);
choose('card');
$('zoomLabel').textContent='100%';$('breakpointScope').onchange=()=>toast('生效范围：'+$('breakpointScope').value);
