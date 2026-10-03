import fs from 'node:fs';
import path from 'node:path';
import {propertySchema} from '../lib/property-schema.ts';
const data=JSON.parse(fs.readFileSync('data/properties.json','utf8'));
const result=propertySchema.array().safeParse(data);
if(!result.success){console.error(result.error.issues);process.exit(1)}
const ids=new Set<string>();
for(const p of result.data){
 if(ids.has(p.id))throw new Error(`Duplicate property ID: ${p.id}`);ids.add(p.id);
 if(p.demo)throw new Error('Preview data belongs in examples.json, never properties.json');
 for(const img of p.images){const local=path.resolve('public',img.src.slice(1));if(!fs.existsSync(local))throw new Error(`Image missing: ${img.src}`)}
}
console.log(`${result.data.length} property records checked; ${result.data.filter(p=>p.published).length} published.`);
