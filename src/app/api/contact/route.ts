import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  company: z.string().trim().max(160).optional().default(''),
  topic: z.string().trim().max(120).optional().default('Not sure yet'),
  message: z.string().trim().min(1).max(5000),
  website: z.string().optional().default(''), // honeypot: must stay empty
});

// Small in-memory limiter: 5 messages per IP per 10 minutes.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_HITS;
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export async function POST(req: Request) {
  const isJson = (req.headers.get('content-type') ?? '').includes('application/json');
  let raw: unknown;
  try {
    raw = isJson ? await req.json() : Object.fromEntries(await req.formData());
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }
  const { name, email, company, topic, message, website } = parsed.data;

  // Bots fill the hidden field. Pretend it worked.
  if (website) return respond(isJson);

  const to = process.env.CONTACT_TO ?? 'contact@layeroneconsultants.com';
  const from = process.env.CONTACT_FROM;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || '-'}`,
    `Topic: ${topic}`,
    '',
    message,
  ].join('\n');

  const host = process.env.SMTP_HOST;
  if (!from || !host) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[contact] SMTP_HOST/CONTACT_FROM not set; message not sent:\n' + text);
      return respond(isJson);
    }
    console.error('[contact] SMTP_HOST or CONTACT_FROM is not configured');
    return NextResponse.json(
      { error: 'Messages are unavailable right now. Please email contact@layeroneconsultants.com.' },
      { status: 503 },
    );
  }

  try {
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER;
    const transport = nodemailer.createTransport({
      host,
      port,
      // true for implicit TLS (port 465); false uses STARTTLS (port 587)
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: user ? { user, pass: process.env.SMTP_PASS ?? '' } : undefined,
    });
    await transport.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Website inquiry: ${oneLine(topic)} (${oneLine(name)})`,
      text,
    });
  } catch (err) {
    console.error('[contact] SMTP send failed', err);
    return NextResponse.json(
      { error: 'Could not send your message. Please email contact@layeroneconsultants.com.' },
      { status: 502 },
    );
  }

  return respond(isJson);
}

function respond(isJson: boolean) {
  if (isJson) return NextResponse.json({ ok: true });
  // Plain form post (no JavaScript): send the visitor back to the contact band.
  return new NextResponse(null, { status: 303, headers: { Location: '/?sent=1#contact' } });
}
