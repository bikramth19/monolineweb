'use client';
import {useEffect,useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCloudArrowUp,faXmark} from '@fortawesome/free-solid-svg-icons';

export type MediaRecord={id:string;fileName:string;url:string;altText:string|null;size:number;createdAt:string};
export function uploadMedia(file:File,altText=''):Promise<{media:MediaRecord;url:string}>{
  const form=new FormData();form.append('file',file);form.append('altText',altText);
  return fetch('/api/admin/upload',{method:'POST',body:form}).then(async r=>{const body=await r.json();if(!r.ok)throw Error(body.error||'Upload failed');return body;});
}
export function MediaPicker({open,onClose,onSelect}:{open:boolean;onClose:()=>void;onSelect:(url:string)=>void}){
  const [items,setItems]=useState<MediaRecord[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState('');
  const load=()=>fetch('/api/admin/media').then(r=>r.json()).then(v=>setItems(Array.isArray(v)?v:[]));
  useEffect(()=>{if(open)load().catch(()=>setError('Unable to load images.'));},[open]);
  async function upload(files:FileList|null){if(!files?.length)return;setError('');setBusy(true);try{for(const file of Array.from(files))await uploadMedia(file);await load();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
  if(!open)return null;
  return <div className="media-picker-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><div className="media-picker-dialog" role="dialog" aria-modal="true" aria-label="Choose media"><header><div><h5 className="fw-bold mb-0">Media Library</h5><small className="text-muted">Upload a new image or select an existing one</small></div><button className="btn btn-sm" type="button" onClick={onClose}><FontAwesomeIcon icon={faXmark}/></button></header><main><div className="upload-zone mb-3"><div><b><FontAwesomeIcon icon={faCloudArrowUp}/> Add new images</b><small className="d-block text-muted mt-1">PNG, JPG, WebP, GIF or AVIF · Max 8 MB each</small></div><label className="admin-primary" style={{cursor:'pointer'}}>{busy?'Uploading…':'Choose Files'}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/avif" multiple hidden disabled={busy} onChange={e=>{upload(e.target.files);e.target.value='';}}/></label></div>{error&&<div className="admin-alert">{error}</div>}<div className="media-picker-grid">{items.map(i=><button key={i.id} type="button" onClick={()=>{onSelect(i.url);onClose();}}><img src={i.url} alt={i.altText||i.fileName}/><span title={i.fileName}>{i.fileName}</span></button>)}</div>{!items.length&&<p className="text-muted small mt-3">No uploaded images yet. Use the button above.</p>}</main></div></div>;
}
