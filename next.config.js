/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    domains: ['images.pexels.com', 'qncljsxdjefkimfxdzuf.supabase.co'],
  },
};

module.exports = nextConfig;