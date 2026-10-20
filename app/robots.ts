import type {MetadataRoute} from 'next';
import {isPublicProductionSite, site} from '@/lib/site';
export default function robots():MetadataRoute.Robots {
  const production = isPublicProductionSite();
  return {
    rules: production
      ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }
      : { userAgent: '*', allow: '/', disallow: '/' },
    sitemap: `${site.url.replace(/\/$/, '')}/sitemap.xml`,
  };
}
