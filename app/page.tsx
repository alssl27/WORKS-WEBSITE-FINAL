import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {HomeSearch} from '@/components/HomeSearch';
import {getProperties} from '@/lib/properties';
import {PropertyCard} from '@/components/PropertyCard';

export const metadata: Metadata = {
  title: 'ABS Properties | Estate Agents and Letting Agents in Oldham',
  description: 'ABS Properties offers property sales, lettings and property management across Oldham and Greater Manchester.',
  keywords: ['estate agents Oldham', 'letting agents Oldham', 'property management Oldham', 'ABS Properties'],
};

export default async function Home() {
  const featured = (await getProperties()).filter(p => p.published && !p.demo).slice(0, 4);
  return <>
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media"><Image src="/images/abs-townhouse-hero.png" alt="Victorian red-brick townhouse with an ABS Properties sign" fill sizes="100vw" preload/><div className="hero-overlay"/></div>
      <div className="hero-copy">
        <p className="eyebrow">Independent estate agents</p>
        <h1 id="hero-title">Property, handled<br/><em>properly.</em></h1>
        <p>Honest advice, local expertise and complete care for your home —<br className="desktop-break"/> whether you&apos;re selling, letting or looking.</p>
        <div className="button-row hero-actions"><Link href="/landlords/tools" className="button">Landlord tools <span aria-hidden="true">↗</span></Link><a href="/downloads/abs-properties-landlord-brochure.pdf" download className="button outline light">Download property management brochure <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="hero-search"><HomeSearch/></div>
    </section>
    {featured.length > 0 && <section className="container section featured-home">
      <div className="section-heading home-section-heading"><div><p className="eyebrow eyebrow-dark">Find your place</p><h2>Your next chapter starts here.</h2><p>Discover our latest properties in Oldham and Greater Manchester.</p></div><Link href="/properties" className="text-link">View all properties <span aria-hidden="true">↗</span></Link></div>
      <div className="property-grid home-property-grid">{featured.map(property => <PropertyCard key={property.id} property={property}/>)}</div>
    </section>}
    <section id="about" className="container services-home">
      <p className="eyebrow eyebrow-dark">A local team. A personal approach.</p><h2>Here for every step.</h2>
      <p className="services-intro">We&apos;re ABS Properties. Your independent estate and letting agents in Oldham, helping buyers, sellers and landlords across Greater Manchester.</p>
      <div className="service-columns">
        <article><div className="service-card-photo"><Image src="/images/roundthorn-exterior.png" alt="Red-brick home on Roundthorn Road, Oldham" fill sizes="(max-width:760px) 100vw, 33vw"/></div><div className="service-card-copy"><h3><Link href="/services/sales">Selling your home <span aria-hidden="true">↗</span></Link></h3><p>From your first valuation to your next set of keys, get clear advice and a plan for your move.</p><Link href="/valuation" className="text-link">Book a free valuation</Link></div></article>
        <article><div className="service-card-photo"><Image src="/images/roundthorn-living-room.png" alt="Living room at the Roundthorn Road rental property" fill sizes="(max-width:760px) 100vw, 33vw"/></div><div className="service-card-copy"><h3><Link href="/landlords">Letting your property <span aria-hidden="true">↗</span></Link></h3><p>Present your property at its best, arrange viewings and find the right tenant with our local team.</p><Link href="/landlords" className="text-link">For landlords</Link></div></article>
        <article><div className="service-card-photo"><Image src="/images/fairfields-kitchen-1.png" alt="Fitted kitchen at the Fairfields property" fill sizes="(max-width:760px) 100vw, 33vw"/></div><div className="service-card-copy"><h3><Link href="/services/management">Property management <span aria-hidden="true">↗</span></Link></h3><p>A reliable point of contact for your property, your tenants and everyday maintenance.</p><Link href="/services/management" className="text-link">Explore management</Link></div></article>
      </div>
    </section>
    <section className="home-resources"><div className="container resources-grid"><div className="resources-photo"><Image src="/images/fairfields-exterior.png" alt="Fairfields bungalow with a front garden" fill sizes="(max-width:760px) 100vw, 45vw"/><span>Letting. Managing. Looking ahead.</span></div><div className="resources-copy"><p className="eyebrow">For landlords</p><h2>A little planning.<br/>A clearer picture.</h2><p>Understand your rental income, budget for maintenance and explore the support available for your property.</p><Link href="/landlords/tools" className="resource-action"><span>Landlord tools<small>Income, yield and maintenance calculators</small></span><span aria-hidden="true">↗</span></Link><a href="/downloads/abs-properties-landlord-brochure.pdf" download className="resource-action"><span>Download property management brochure<small>Our guide to letting and managing your property · PDF</small></span><span aria-hidden="true">↓</span></a></div></div></section>
    <section className="area-band"><div className="container area-band-inner"><div><p className="eyebrow eyebrow-dark">Our neighbourhoods</p><h2>Local knowledge, personal service.</h2><p>Get to know the places we call home.</p></div><div className="area-links"><Link href="/area-guides/oldham">Oldham ↗</Link><Link href="/area-guides/chadderton">Chadderton ↗</Link><Link href="/area-guides/royton">Royton ↗</Link></div></div></section>
  </>;
}
