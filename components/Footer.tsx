import Image from 'next/image';
import Link from 'next/link';
import {site, whatsappLink} from '@/lib/site';

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <Link href="/" className="footer-logo" aria-label="ABS Properties home"><Image src="/images/abs-properties-logo.png" alt="ABS" width={52} height={82}/><span>PROPERTIES</span></Link>
        <p>{site.address}</p><p>{site.hours}</p>
      </div>
      <div><h2>Let&apos;s talk property</h2><a href={site.phoneHref}>{site.phone}</a><a href={site.mobileHref}>{site.mobile}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={whatsappLink()}>Message on WhatsApp</a></div>
      <div><h2>Explore</h2><Link href="/services">Our services</Link><Link href="/landlords/tools">Landlord tools</Link><a href="/downloads/ABS_Properties_Landlord_Brochure_Inc_VAT.pdf" download>Property management brochure</a><Link href="/alerts">Property alerts</Link><Link href="/tenants">Tenant information</Link><Link href="/valuation">Request a valuation</Link>{Object.entries(site.social).filter(([, url]) => url).map(([name, url]) => <a key={name} href={url} rel="noopener noreferrer" target="_blank">{name}</a>)}</div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} ABS Properties</span><div><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/accessibility">Accessibility</Link></div></div>
  </footer>;
}
