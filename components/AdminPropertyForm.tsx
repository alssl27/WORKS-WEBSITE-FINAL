'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import type {Property} from '@/lib/property-schema';

const list = (value: string) => value.split(/\r?\n|,/).map(item => item.trim()).filter(Boolean);

export function AdminPropertyForm({property}: {property?: Property}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState(property?.images || []);
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const value = (key: keyof Property, fallback = '') => property?.[key] == null ? fallback : String(property[key]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return; setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    const number = (key: string) => form.get(key) ? Number(form.get(key)) : null;
    const data = {id:String(form.get('id')),published:form.get('published')==='on',title:String(form.get('title')),category:String(form.get('category')),area:String(form.get('area')),postcode:String(form.get('postcode')),propertyType:String(form.get('propertyType')),price:number('price'),priceUnit:String(form.get('priceUnit')),bedrooms:number('bedrooms'),bathrooms:number('bathrooms'),status:String(form.get('status')),summary:String(form.get('summary')),description:list(String(form.get('description'))),features:list(String(form.get('features'))),images,deposit:number('deposit'),councilTax:String(form.get('councilTax')),epc:String(form.get('epc')),tenure:String(form.get('tenure')),furnishing:String(form.get('furnishing')),availableDate:String(form.get('availableDate')),materialInformation:String(form.get('materialInformation'))};
    try {
      const response = await fetch(property ? `/api/admin/properties/${property.id}` : '/api/admin/properties', {method:property?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save property.');
      router.push('/admin'); router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not save property.'); setBusy(false);
    }
  }

  function addImage() {
    const src = imageSrc.trim(); const alt = imageAlt.trim();
    if (!src || !alt) {setError('Enter both an image path and a useful image description.'); return;}
    setImages(current => [...current, {src, alt}]); setImageSrc(''); setImageAlt(''); setError('');
  }

  return <form className="admin-property-form" onSubmit={submit} noValidate>
    <div className="admin-form-grid">
      <label>Listing ID<input name="id" defaultValue={value('id')} pattern="[a-z0-9-]+" readOnly={Boolean(property)} required/></label>
      <label>Title<input name="title" defaultValue={value('title')} required/></label>
      <label>Category<select name="category" defaultValue={value('category','rent')}><option value="rent">Rent</option><option value="sale">Sale</option><option value="commercial">Commercial</option></select></label>
      <label>Property type<input name="propertyType" defaultValue={value('propertyType')} required/></label>
      <label>Area<input name="area" defaultValue={value('area')} required/></label>
      <label>Postcode<input name="postcode" defaultValue={value('postcode')}/></label>
      <label>Price<input name="price" type="number" min="0" step="1" defaultValue={value('price')}/></label>
      <label>Price unit<select name="priceUnit" defaultValue={value('priceUnit','pcm')}><option value="pcm">Per month</option><option value="purchase">Purchase</option><option value="pa">Per year</option></select></label>
      <label>Bedrooms<input name="bedrooms" type="number" min="0" defaultValue={value('bedrooms')}/></label>
      <label>Bathrooms<input name="bathrooms" type="number" min="0" defaultValue={value('bathrooms')}/></label>
      <label>Status<select name="status" defaultValue={value('status','Draft')}><option>Draft</option><option>Available</option><option>Let agreed</option><option>Sold STC</option></select></label>
      <label className="checkbox-label"><input name="published" type="checkbox" defaultChecked={property?.published}/> Publish on public site</label>
      <label className="full">Summary<textarea name="summary" rows={3} defaultValue={value('summary')}/></label>
      <label>Description <span className="muted">One item per line</span><textarea name="description" rows={5} defaultValue={property?.description.join('\n')}/></label>
      <label>Features <span className="muted">One item per line</span><textarea name="features" rows={5} defaultValue={property?.features.join('\n')}/></label>
      <label>Deposit<input name="deposit" type="number" min="0" defaultValue={value('deposit')}/></label>
      <label>Council tax<input name="councilTax" defaultValue={value('councilTax')}/></label>
      <label>EPC<input name="epc" defaultValue={value('epc')}/></label>
      <label>Tenure<input name="tenure" defaultValue={value('tenure')}/></label>
      <label>Furnishing<input name="furnishing" defaultValue={value('furnishing')}/></label>
      <label>Available date<input name="availableDate" defaultValue={value('availableDate')}/></label>
      <label className="full">Material information<textarea name="materialInformation" rows={4} defaultValue={value('materialInformation')}/></label>
    </div>
    <section className="admin-images" aria-labelledby="images-heading"><h2 id="images-heading">Images</h2><p className="muted">Use a file already stored in <code>public/images</code> and describe what the photograph shows.</p>
      <div className="admin-image-list">{images.map((image,index)=><article key={`${image.src}-${index}`}><img src={image.src} alt={image.alt}/><strong>{image.alt}</strong><code>{image.src}</code><button type="button" aria-label={`Remove ${image.alt}`} onClick={()=>setImages(current=>current.filter((_,itemIndex)=>itemIndex!==index))}>Remove</button></article>)}</div>
      <div className="admin-image-entry"><label>Image path<input value={imageSrc} onChange={event=>setImageSrc(event.target.value)} placeholder="/images/property-front.jpg"/></label><label>Image description<input value={imageAlt} onChange={event=>setImageAlt(event.target.value)} placeholder="Front of the property"/></label><button type="button" className="button outline" onClick={addImage}>Add image</button></div>
    </section>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <div className="admin-form-actions"><button className="button" disabled={busy}>{busy?'Saving…':'Save property'}</button><button type="button" className="button outline" disabled={busy} onClick={()=>router.push('/admin')}>Cancel</button></div>
  </form>;
}
