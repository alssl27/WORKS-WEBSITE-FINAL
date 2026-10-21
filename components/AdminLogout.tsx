'use client';
import {useState} from 'react';
import { useRouter } from 'next/navigation';
export function AdminLogout() { const router = useRouter(); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); return <div><button className="button outline" type="button" disabled={busy} onClick={async () => { if(busy)return; setBusy(true); setError(''); try { const response=await fetch('/api/admin/logout',{method:'POST'}); if(!response.ok)throw new Error('Could not log out.'); router.push('/admin/login'); router.refresh(); } catch { setError('Could not log out. Please try again.'); setBusy(false); } }}>{busy?'Logging out…':'Log out'}</button>{error&&<p className="form-error" role="alert">{error}</p>}</div>; }
