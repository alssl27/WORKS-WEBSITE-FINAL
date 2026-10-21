import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { readAllProperties, writeAllProperties } from '@/lib/admin-properties';
import { propertySchema } from '@/lib/property-schema';
import {readJsonRequest} from '@/lib/request-json';
export async function GET() { if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 }); return NextResponse.json(await readAllProperties()); }
export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body=await readJsonRequest(request); if(!body.ok)return NextResponse.json({error:'Please send valid property data.'},{status:400});
  const result = propertySchema.safeParse(body.value);
  if (!result.success) return NextResponse.json({ error: result.error.issues[0]?.message || 'Check the form.' }, { status: 400 });
  const properties = await readAllProperties();
  if (properties.some(p => p.id === result.data.id)) return NextResponse.json({ error: 'That ID is already in use.' }, { status: 409 });
  properties.unshift(result.data); await writeAllProperties(properties); return NextResponse.json(result.data, { status: 201 });
}
