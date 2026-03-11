import type { NextConfig } from 'next';

const nodeEnv = process.env.NODE_ENV;

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: nodeEnv === 'development' ? true : false,
};

export default nextConfig;
