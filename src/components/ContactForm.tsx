'use client';

import { FormEvent, useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/seo';

type Status = 'idle' | 'sent';

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

// For now the form hands the message to the visitor's own email app (mailto:).
// /api/contact (SMTP) is still in the repo for when server-side sending is wired up.
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('website')) return; // honeypot
    openMailClient(data);
    setStatus('sent');
  }

  return (
    <form
      className="form"
      action={`mailto:${CONTACT_EMAIL}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
    >
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
        <button className="btn" type="submit">
          Send message
        </button>
      </div>
      <p className="note" role={status === 'sent' ? 'status' : undefined}>
        {status === 'sent'
          ? 'Your email app should open with your message ready to send. Just hit send there.'
          : "You'll get a reply from Joseph, not a sales team."}
      </p>
    </form>
  );
}
