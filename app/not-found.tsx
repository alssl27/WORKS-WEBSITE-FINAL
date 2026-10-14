import Link from 'next/link';
import {PageIntro} from '@/components/PageIntro';
export default function NotFound(){return <PageIntro title="Let’s find your way home." eyebrow="Page not found"><p>The property or page may have moved. Browse current listings or return to the homepage.</p><div className="button-row"><Link href="/properties" className="button">Browse properties</Link><Link href="/" className="button outline light">Return home</Link></div></PageIntro>}
