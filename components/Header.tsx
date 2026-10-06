'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
const links=[['/properties?category=sale','Buy'],['/properties?category=rent','Rent'],['/services/management','Property management'],['/valuation','Sell'],['/landlords','Let your property'],['/services','About'],['/contact','Contact']];
export function Header() {
  const [open,setOpen]=useState(false); const path=usePathname();
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="ABS Properties home"><Image src="/images/abs-logo.png" alt="ABS Properties" width={180} height={96} priority/></Link><button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button><nav id="primary-nav" className={open?'navigation open':'navigation'} aria-label="Main navigation">{links.map(([url,label])=><Link key={url} href={url} aria-current={(url==='/'?path===url:path.startsWith(url.split('?')[0]))?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/contact" className="button header-cta" onClick={()=>setOpen(false)}>Talk to us</Link></nav></div></header>;
}
