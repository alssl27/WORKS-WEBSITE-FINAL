import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { propertySchema, type Property } from './property-schema';

const file = path.join(process.cwd(), 'data', 'properties.json');
export async function readAllProperties() {
  const value = JSON.parse(await fs.readFile(file, 'utf8'));
  return propertySchema.array().parse(value);
}
export async function writeAllProperties(properties: Property[]) {
  await fs.writeFile(file, `${JSON.stringify(properties, null, 2)}\n`, 'utf8');
}
export async function findAdminProperty(id: string) { return (await readAllProperties()).find(p => p.id === id); }
