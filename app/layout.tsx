import type {Metadata} from 'next';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {WhatsAppButton} from '@/components/WhatsAppButton';
import {site} from '@/lib/site';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(site.url),title:{default:'ABS Properties | Lettings, Sales & Property Management in Oldham',template:'%s | ABS Properties'},description:'Lettings, property management, sales, commercial property and investments in Oldham and Greater Manchester. Contact ABS Properties for a valuation.',robots:process.env.NODE_ENV==='production'?{index:true,follow:true}:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en-GB"><body><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main">{children}</main><Footer/><WhatsAppButton/></body></html>}
