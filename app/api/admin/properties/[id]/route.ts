import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { readAllProperties, writeAllProperties } from '@/lib/admin-properties';
import { propertySchema } from '@/lib/property-schema';
type Context = { params: Promise<{ id: string }> };
export async function PUT(request: Request, { params }: Context) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const id = (await params).id; const result = propertySchema.safeParse({ ...(await request.json()), id });
  if (!result.success) return NextResponse.json({ error: result.error.issues[0]?.message || 'Check the form.' }, { status: 400 });
  const properties = await readAllProperties(); const index = properties.findIndex(p => p.id === id);
  if (index < 0) return NextResponse.json({ error: 'Property not found.' }, { status: 404 });
  properties[index] = result.data; await writeAllProperties(properties); return NextResponse.json(result.data);
}
export async function DELETE(_: Request, { params }: Context) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const id = (await params).id; const properties = await readAllProperties(); const next = properties.filter(p => p.id !== id);
  if (next.length === properties.length) return NextResponse.json({ error: 'Property not found.' }, { status: 404 });
  await writeAllProperties(next); return NextResponse.json({ ok: true });
}
