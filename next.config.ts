import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [{
      protocol: 'https',
      hostname: 'picsum.photos'
    },{
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com'
    },{
      protocol:'https',
      hostname: 'cdn.jsdelivr.net'
    }]
  },
  experimental:{
    serverActions:{
      bodySizeLimit: '50mb',
    }
  },
  eslint:{
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
