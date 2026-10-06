import { requireAdmin } from '@/lib/admin-auth';
import { AdminPropertyForm } from '@/components/AdminPropertyForm';
export const metadata = { title: 'Add property', robots: { index: false, follow: false } };
export default async function NewProperty() { await requireAdmin(); return <section className="container section admin-shell"><p className="eyebrow">Admin</p><h1>Add property</h1><p className="muted">Create a listing using the local JSON data store.</p><AdminPropertyForm /></section>; }
