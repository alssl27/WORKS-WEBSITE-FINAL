'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useRef, useState} from 'react';
import logo from '../public/images/abs-properties-logo.png';

const navigationGroups = [
  {label: 'Selling', links: [
    {href: '/valuation', label: 'Value my property'},
    {href: '/services/sales', label: 'Guide to selling'},
    {href: '/services/sales', label: 'Marketing your property'},
    {href: '/landlords/tools?tool=rental#calculator-panel', label: 'Rental income calculator'},
  ]},
  {label: 'Renting', links: [
    {href: '/tenants', label: 'A guide to renting'},
    {href: '/properties?category=rent', label: 'Properties to rent'},
    {href: '/alerts', label: 'Register as a tenant'},
    {href: '/tenants', label: 'Your rights as a tenant'},
  ]},
  {label: 'Landlords', links: [
    {href: '/landlords/tools', label: 'Landlord tools'},
    {href: '/landlords', label: 'Our landlord services'},
    {href: '/landlords/tools?tool=rental#calculator-panel', label: 'Rental income calculator'},
    {href: '/landlords/tools', label: 'Tools and guides'},
  ]},
  {label: 'About us', links: [
    {href: '/#about', label: 'About us'},
    {href: '/#about', label: 'Why choose ABS'},
    {href: '/landlords', label: 'Landlord testimonials'},
  ]},
];

function NavigationLinks({onNavigate}: {onNavigate: () => void}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return navigationGroups.map(group => {
    const groupActive = group.links.some(link => pathname === link.href.split(/[?#]/)[0]);
    return <details className="navigation-group" key={group.label}>
      <summary aria-current={groupActive ? 'page' : undefined}>{group.label}<span aria-hidden="true">⌄</span></summary>
      <div className="navigation-dropdown">
        {group.links.map(link => {
          const [pathAndQuery] = link.href.split('#');
          const [path, query] = pathAndQuery.split('?');
          const params = query ? new URLSearchParams(query) : null;
          const category = params?.get('category');
          const active = pathname === path && (!category || searchParams.get('category') === category);
          return <Link key={`${group.label}-${link.label}`} href={link.href} aria-current={active ? 'page' : undefined} onClick={event => {
            event.currentTarget.closest('details')?.removeAttribute('open');
            onNavigate();
          }}>{link.label}</Link>;
        })}
      </div>
    </details>;
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
      <Suspense fallback={navigationGroups.map(group => <span className="navigation-fallback" key={group.label}>{group.label}</span>)}><NavigationLinks onNavigate={close}/></Suspense>
      <Link href="/valuation" className="button header-valuation" onClick={close}>Value my property <span aria-hidden="true">›</span></Link>
    </nav>
  </div></header>;
}
