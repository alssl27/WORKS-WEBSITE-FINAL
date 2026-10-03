import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const raw=JSON.parse(fs.readFileSync('data/properties.json','utf8'));
const samples=JSON.parse(fs.readFileSync('data/examples.json','utf8'));
import {filterProperties,propertySchema,formatPrice} from '../lib/property-schema.ts';

test('all fourteen editable records validate with the approved Abbeyhills listing published',()=>{
  const records=propertySchema.array().parse(raw);
  assert.equal(records.length,14);assert.equal(records.filter(p=>p.published).length,1);
  assert.equal(records.find(p=>p.id==='abs-001')?.status,'Available');
  assert.equal(records.filter(p=>p.category==='rent').length,10);
  assert.equal(records.filter(p=>p.category==='commercial').length,3);
  assert.equal(records.filter(p=>p.category==='sale').length,1);
});
test('publishing requires a verified price, photographs, status, postcode and material information',()=>{
  const draft=propertySchema.parse(raw[0]);
  const result=propertySchema.safeParse({...draft,published:true,status:'Draft',price:null,images:[],postcode:'',materialInformation:''});
  assert.equal(result.success,false);
  if(!result.success){const fields=result.error.issues.map(i=>String(i.path[0]));for(const field of ['price','images','status','postcode','materialInformation'])assert.ok(fields.includes(field))}
});
test('fictional examples are marked and never look available for viewing via records',()=>{
  const records=propertySchema.array().parse(samples);assert.equal(records.length,3);assert.ok(records.every(p=>p.demo));
});
test('property search handles category, area, bedrooms and maximum price',()=>{
  const properties=propertySchema.array().parse(samples);
  assert.deepEqual(filterProperties(properties,{category:'rent',q:'oldham',bedrooms:'2',maxPrice:'1000'}).map(p=>p.id),['preview-rental']);
  assert.equal(filterProperties(properties,{bedrooms:'not-a-number'}).length,3);
  assert.equal(filterProperties(properties,{category:'anything'}).length,0);
});
test('prices are shown with clear rental and purchase units',()=>{
  assert.equal(formatPrice({price:950,priceUnit:'pcm'}),'£950 pcm');
  assert.equal(formatPrice({price:245000,priceUnit:'purchase'}),'£245,000');
  assert.equal(formatPrice({price:null,priceUnit:'pa'}),'Contact the office');
});

test('photo names with double dots are allowed while path traversal is rejected',()=>{
  const draft=propertySchema.parse(raw[0]);
  assert.equal(propertySchema.safeParse({...draft,images:[{src:'/images/ah4..png',alt:'Photograph 4'}]}).success,true);
  for(const src of ['/images/../outside.png','/images/./ah1.png']) {
    assert.equal(propertySchema.safeParse({...draft,images:[{src,alt:'Photograph'}]}).success,false);
  }
});
