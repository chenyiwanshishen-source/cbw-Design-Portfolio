import React from 'react';
import { Plus } from './Hugeicons';
function textOf(value: React.ReactNode): string {
 return React.Children.toArray(value).map(child => typeof child === 'string' || typeof child === 'number' ? String(child) : React.isValidElement(child) ? textOf((child.props as any).children) : '').join(' ').trim();
}
export function IconButton({children,className='',...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
 const icons=React.Children.toArray(children).filter(child=>React.isValidElement(child)&&(typeof child.type!=='string'||child.type==='svg'));
 const label=props['aria-label']||props.title||textOf(children)||'操作';
 return <button {...props} aria-label={label} title={label} className={`${className} demo-icon-button`}>{icons.length?icons:<Plus />}</button>;
}
