import withSerwistInit from "@serwist/next";
// import withPWA from 'next-pwa';
// import runtimeCaching from 'next-pwa/cache.js';
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

// const nextConfig = withPWA({
const nextConfig = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  // dest: 'public',
  // disable: !isProduction,
  // runtimeCaching,
  register: true,
  // skipWaiting: true,
  // buildExcludes: [/test/, /tests/, /stories/, /coverage/, /docs/, /middleware-manifest.json$/],
})(
  config
);
 
export default nextConfig;