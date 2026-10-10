import { CONTACT_EMAIL } from '@/lib/seo';
import { ContactForm } from './ContactForm';
import { Mesh } from './Mesh';

export function ContactBand({ heading, blurb }: { heading: string; blurb: string }) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-h">
      <Mesh tone="dark" />
      <div className="wrap">
        <div>
          <h2 id="contact-h">{heading}</h2>
          <p>{blurb}</p>
          <p className="direct">
            Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
