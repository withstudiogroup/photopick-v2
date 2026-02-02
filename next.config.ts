import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 별도 도메인(photopick-v2.withstudiogroup.com)으로 배포하므로 basePath 불필요
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
