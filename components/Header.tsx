'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/images/abs-properties-logo.png';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {site} from '@/lib/site';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    {href: '/properties', label: 'Properties'},
    {href: '/landlords', label: 'Landlords'},
    {href: '/services/management', label: 'Property management'},
    {href: '/#about', label: 'About us'},
  ];
  return (
    <header className={`site-header${pathname === '/' ? ' site-header-home' : ''}`}>
      <div className="header-inner">
        <Link href="/" className="reference-brand" aria-label="ABS Properties home" onClick={() => setOpen(false)}>
          <Image src={logo} alt="ABS Properties" className="original-logo" preload/>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Close ×' : 'Menu ☰'}</button>
        <nav id="main-navigation" aria-label="Main navigation" className={`navigation${open ? ' open' : ''}`}>
          {links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : pathname.startsWith(`${link.href}/`) ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <a className="mobile-contact" href={site.phoneHref}>{site.phone}</a>
          <Link className="button mobile-contact" href="/valuation" onClick={() => setOpen(false)}>Free valuation</Link>
        </nav>
        <div className="header-actions"><a className="header-phone" href={site.phoneHref}>{site.phone}</a><Link href="/valuation" className="button">Free valuation</Link></div>
      </div>
    </header>
  );
}
