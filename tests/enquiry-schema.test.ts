import test from 'node:test';
import assert from 'node:assert/strict';
import {enquirySchema} from '../lib/enquiry-schema.ts';
import {randomUUID} from 'node:crypto';
const base={kind:'contact',name:'Sam Collins',email:'sam@example.com',phone:'0161 555 1234',message:'Please call me to discuss property management.',propertyId:'',address:'',interest:'general',area:'',budget:'',bedrooms:'',privacyAcknowledged:true,alertConsent:false,website:'',turnstileToken:'',requestId:randomUUID()};
test('valid contact request parses',()=>assert.equal(enquirySchema.safeParse(base).success,true));
test('a request cannot register alerts without separate opt-in consent',()=>assert.equal(enquirySchema.safeParse({...base,kind:'alerts',interest:'rent',alertConsent:false}).success,false));
test('an alert requires a permitted property category',()=>assert.equal(enquirySchema.safeParse({...base,kind:'alerts',alertConsent:true,interest:'general'}).success,false));
test('valuation requires a property address',()=>assert.equal(enquirySchema.safeParse({...base,kind:'valuation',address:''}).success,false));
test('viewing requires a property reference',()=>assert.equal(enquirySchema.safeParse({...base,kind:'viewing'}).success,false));
test('email addresses, phone numbers and budgets are checked',()=>{
  assert.equal(enquirySchema.safeParse({...base,email:'not-an-email'}).success,false);
  assert.equal(enquirySchema.safeParse({...base,phone:'reach me later'}).success,false);
  assert.equal(enquirySchema.safeParse({...base,kind:'alerts',interest:'rent',alertConsent:true,budget:'£lots'}).success,false);
});
test('privacy acknowledgement and idempotency reference are required',()=>{
  assert.equal(enquirySchema.safeParse({...base,privacyAcknowledged:false}).success,false);
  assert.equal(enquirySchema.safeParse({...base,requestId:'bad'}).success,false);
});
