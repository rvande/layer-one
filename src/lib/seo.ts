import type { Metadata } from 'next';
import { seoData } from './seo-data';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://layeroneconsultants.com';
export const SITE_NAME = 'Layer One IT Consultants';
export const CONTACT_EMAIL = 'contact@layeroneconsultants.com';

export type PageKey = keyof typeof seoData;

export function pageMetadata(key: PageKey): Metadata {
  const { title, description, canonical } = seoData[key];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [`${SITE_URL}/OG-Image.png`],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export function pageJsonLd(key: PageKey): Record<string, unknown> {
  return seoData[key].ld as unknown as Record<string, unknown>;
}
