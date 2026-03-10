import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // <--- Add this line!
  images: {
    unoptimized: true, // This is often needed for static exports
  },
};

export default nextConfig;