'use client';

import {useRef, useState} from 'react';
import {useRouter} from 'next/navigation';

export function AdminDelete({id, title}: {id: string; title: string}) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function remove() {
    if (busy) return;
    setBusy(true); setError('');
    try {
      const response = await fetch(`/api/admin/properties/${id}`, {method: 'DELETE'});
      if (!response.ok) throw new Error('Could not delete this property. Please try again.');
      dialog.current?.close();
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not delete this property.');
      setBusy(false);
    }
  }
  return <>
    <button className="text-button danger" type="button" onClick={() => dialog.current?.showModal()}>Delete</button>
    <dialog ref={dialog} className="confirm-dialog" aria-labelledby={`delete-${id}-title`} aria-describedby={`delete-${id}-description`} onClose={() => {setError(''); setBusy(false);}}>
      <h2 id={`delete-${id}-title`}>Delete property?</h2>
      <p id={`delete-${id}-description`}><strong>{title}</strong> will be permanently removed from the local demo data.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="button-row"><button type="button" className="button outline" autoFocus onClick={() => dialog.current?.close()} disabled={busy}>Cancel</button><button type="button" className="button danger-button" onClick={remove} disabled={busy}>{busy ? 'Deleting…' : 'Delete property'}</button></div>
    </dialog>
  </>;
}
