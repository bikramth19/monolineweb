'use client';
import {useEffect} from 'react';
type Props={open:boolean;title:string;children:React.ReactNode;footer?:React.ReactNode;onClose:()=>void};
export function Drawer({open,title,children,footer,onClose}:Props){
  useEffect(()=>{if(!open)return;function key(e:KeyboardEvent){if(e.key==='Escape')onClose();}window.addEventListener('keydown',key);const prev=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',key);document.body.style.overflow=prev;};},[open,onClose]);
  if(!open)return null;
  return <div className="admin-drawer"><div className="offcanvas-backdrop fade show" onClick={onClose}/><aside className="offcanvas offcanvas-end show" tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} style={{visibility:'visible'}}><div className="offcanvas-header"><h5 className="offcanvas-title fw-bold">{title}</h5><button className="btn-close" type="button" aria-label="Close drawer" onClick={onClose}/></div><div className="offcanvas-body">{children}</div>{footer&&<div className="offcanvas-footer">{footer}</div>}</aside></div>;
}
