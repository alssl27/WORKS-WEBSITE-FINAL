'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import logo from '../public/images/abs-properties-logo.png';

const navigationLinks = [
  {href: '/services/sales', label: 'Sales'},
  {href: '/services/lettings', label: 'Lettings'},
  {href: '/landlords', label: 'Landlords'},
  {href: '/landlords/tools', label: 'Tools'},
  {href: '/#about', label: 'About us'},
  {href: '/contact', label: 'Contact us'},
];

function NavigationLinks({onNavigate}: {onNavigate: () => void}) {
  const pathname = usePathname();
  return navigationLinks.map(link => {
    const targetPath = link.href.split('#')[0];
    const active = targetPath === '/' ? pathname === '/' : pathname === targetPath;
    return <Link key={link.label} href={link.href} aria-current={active ? 'page' : undefined} onClick={onNavigate}>{link.label}</Link>;
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
    <Link href="/" className="header-logo" aria-label="ABS Properties home" onClick={close}><Image src={logo} alt="ABS Properties" priority sizes="(max-width: 820px) 56px, 100px"/></Link>
    <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}><span className="sr-only">{open ? 'Close' : 'Open'} main menu</span><span aria-hidden="true">{open ? 'Close ×' : 'Menu ☰'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={`navigation${open ? ' open' : ''}`}>
      <NavigationLinks onNavigate={close}/>
    </nav>
  </div></header>;
}
