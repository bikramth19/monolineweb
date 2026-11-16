'use client';
import Link from 'next/link';
import {usePathname,useRouter} from 'next/navigation';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartPie,faFileLines,faNewspaper,faImages,faPhotoFilm,faGear,faArrowRightFromBracket,faGlobe,faBars} from '@fortawesome/free-solid-svg-icons';

const links=[['/admin','Dashboard',faChartPie],['/admin/pages','Manage Pages',faFileLines],['/admin/posts','Blog Posts',faNewspaper],['/admin/banners','Banners',faPhotoFilm],['/admin/media','Media Library',faImages],['/admin/settings','Site Settings',faGear]] as const;
export function AdminShell({children,user}:{children:React.ReactNode;user:{name:string;email:string}}){
  const path=usePathname(),router=useRouter(),[menu,setMenu]=useState(false);
  async function logout(){await fetch('/api/auth/logout',{method:'POST'});router.push('/admin/login');router.refresh();}
  const current=links.find(([href])=>path===href)?.[1]||'Dashboard';
  return <div className="admin-root"><aside className={'admin-sidebar '+(menu?'open':'')}><Link href="/admin" className="admin-brand" onClick={()=>setMenu(false)}><img src="/images/monoline-logo.png" alt="Monoline"/><div><b>MONOLINE</b><span>CONTENT MANAGER</span></div></Link><nav className="admin-menu">{links.map(([href,title,icon])=><Link href={href} key={href} onClick={()=>setMenu(false)} className={path===href?'active':''}><FontAwesomeIcon icon={icon}/>{title}</Link>)}</nav><div className="admin-sidebar-bottom"><Link href="/" target="_blank"><FontAwesomeIcon icon={faGlobe}/> View Website</Link><button type="button" onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket}/> Sign Out</button></div></aside><div className="admin-main"><header className="admin-topbar"><div className="d-flex align-items-center gap-3"><button aria-label="Toggle sidebar" type="button" onClick={()=>setMenu(!menu)} className="btn btn-sm admin-mobile-toggle"><FontAwesomeIcon icon={faBars}/></button><div><h1>{current}</h1><small>Monoline Website Administration</small></div></div><div className="d-flex align-items-center gap-2"><span className="rounded-circle d-grid place-items-center text-white fw-bold" style={{width:36,height:36,background:'#16824d',placeItems:'center'}}>{user.name?.[0]?.toUpperCase()||'A'}</span><div className="d-none d-sm-block"><b style={{fontSize:12}}>{user.name}</b><small className="d-block">{user.email}</small></div></div></header><div className="admin-content">{children}</div></div>{menu&&<div className="position-fixed top-0 start-0 w-100 h-100" style={{zIndex:40,background:'#0006'}} onClick={()=>setMenu(false)}/>}</div>;
}
