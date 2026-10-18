import { z } from 'zod';
export const propertySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  title: z.string().min(1).max(150),
  category: z.enum(['rent', 'sale', 'commercial']),
  area: z.string().min(1),
  postcode: z.string(),
  propertyType: z.string().min(1),
  price: z.number().nonnegative().nullable(),
  priceUnit: z.enum(['pcm', 'purchase', 'pa']),
  bedrooms: z.number().int().nonnegative().nullable(),
  bathrooms: z.number().int().nonnegative().nullable(),
  status: z.enum(['Available', 'Let agreed', 'Sold STC', 'Draft']),
  summary: z.string(),
  description: z.array(z.string()),
  features: z.array(z.string()),
  images: z.array(z.object({src:z.string().regex(/^\/images\/[a-zA-Z0-9_./-]+$/).refine(v=>v.split('/').every(segment=>segment!=='.' && segment!=='..'),'Unsafe image path'),alt:z.string().min(1)})),
  deposit: z.number().nonnegative().nullable(),
  councilTax: z.string(),
  epc: z.string(),
  tenure: z.string(),
  furnishing: z.string(),
  availableDate: z.string(),
  materialInformation: z.string(),
  demo: z.boolean().optional(),
}).superRefine((p, ctx) => {
  if (p.published && !p.demo) {
    if (p.price === null) ctx.addIssue({code:'custom',path:['price'],message:'Published properties need a verified price'});
    if (!p.images.length) ctx.addIssue({code:'custom',path:['images'],message:'Published properties need real photographs'});
    if (p.status === 'Draft') ctx.addIssue({code:'custom',path:['status'],message:'Change Draft status before publishing'});
    for (const field of ['postcode','summary','materialInformation'] as const) {
      if (!p[field].trim()) ctx.addIssue({code:'custom',path:[field],message:'Complete before publishing'});
    }
  }
});
export type Property = z.infer<typeof propertySchema>;
export type PropertyFilter = {category?:string;q?:string;bedrooms?:string;maxPrice?:string};
export function filterProperties(properties: Property[], filter: PropertyFilter) {
  const query = (filter.q || '').trim().toLowerCase();
  const postcodeQuery = query.replace(/\s+/g, '');
  const beds = /^\d+$/.test(filter.bedrooms || '') ? Number(filter.bedrooms) : 0;
  const max = /^\d+(\.\d{1,2})?$/.test(filter.maxPrice || '') ? Number(filter.maxPrice) : Infinity;
  return properties.filter(p => (!filter.category || p.category === filter.category)
    && (!query || `${p.title} ${p.area} ${p.postcode}`.toLowerCase().includes(query)
      || p.postcode.toLowerCase().replace(/\s+/g, '').includes(postcodeQuery))
    && (!beds || (p.bedrooms !== null && p.bedrooms >= beds))
    && (max === Infinity || (p.price !== null && p.price <= max)));
}
export function formatPrice(p: Pick<Property,'price'|'priceUnit'>) {
  if (p.price === null) return 'Contact the office';
  const value = new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(p.price);
  return value + (p.priceUnit === 'pcm' ? ' pcm' : p.priceUnit === 'pa' ? ' per year' : '');
}
