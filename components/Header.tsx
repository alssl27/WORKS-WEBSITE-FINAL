'use client';

import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import logo from '../public/images/abs-properties-logo.png';
import {WhatsAppButton} from './WhatsAppButton';

type NavigationItem =
  | {label: string; href: string}
  | {label: string; links: {href: string; label: string}[]};

const navigationItems: NavigationItem[] = [
  {label: 'Sales', links: [
    {href: '/properties?category=sale', label: 'Properties for sale'},
    {href: '/services/commercial', label: 'Commercial properties'},
    {href: '/services/sales', label: 'Sell your property'},
  ]},
  {label: 'Lettings', links: [
    {href: '/properties?category=rent', label: 'Properties to rent'},
    {href: '/services/commercial', label: 'Commercial properties'},
  ]},
  {label: 'Landlords', links: [
    {href: '/services/management', label: 'Our property management'},
    {href: '/valuation', label: 'Valuation'},
    {href: '/services', label: 'Our services'},
    {href: '/landlords', label: 'Testimonials'},
  ]},
  {label: 'Guides & tools', links: [
    {href: '/landlords/tools?tool=rental#calculator-panel', label: 'Rental income calculator'},
    {href: '/tenants', label: 'A guide to renting'},
    {href: '/landlords/tools?tool=rental#calculator-panel', label: 'Investment calculator'},
    {href: '/valuation', label: 'Instant valuation tool'},
  ]},
  {label: 'About us', links: [
    {href: '/#about', label: 'The team'},
    {href: '/services', label: 'Our services'},
  ]},
  {href: '/contact', label: 'Contact us'},
  {href: '/alerts', label: 'Register'},
];

function NavigationLinks({onNavigate}: {onNavigate: () => void}) {
  const pathname = usePathname();
  return navigationItems.map(item => {
    if ('links' in item) {
      const active = item.links.some(link => pathname === link.href.split(/[?#]/)[0]);
      return <details className="navigation-group" key={item.label}>
        <summary aria-current={active ? 'page' : undefined}>{item.label}</summary>
        <div className="navigation-dropdown">
          {item.links.map(link => <Link key={`${item.label}-${link.label}`} href={link.href} onClick={event => {
            event.currentTarget.closest('details')?.removeAttribute('open');
            onNavigate();
          }}>{link.label}</Link>)}
        </div>
      </details>;
    }
    const targetPath = item.href.split('#')[0];
    const active = targetPath === '/' ? pathname === '/' : pathname === targetPath;
    return <Link key={item.label} href={item.href} aria-current={active ? 'page' : undefined} onClick={onNavigate}>{item.label}</Link>;
  });
}

export function Header() {
  const pathname = usePathname();
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
  return <header className={`site-header${pathname === '/' ? ' site-header-home' : ''}`}><div className="header-inner">
    <Link href="/" className="header-logo" aria-label="ABS Properties home" onClick={close}><Image src={logo} alt="ABS Properties" priority sizes="(max-width: 820px) 56px, 100px"/></Link>
    <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}><span className="sr-only">{open ? 'Close' : 'Open'} main menu</span><span aria-hidden="true">{open ? 'Close ×' : 'Menu ☰'}</span></button>
    <nav id="main-navigation" aria-label="Main navigation" className={`navigation${open ? ' open' : ''}`}>
      <NavigationLinks onNavigate={close}/>
    </nav>
    <WhatsAppButton/>
  </div></header>;
}
