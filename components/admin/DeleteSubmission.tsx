'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function DeleteSubmission({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function remove() {
    if (!window.confirm('Delete this submission? This cannot be undone.')) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/contact-submissions/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Unable to delete submission.');
      }
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to delete submission.');
    } finally {
      setBusy(false);
    }
  }

  return <div><button className="admin-outline" type="button" disabled={busy} onClick={remove}>{busy ? 'Deleting…' : 'Delete'}</button>{error && <div className="admin-alert mt-2" role="alert">{error}</div>}</div>;
}
