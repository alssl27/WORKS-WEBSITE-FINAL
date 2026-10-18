import {pageMedia} from '@/lib/page-media';
import {PageIntro} from '@/components/PageIntro';
import {EnquiryForm} from '@/components/EnquiryForm';
import {formsEnabled} from '@/lib/forms';
export const metadata={title:'Register for property alerts'};
export const dynamic='force-dynamic';
export default function Alerts(){return <><PageIntro image={pageMedia.welcomingFamily} eyebrow="Property alerts" title="Be ready for your next move."><p>Register your property requirements with our team.</p></PageIntro><div className="container section editorial-layout"><div><h2>What are you looking for?</h2><EnquiryForm kind="alerts" enabled={formsEnabled()}/></div><aside className="info-panel"><h2>How property alerts work</h2><p>Your preferences are sent to ABS Properties. Our staff review them and send relevant property updates by email.</p><p>For rentals, enter your maximum monthly rent. For purchases, enter your total purchase budget. For commercial property, explain your preferred rental or purchase terms in your message.</p><p>You can update your preferences or stop alerts by contacting our office. Registering does not reserve a property or guarantee that a match will become available.</p></aside></div></>}
