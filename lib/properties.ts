import 'server-only';
import raw from '@/data/properties.json';
import examples from '@/data/examples.json';
import { propertySchema } from './property-schema';
export function previewEnabled() {
  return process.env.NODE_ENV !== 'production' && process.env.SHOW_DEMO_LISTINGS !== 'false';
}
export function getProperties() {
  const records = propertySchema.array().parse(raw);
  const published = records.filter(p => p.published && !p.demo);
  if (previewEnabled()) {
    const drafts = records.filter(p => p.id === 'abs-001' && !p.published);
    return [...published, ...drafts, ...propertySchema.array().parse(examples)];
  }
  return published;
}
export function getProperty(id: string) { return getProperties().find(p=>p.id===id); }
