'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true);
    setMessage('');
    setSent(false);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again.');
      form.reset();
      setSent(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <h2>Send us a message</h2>
    <p>Tell us how we can help and we’ll get back to you.</p>
    <div className="contact-form-grid">
      <div><label htmlFor="contact-name">Name *</label><input id="contact-name" name="name" autoComplete="name" maxLength={190} required /></div>
      <div><label htmlFor="contact-email">Email *</label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={190} required /></div>
      <div><label htmlFor="contact-phone">Phone</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
      <div><label htmlFor="contact-subject">Subject *</label><input id="contact-subject" name="subject" maxLength={190} required /></div>
    </div>
    <div><label htmlFor="contact-message">Message *</label><textarea id="contact-message" name="message" rows={6} maxLength={5000} required /></div>
    {message && <p className="contact-form-error" role="alert">{message}</p>}
    {sent && <p className="contact-form-success" role="status">Thank you. Your message has been received.</p>}
    <button className="site-btn" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send message →'}</button>
  </form>;
}
