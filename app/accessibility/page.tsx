import {pageMedia} from '@/lib/page-media';
import {PageIntro} from '@/components/PageIntro';
import {site} from '@/lib/site';
export const metadata={title:'Accessibility',alternates:{canonical:'/accessibility'}};
export default function Accessibility(){return <><PageIntro image={pageMedia.family} eyebrow="Here to help" compact title="Accessibility"/><article className="container section reading-width"><p>This website uses clear labels, keyboard-accessible links and controls, a skip-to-content link and layouts designed to adjust to smaller screens.</p><h2>Need help?</h2><p>If a page or form is difficult to use, call <a href={site.phoneHref}>{site.phone}</a> or email <a href={`mailto:${site.email}`}>{site.email}</a>. Tell us which page you were using and how we can help.</p><p>Accessibility testing continues as real listing content is added. This statement does not claim independent certification or a completed accessibility audit.</p></article></>}
