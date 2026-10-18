import type {Metadata} from 'next';
import {Geist} from 'next/font/google';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {WhatsAppButton} from '@/components/WhatsAppButton';
import {site} from '@/lib/site';
import './globals.css';
import './redesign.css';
import './public-pages.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'ABS Properties | Estate Agents, Lettings & Property Management in Oldham',
    template: '%s | ABS Properties',
  },
  description:
    'ABS Properties supports buyers, sellers, renters and landlords across Oldham and Greater Manchester with sales, lettings and property management services.',
  keywords: [
    'estate agents Oldham',
    'letting agents Oldham',
    'property management Oldham',
    'Oldham property company',
    'Greater Manchester estate agents',
    'ABS Properties',
  ],
  icons: {
    icon: '/images/abs-properties-logo.png',
    apple: '/images/abs-properties-logo.png',
  },
  openGraph: {
    title: 'ABS Properties',
    description: 'Sales, lettings and property management in Oldham and Greater Manchester.',
    url: site.url,
    siteName: 'ABS Properties',
    locale: 'en_GB',
    type: 'website',
    images: [{url: '/images/abs-townhouse-hero.png', alt: 'ABS Properties in Oldham'}],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABS Properties',
    description: 'Sales, lettings and property management in Oldham and Greater Manchester.',
    images: ['/images/abs-townhouse-hero.png'],
  },
  robots: process.env.NODE_ENV === 'production' ? { index: true, follow: true } : { index: false, follow: false },
};

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 1a, Belgrave Industrial Estate, Honeywell Ln',
    addressLocality: 'Oldham',
    addressRegion: 'Greater Manchester',
    postalCode: 'OL8 2JP',
    addressCountry: 'GB',
  },
  areaServed: ['Oldham', 'Greater Manchester'],
};

export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-GB" data-scroll-behavior="smooth" className={geist.variable}><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(businessSchema)}}/><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">{children}</main><Footer/><WhatsAppButton/></body></html>}
