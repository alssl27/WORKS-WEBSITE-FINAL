import { NextResponse } from 'next/server';
import { adminDemoEnabled, createSession, isValidAdminCredentials, sessionCookieName, sessionCookieOptions } from '@/lib/admin-auth';
import {readJsonRequest} from '@/lib/request-json';
export async function POST(request: Request) {
  if (!adminDemoEnabled) return NextResponse.json({ error: 'The local demo admin is disabled in production.' }, { status: 404 });
  const parsed=await readJsonRequest(request); if(!parsed.ok)return NextResponse.json({error:'Please send valid sign-in details.'},{status:400});
  const body = parsed.value as Record<string,unknown>;
  const email = String(body.email || ''), password = String(body.password || '');
  if (!email || !password) return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
  if (!isValidAdminCredentials(email, password)) return NextResponse.json({ error: 'Those details are not recognised.' }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, createSession(email), sessionCookieOptions);
  return response;
}
