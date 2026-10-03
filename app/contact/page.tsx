import {PageIntro} from '@/components/PageIntro';
import {EnquiryForm} from '@/components/EnquiryForm';
import {formsEnabled} from '@/lib/forms';
import {site,whatsappLink} from '@/lib/site';
export const metadata={title:'Contact ABS Properties'};
export const dynamic='force-dynamic';
export default function Contact(){return <><PageIntro title="Let’s talk property."><p>Tell us how we can help with your next move or your property.</p></PageIntro><div className="container section editorial-layout"><div><h2>Send an enquiry</h2><EnquiryForm enabled={formsEnabled()}/></div><aside className="info-panel"><h2>Contact our team</h2><dl className="contact-details"><dt>Office</dt><dd><a href={site.phoneHref}>{site.phone}</a></dd><dt>Mobile and WhatsApp</dt><dd><a href={site.mobileHref}>{site.mobile}</a></dd><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd><dt>Visit us</dt><dd>{site.address}</dd><dt>Opening hours</dt><dd>{site.hours}</dd></dl><a className="button outline" href={whatsappLink()}>Message on WhatsApp</a><p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`} target="_blank" rel="noopener noreferrer">Find our office on a map</a></p></aside></div></>}
