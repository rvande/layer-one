'use client';

import { FormEvent, useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/seo';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const TOPICS = [
  'Network or firewall work',
  'Custom software or an app',
  'AI or automation',
  'Servers, storage or backups',
  'Not sure yet',
];

function openMailClient(data: FormData) {
  const get = (k: string) => String(data.get(k) ?? '');
  const subject = `Website inquiry: ${get('topic')} (${get('name')})`;
  const body = `Name: ${get('name')}\nEmail: ${get('email')}\nCompany: ${get('company')}\nTopic: ${get('topic')}\n\n${get('message')}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 502 || res.status === 503) {
        // Server can't deliver mail: fall back to the visitor's own mail app.
        openMailClient(new FormData(form));
        setError('Your email app should open with your message ready to send.');
        setStatus('error');
        return;
      }
      if (!res.ok) throw new Error(body.error ?? 'Something went wrong.');
      form.reset();
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <h3>Message sent.</h3>
        <p>Thanks. You&apos;ll hear back from Joseph directly, usually within one business day.</p>
      </div>
    );
  }

  return (
    <form className="form" action="/api/contact" method="post" onSubmit={onSubmit}>
      <div>
        <label htmlFor="f-name">Name</label>
        <input id="f-name" name="name" autoComplete="name" required maxLength={120} />
      </div>
      <div>
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      <div>
        <label htmlFor="f-co">Company</label>
        <input id="f-co" name="company" autoComplete="organization" maxLength={160} />
      </div>
      <div>
        <label htmlFor="f-topic">What do you need?</label>
        <select id="f-topic" name="topic">
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="full">
        <label htmlFor="f-msg">What&apos;s going on?</label>
        <textarea id="f-msg" name="message" required maxLength={5000} />
      </div>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div>
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      <p className="note" role={status === 'error' ? 'alert' : undefined}>
        {status === 'error' ? error : "You'll get a reply from Joseph, not a sales team."}
      </p>
    </form>
  );
}
