import Link from 'next/link';
import {PageIntro} from '@/components/PageIntro';
import {services} from '@/lib/services';
export const metadata={title:'Property services'};
export default function Services(){return <><PageIntro title="Property services, built around you."><p>Lettings, management, sales, commercial property and investments.</p></PageIntro><div className="container section service-list">{services.map((s,i)=><article key={s.slug}><span className="service-number">0{i+1}</span><div><h2>{s.name}</h2><p>{s.intro}</p></div><Link className="text-link" href={`/services/${s.slug}`}>Explore {s.name.toLowerCase()}</Link></article>)}</div></>}
