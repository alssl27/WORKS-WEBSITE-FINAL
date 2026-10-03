'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const links=[['/','Home'],['/properties','Properties'],['/landlords','Landlords'],['/area-guides','Area guides'],['/contact','Contact']];
export function Header() {
  const [open,setOpen]=useState(false); const path=usePathname();
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="ABS Properties home"><strong>ABS</strong><span>PROPERTIES</span></Link><button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button><nav id="primary-nav" className={open?'navigation open':'navigation'} aria-label="Main navigation">{links.map(([url,label])=><Link key={url} href={url} aria-current={(url==='/'?path===url:path.startsWith(url))?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav></div></header>;
}
