import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { readAllProperties } from '@/lib/admin-properties';
import { formatPrice } from '@/lib/property-schema';
import { AdminLogout } from '@/components/AdminLogout';
import { AdminDelete } from '@/components/AdminDelete';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin dashboard', robots: { index: false, follow: false } };
export default async function Admin() {
  await requireAdmin(); const properties = await readAllProperties();
  return <section className="container section admin-shell"><div className="admin-heading"><div><p className="eyebrow">Local demo admin</p><h1>Property dashboard</h1><p className="muted">Manage the listings shown on the public site.</p></div><AdminLogout /></div>
    <div className="admin-stats"><div><strong>{properties.length}</strong><span>Total properties</span></div><div><strong>{properties.filter(p => p.published).length}</strong><span>Published</span></div><div><strong>{properties.filter(p => p.status === 'Draft').length}</strong><span>Drafts</span></div></div>
    <div className="admin-section-heading"><h2>Recent properties</h2><Link className="button" href="/admin/properties/new">Add property</Link></div>
    <div className="admin-table">{properties.slice(0, 8).map(p => <div className="admin-row" key={p.id}><div><strong>{p.title}</strong><span>{p.area} · {p.status} · {p.published ? 'Published' : 'Hidden'}</span></div><span>{formatPrice(p)}</span><div className="button-row"><Link className="button outline" href={`/admin/properties/${p.id}/edit`}>Edit</Link><Link className="text-link" href={`/properties/${p.id}`}>View</Link><AdminDelete id={p.id} title={p.title} /></div></div>)}</div>
  </section>;
}
