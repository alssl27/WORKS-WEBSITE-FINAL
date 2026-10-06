import 'server-only';
import examples from '@/data/examples.json';
import { propertySchema } from './property-schema';
import { readAllProperties } from './admin-properties';
export function previewEnabled() {
  return process.env.NODE_ENV !== 'production' && process.env.SHOW_DEMO_LISTINGS !== 'false';
}
export async function getProperties() {
  const records = await readAllProperties();
  const published = records.filter(p => p.published && !p.demo);
  if (previewEnabled()) {
    const drafts = records.filter(p => p.id === 'abs-001' && !p.published);
    return [...published, ...drafts, ...propertySchema.array().parse(examples)];
  }
  return published;
}
export async function getProperty(id: string) { return (await getProperties()).find(p=>p.id===id); }
