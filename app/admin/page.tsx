import Link from 'next/link';
import {PageIntro} from '@/components/PageIntro';
export const metadata={title:'Staff administration',robots:{index:false,follow:false}};
export default function Admin(){return <><PageIntro title="Staff administration"/><div className="container section reading-width"><h2>Staff access follows after launch.</h2><p>Property listings are currently maintained by the website editor. A secure staff administration service is planned for the next phase.</p><Link href="/contact" className="button">Contact the office</Link></div></>}
