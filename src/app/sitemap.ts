import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const routes = [
  { path: '', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/services/network-security-waukesha-county', priority: 0.8 },
  { path: '/work', priority: 0.7 },
  { path: '/about/joseph-henderson', priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
