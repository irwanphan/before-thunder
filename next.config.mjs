import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';
const isProduction = process.env.NODE_ENV === 'production';
 
const config = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};
 
const nextConfig = withPWA({
  dest: 'public',
  disable: !isProduction,
  runtimeCaching
})(
  config
);
 
export default nextConfig;