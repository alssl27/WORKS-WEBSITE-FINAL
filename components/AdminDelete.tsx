'use client';
import { useRouter } from 'next/navigation';
export function AdminDelete({ id, title }: { id: string; title: string }) { const router = useRouter(); return <button className="text-button danger" onClick={async () => { if (!window.confirm(`Delete ${title}?`)) return; const response = await fetch(`/api/admin/properties/${id}`, { method: 'DELETE' }); if (response.ok) { router.refresh(); } else window.alert('Could not delete property.'); }}>Delete</button>; }
