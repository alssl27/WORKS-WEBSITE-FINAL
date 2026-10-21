import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/lib/property-schema';
import { formatPrice } from '@/lib/property-schema';

export function PropertyCard({property:p,variant='card'}:{property:Property;variant?:'card'|'list'}) {
  if (variant === 'list') {
    return <article className="property-card property-card-list">
      <Link href={`/properties/${p.id}`} className="property-image">
        {p.images[0]?<Image src={p.images[0].src} alt={p.images[0].alt} width={1000} height={700} sizes="(max-width: 760px) 100vw, 52vw"/>:<span className="image-placeholder">Photographs to follow</span>}
        {p.demo&&<span className="demo-label">Preview example · not a listing</span>}
      </Link>
      <div className="property-card-content">
        <div className="property-list-heading">
          <div><p className="property-status">{p.demo?'Preview example':p.status}</p><h2><Link href={`/properties/${p.id}`}>{p.title}</Link></h2><p className="property-location">{p.area}</p></div>
          <p className="price">{formatPrice(p)}</p>
        </div>
        <p className="property-summary">{p.summary}</p>
        <ul className="property-feature-list" aria-label="Property features">
          <li>{p.propertyType}</li>
          {p.bedrooms!==null&&<li>{p.bedrooms} bedroom{p.bedrooms===1?'':'s'}</li>}
          {p.bathrooms!==null&&<li>{p.bathrooms} bathroom{p.bathrooms===1?'':'s'}</li>}
        </ul>
        <Link className="button property-details-link" href={`/properties/${p.id}`}>Full details</Link>
      </div>
    </article>;
  }

  return <article className="property-card"><Link href={`/properties/${p.id}`} className="property-image">{p.images[0]?<Image src={p.images[0].src} alt={p.images[0].alt} width={800} height={520} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"/>:<span className="image-placeholder">Photographs to follow</span>}{p.demo&&<span className="demo-label">Preview example · not a listing</span>}</Link><div className="property-card-content"><div className="card-meta"><span>{p.area}</span><span>{p.demo?'Example':p.status}</span></div><h2><Link href={`/properties/${p.id}`}>{p.title}</Link></h2><p className="price">{formatPrice(p)}</p><p>{p.propertyType}{p.bedrooms!==null&&` · ${p.bedrooms} bedrooms`}{p.bathrooms!==null&&` · ${p.bathrooms} bathroom${p.bathrooms===1?'':'s'}`}</p><p>{p.summary}</p><Link className="text-link" href={`/properties/${p.id}`}>View property details</Link></div></article>;
}
