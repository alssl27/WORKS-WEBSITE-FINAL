'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useRef, useState} from 'react';
import logo from '../public/images/abs-properties-logo.png';

const links = [
  {href: '/properties?category=sale', label: 'Buy'},
  {href: '/properties?category=rent', label: 'Rent'},
  {href: '/landlords', label: 'Landlords'},
  {href: '/#about', label: 'About'},
  {href: '/contact', label: 'Contact'},
];

function NavigationLinks({onNavigate}: {onNavigate: () => void}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return links.map(link => {
    const [path, query] = link.href.split('?');
    const category = query ? new URLSearchParams(query).get('category') : null;
    const active = pathname === path && (!category || searchParams.get('category') === category);
    return <Link key={link.href} href={link.href} aria-current={active ? 'page' : undefined} onClick={onNavigate}>{link.label}</Link>;
  });
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);
  const close = () => setOpen(false);
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="header-logo" aria-label="ABS Properties home" onClick={close}><Image src={logo} alt="ABS" priority sizes="(max-width: 760px) 52px, 62px"/><span>Properties</span></Link>
    <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}><span className="sr-only">{open ? 'Close' : 'Open'} main menu</span><span aria-hidden="true">{open ? 'Close ×' : 'Menu ☰'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={`navigation${open ? ' open' : ''}`}>
      <Suspense fallback={links.map(link => <Link key={link.href} href={link.href} onClick={close}>{link.label}</Link>)}><NavigationLinks onNavigate={close}/></Suspense>
      <Link href="/valuation" className="button header-valuation" onClick={close}>Book a valuation <span aria-hidden="true">›</span></Link>
    </nav>
  </div></header>;
}
