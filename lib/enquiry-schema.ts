import { z } from 'zod';
export const enquirySchema=z.object({
  kind:z.enum(['contact','viewing','valuation','alerts']),
  name:z.string().trim().min(2,'Please enter your name').max(100),
  email:z.email('Please enter a valid email address').max(254),
  phone:z.string().trim().max(40).refine(v=>!v||/^[+\d\s()-]{7,40}$/.test(v),'Please check your phone number'),
  message:z.string().trim().max(2000),
  propertyId:z.string().regex(/^[a-z0-9-]*$/).max(100),
  address:z.string().trim().max(250),
  interest:z.enum(['rent','sale','commercial','rental-valuation','sales-valuation','management','general']),
  area:z.string().trim().max(120),
  budget:z.string().max(20).refine(v=>!v||/^\d+(\.\d{1,2})?$/.test(v),'Enter a valid budget'),
  bedrooms:z.string().max(2).refine(v=>!v||/^[0-9]{1,2}$/.test(v),'Enter a valid bedroom number'),
  privacyAcknowledged:z.literal(true,{error:'Please acknowledge the privacy notice'}),
  alertConsent:z.boolean(),
  website:z.string().max(200),
  turnstileToken:z.string().max(4096),
  requestId:z.uuid(),
}).superRefine((p,ctx)=>{
  if(p.kind==='alerts'&&!p.alertConsent)ctx.addIssue({code:'custom',path:['alertConsent'],message:'Please agree to receive property alerts'});
  if(p.kind==='alerts'&&!['rent','sale','commercial'].includes(p.interest))ctx.addIssue({code:'custom',path:['interest'],message:'Choose a property category'});
  if(p.kind==='valuation'&&!p.address)ctx.addIssue({code:'custom',path:['address'],message:'Please enter the property address'});
  if(p.kind==='contact'&&p.message.length<10)ctx.addIssue({code:'custom',path:['message'],message:'Please add a little more detail'});
  if(p.kind==='viewing'&&!p.propertyId)ctx.addIssue({code:'custom',path:['propertyId'],message:'Please choose a property'});
});
export type Enquiry=z.infer<typeof enquirySchema>;
