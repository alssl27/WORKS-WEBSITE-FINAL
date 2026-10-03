import Link from 'next/link';
import {PageIntro} from '@/components/PageIntro';
import {guides} from '@/lib/guides';
export const metadata={title:'Oldham area guides'};
export default function Guides(){return <><PageIntro title="Find the place that fits your life."><p>Practical local guides for your property search in Oldham, Chadderton and Royton.</p></PageIntro><div className="container section guide-list">{guides.map((g,i)=><article key={g.slug}><span className="guide-index">0{i+1}</span><div><h2>{g.name}</h2><p>{g.intro}</p><Link className="text-link" href={`/area-guides/${g.slug}`}>Explore {g.name}</Link></div></article>)}</div></>}
