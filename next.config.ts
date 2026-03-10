import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // <--- Add this line!
  images: {
    unoptimized: true, // This is often needed for static exports
  },
  eslint: {
    ignoreDuringBuilds: true, // This stops the "Red Error" for formatting
  },
  trailingSlash: true,
};

export default nextConfig;