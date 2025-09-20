/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Export statique seulement en production pour permettre Realtime en dev
  ...(isDevelopment ? {} : { output: 'export' }),
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    domains: ['images.pexels.com', 'qncljsxdjefkimfxdzuf.supabase.co'],
  },
};

module.exports = nextConfig;