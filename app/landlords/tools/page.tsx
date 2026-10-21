import {pageMedia} from '@/lib/page-media';
import Link from 'next/link';
import {PageIntro} from '@/components/PageIntro';
import {LandlordTools} from '@/components/LandlordTools';

export const metadata = {title:'Landlord tools & rental income calculator',description:'Estimate rental income, gross and net operating yields, compare rent affordability and plan maintenance budgets with ABS Properties landlord tools.',alternates:{canonical:'/landlords/tools'}};

export default async function LandlordToolsPage({searchParams}:{searchParams:Promise<{tool?:string|string[]}>}) {
  const {tool} = await searchParams;
  const initialTool = tool === 'affordability' || tool === 'maintenance' ? tool : 'rental';
  return <><PageIntro image={pageMedia.welcomingFamily} eyebrow="Landlord tools" title="A clearer picture of your property."><p>Simple tools to explore rental income, compare rent budgets and plan ahead for maintenance.</p><Link href="/landlords" className="landlord-back">← Landlord services</Link></PageIntro><div className="container section"><LandlordTools key={initialTool} initialTool={initialTool}/><div className="tool-footnote"><h2>Planning figures, explained.</h2><p>These estimates depend on the figures you enter. The rental calculator shows cash flow before tax, not taxable profit or a guaranteed return. The example management fee is not an ABS quote.</p><p>Tax treatment differs from cash flow. See <a href="https://www.gov.uk/renting-out-a-property/paying-tax" target="_blank" rel="noopener noreferrer">GOV.UK guidance on rental income tax (opens in a new tab)</a> for the rules, or discuss your circumstances with an accountant.</p></div></div></>;
}
