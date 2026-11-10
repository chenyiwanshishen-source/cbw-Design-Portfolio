import React from 'react';
import {useEditorStore} from '../store/useEditorStore';
import {Type,Palette,Layout,Sliders} from './Hugeicons';
const toHex = (value:string) => {
 if (/^#[0-9a-f]{6}$/i.test(value)) return value;
 if (/^#[0-9a-f]{3}$/i.test(value)) return '#'+value.slice(1).split('').map(c=>c+c).join('');
 const rgb=value.match(/[\d.]+/g);
 return rgb && rgb.length>=3 ? '#'+rgb.slice(0,3).map(n=>Math.min(255,Math.round(Number(n))).toString(16).padStart(2,'0')).join('') : '#ffffff';
};
export const PropertyPanel: React.FC = () => {
 const {selectedElementDetails:d,updateTextContent,updateInlineStyle}=useEditorStore();
 if(!d) return <aside className="demo-inspector demo-inspector-empty"><Sliders size={24}/><strong>选择一个元素</strong><p>点击画布或图层，调整文字和样式</p></aside>;
 const css=d.computedStyles||{},inline=d.inlineStyles||{};
 const read=(key:string,fallback:string)=>inline[key]??inline[key.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())]??css[key]??css[key.replace(/[A-Z]/g,m=>'-'+m.toLowerCase())]??fallback;
 const number=(key:string,fallback:string)=>parseFloat(read(key,fallback))||0;
 const numeric=(key:string,label:string,fallback:string)=><label className="demo-property" key={key}><span>{label}</span><div><input aria-label={label} type="number" min="0" max="200" value={number(key,fallback)} onChange={e=>updateInlineStyle(key,`${Math.max(0,Number(e.target.value))}px`)}/><span>px</span></div></label>;
 const color=(key:string,label:string,fallback:string)=><label className="demo-property" key={key}><span>{label}</span><div className="demo-color-field"><button type="button" className="demo-color-chip" aria-label={`${label}色块`} title={read(key,fallback)} style={{background:read(key,fallback)}}/><input aria-label={label} key={`${d.id}-${key}-${read(key,fallback)}`} defaultValue={read(key,fallback).startsWith('rgba') && read(key,fallback).endsWith(', 0)') ? 'transparent' : toHex(read(key,fallback)).toUpperCase()} onBlur={e=>updateInlineStyle(key,e.target.value)}/></div></label>;
 return <aside className="demo-inspector">
 <section><h3><Type/>文字</h3><label className="demo-text-field"><span>内容</span><input aria-label="文本内容" value={d.textContext||''} onChange={e=>updateTextContent(e.target.value)}/></label>{numeric('fontSize','字号','16px')}{numeric('lineHeight','行高','24px')}{color('color','文字颜色','#1a1c24')}</section>
 <section><h3><Layout/>布局</h3>{numeric('padding','内边距','0px')}{numeric('gap','间距','0px')}{numeric('borderRadius','圆角','0px')}</section>
 <section><h3><Palette/>外观</h3>{color('backgroundColor','背景颜色','#ffffff')}<div className="demo-swatches">{['#ffffff','#f5f5f7','#eef2ff','#2258f4','#1a1c24'].map(c=><button key={c} title={`背景 ${c}`} aria-label={`背景 ${c}`} style={{background:c}} onClick={()=>updateInlineStyle('backgroundColor',c)}/>)}</div></section>
 </aside>;
};
