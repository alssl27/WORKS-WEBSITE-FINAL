import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-auth';
import { findAdminProperty } from '@/lib/admin-properties';
import { AdminPropertyForm } from '@/components/AdminPropertyForm';
export const dynamic = 'force-dynamic';
export default async function EditProperty({ params }: { params: Promise<{ id: string }> }) { await requireAdmin(); const property = await findAdminProperty((await params).id); if (!property) notFound(); return <section className="container section admin-shell"><p className="eyebrow">Admin</p><h1>Edit property</h1><p className="muted">{property.title}</p><AdminPropertyForm property={property} /></section>; }
