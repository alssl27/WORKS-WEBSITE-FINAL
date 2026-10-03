import {NextResponse} from 'next/server';
import {enquirySchema} from '@/lib/enquiry-schema';
import {formsEnabled} from '@/lib/forms';
import {getProperty} from '@/lib/properties';
import {site} from '@/lib/site';
export const runtime='nodejs';
const attempts=new Map<string,{count:number;expires:number}>();
function error(message:string,status:number){return NextResponse.json({error:message},{status})}
async function readLimited(req:Request){const reader=req.body?.getReader();if(!reader)throw new Error('empty');let bytes=0;const chunks:Uint8Array[]=[];try{while(true){const chunk=await reader.read();if(chunk.done)break;bytes+=chunk.value.byteLength;if(bytes>16384){await reader.cancel();throw new Error('too-large')}chunks.push(chunk.value)}}finally{reader.releaseLock()}return JSON.parse(Buffer.concat(chunks).toString('utf8'))}
export async function POST(req:Request){
  let expectedOrigin:string;try{expectedOrigin=new URL(site.url).origin}catch{return error('Online enquiries are unavailable. Please contact the office.',503)}
  if(req.headers.get('origin')!==expectedOrigin)return error('Please send your enquiry from our website.',403);
  if(!req.headers.get('content-type')?.startsWith('application/json'))return error('Please use the enquiry form.',415);
  let body:unknown;try{body=await readLimited(req)}catch{return error('Please check your enquiry and try again.',400)}
  const parsed=enquirySchema.safeParse(body);if(!parsed.success)return error(parsed.error.issues[0].message,400);
  const data=parsed.data;if(data.website)return error('Unable to accept this enquiry. Please call our office.',400);
  if(!formsEnabled())return error('Online forms are being set up. Please call, email or use WhatsApp.',503);
  if(data.kind==='viewing'){const property=getProperty(data.propertyId);if(!property||property.demo||property.status!=='Available')return error('This property cannot accept online viewing requests. Please contact our office.',400)}
  if(process.env.NODE_ENV==='production'){
    if(!data.turnstileToken)return error('Please complete the security check.',400);
    try{const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY!,response:data.turnstileToken}),signal:AbortSignal.timeout(10000)});const result=await verification.json();if(!verification.ok||!result.success||result.hostname!==new URL(site.url).hostname)return error('Security check failed. Please try again.',400)}catch{return error('The security check is unavailable. Please contact the office.',503)}
  }else{
    // Local development only. Production abuse protection is verified Turnstile.
    const key=data.email.toLowerCase();const now=Date.now();for(const [k,v]of attempts)if(v.expires<now)attempts.delete(k);
    const entry=attempts.get(key);if(entry&&entry.count>=5)return error('Please wait a few minutes before trying again.',429);
    attempts.set(key,{count:(entry?.count||0)+1,expires:entry?.expires||now+600000});
  }
  const property=data.propertyId?getProperty(data.propertyId):undefined;
  const text=[`ABS Properties website: ${data.kind}`,`Name: ${data.name}`,`Email: ${data.email}`,`Phone: ${data.phone||'Not supplied'}`,`Interest: ${data.interest}`,property?`Property: ${property.title} (${property.id})`:'',`Address: ${data.address||'Not supplied'}`,`Areas: ${data.area||'Not supplied'}`,`Budget: ${data.budget||'Not supplied'}`,`Bedrooms: ${data.bedrooms||'Any'}`,`Message: ${data.message||'Not supplied'}`,`Enquiry consent: yes; recorded ${new Date().toISOString()}`,data.kind==='alerts'?`Email alert consent: yes; recorded ${new Date().toISOString()}`:'',`Reference: ${data.requestId}`].filter(Boolean).join('\n\n');
  try{const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':data.requestId},body:JSON.stringify({from:process.env.ENQUIRY_FROM,to:[process.env.ENQUIRY_TO],reply_to:data.email,subject:`ABS website: ${data.kind} request`,text}),signal:AbortSignal.timeout(15000)});if(!response.ok)return error('Your enquiry could not be sent. Please contact the office or try again.',502);const result=await response.json();if(!result.id)return error('Delivery could not be confirmed. Please contact the office.',502);return NextResponse.json({ok:true})}catch{return error('We could not confirm delivery. Please contact the office or try again.',502)}
}
