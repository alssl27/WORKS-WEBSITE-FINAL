import {PageIntro} from '@/components/PageIntro';
import {EnquiryForm} from '@/components/EnquiryForm';
import {formsEnabled} from '@/lib/forms';
export const metadata={title:'Request a property valuation'};
export const dynamic='force-dynamic';
export default function Valuation(){return <><PageIntro title="What’s next for your property?"><p>Request a rental or sales valuation from our team.</p></PageIntro><div className="container section editorial-layout"><div><h2>Tell us about your property</h2><EnquiryForm kind="valuation" enabled={formsEnabled()}/></div><aside className="info-panel"><h2>A considered valuation</h2><p>Share your property address and plans. We’ll contact you to discuss the property and arrange any further assessment.</p><ol className="steps"><li>Send your property details</li><li>Discuss your plans with the team</li><li>Agree the assessment and next steps</li></ol><p>This is a request for an agent valuation. An assessment does not guarantee a sale price or rental income.</p></aside></div></>}
