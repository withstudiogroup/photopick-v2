import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSR 모드 - API 라우트가 있어서 static export 불가
  basePath: '/photopick-v2',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
