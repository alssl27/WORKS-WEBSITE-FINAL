import type {MetadataRoute} from 'next';
import {site} from '@/lib/site';
import {getProperties} from '@/lib/properties';
import {services} from '@/lib/services';
import {guides} from '@/lib/guides';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const properties=await getProperties();const paths=['','/properties','/landlords','/services','/valuation','/alerts','/contact','/tenants','/area-guides','/privacy','/cookies','/accessibility',...services.map(s=>`/services/${s.slug}`),...guides.map(g=>`/area-guides/${g.slug}`),...properties.filter(p=>!p.demo).map(p=>`/properties/${p.id}`)];return paths.map(path=>({url:`${site.url.replace(/\/$/,'')}${path}`}))}
