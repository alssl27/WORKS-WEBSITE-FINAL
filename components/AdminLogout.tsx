'use client';
import { useRouter } from 'next/navigation';
export function AdminLogout() { const router = useRouter(); return <button className="button outline" onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login'); router.refresh(); }}>Log out</button>; }
