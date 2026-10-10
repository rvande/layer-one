import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image.
  output: 'standalone',
  poweredByHeader: false,
  // Slugs from the previous site.
  async redirects() {
    return [
      { source: '/contact', destination: '/#contact', permanent: true },
    ];
  },
};

export default nextConfig;
