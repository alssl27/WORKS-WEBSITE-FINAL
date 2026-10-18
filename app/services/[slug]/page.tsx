import {serviceMedia} from '@/lib/page-media';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {services} from '@/lib/services';
import {PageIntro} from '@/components/PageIntro';
export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const slug=(await params).slug;const service=services.find(s=>s.slug===slug);return {title:service?.name||'Service',description:service?.intro,alternates:{canonical:`/services/${slug}`}};}
export default async function Service({params}:{params:Promise<{slug:string}>}){const slug=(await params).slug;const service=services.find(s=>s.slug===slug);if(!service)notFound();return <><PageIntro title={service.name} image={serviceMedia[slug]} eyebrow="Our services"><p>{service.intro}</p></PageIntro><div className="container section editorial-layout"><div>{service.paragraphs.map(p=><p className="lead" key={p}>{p}</p>)}<div className="button-row service-actions"><Link className="button" href={['lettings','sales'].includes(slug)?'/valuation':'/contact'}>{service.cta}</Link>{slug==='management'&&<a className="button outline" href="/downloads/ABS_Properties_Landlord_Brochure_Inc_VAT.pdf" download>Download property management brochure</a>}</div></div><aside className="info-panel"><h2>How we can help</h2><ol className="steps">{service.steps.map(step=><li key={step}>{step}</li>)}</ol><p><Link href="/services">View all services</Link></p></aside></div></>}
