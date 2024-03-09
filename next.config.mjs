import bundleAnalyzer from '@next/bundle-analyzer';

import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';
const isProduction = process.env.NODE_ENV === 'production';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  pwa: {
    dest: 'public',
    disable: !isProduction,
    runtimeCaching,
  },
};

export default isProduction
  ? withBundleAnalyzer(withPWA(nextConfig))
  : nextConfig;
