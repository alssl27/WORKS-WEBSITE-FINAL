import type {MetadataRoute} from 'next';
import {site} from '@/lib/site';
export default function robots():MetadataRoute.Robots {
  const production = process.env.NODE_ENV === 'production';
  return {
    rules: production
      ? { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] }
      : { userAgent: '*', allow: '/', disallow: '/' },
    sitemap: `${site.url.replace(/\/$/, '')}/sitemap.xml`,
  };
}
