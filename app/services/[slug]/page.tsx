import Link from 'next/link';
import {notFound} from 'next/navigation';
import {services} from '@/lib/services';
import {PageIntro} from '@/components/PageIntro';
export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const slug=(await params).slug;return {title:services.find(s=>s.slug===slug)?.name||'Service'};}
export default async function Service({params}:{params:Promise<{slug:string}>}){const slug=(await params).slug;const service=services.find(s=>s.slug===slug);if(!service)notFound();return <><PageIntro title={service.name}><p>{service.intro}</p></PageIntro><div className="container section editorial-layout"><div>{service.paragraphs.map(p=><p className="lead" key={p}>{p}</p>)}<div className="button-row service-actions"><Link className="button" href={['lettings','sales'].includes(slug)?'/valuation':'/contact'}>{service.cta}</Link>{slug==='management'&&<a className="button outline" href="/downloads/abs-properties-landlord-brochure.pdf" download>Download property management brochure</a>}</div></div><aside className="info-panel"><h2>How we can help</h2><ol className="steps">{service.steps.map(step=><li key={step}>{step}</li>)}</ol><p><Link href="/services">View all services</Link></p></aside></div></>}
