import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'abs_admin_session';
export const adminDemoEnabled = process.env.NODE_ENV !== 'production' && process.env.ADMIN_DEMO_ENABLED !== 'false';
const secret = () => process.env.ADMIN_SESSION_SECRET || 'local-demo-secret-change-me';
const credentials = () => ({
  email: (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase(),
  password: process.env.ADMIN_PASSWORD || 'admin123',
});

function sign(value: string) {
  return createHmac('sha256', secret()).update(value).digest('base64url');
}
export function isValidAdminCredentials(email: string, password: string) {
  if (!adminDemoEnabled) return false;
  const expected = credentials();
  return email.trim().toLowerCase() === expected.email && password === expected.password;
}
export function createSession(email: string) {
  const payload = `${email.toLowerCase()}|${Date.now() + 8 * 60 * 60 * 1000}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;
}
export function verifySession(value?: string) {
  if (!value) return false;
  const [encoded, signature] = value.split('.');
  if (!encoded || !signature) return false;
  try {
    const payload = Buffer.from(encoded, 'base64url').toString();
    const expected = sign(payload);
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) &&
      Number(payload.split('|')[1]) > Date.now();
  } catch { return false; }
}
export async function isAdmin() {
  if (!adminDemoEnabled) return false;
  return verifySession((await cookies()).get(COOKIE)?.value);
}
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
export const sessionCookieName = COOKIE;
export const sessionCookieOptions = { httpOnly: true, sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 };
