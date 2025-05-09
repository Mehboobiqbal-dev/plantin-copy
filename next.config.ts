/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Keep any existing configurations you have
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.myplantin.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'myplantin.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      }
      // You can add more hostnames here if needed in the future
    ],
  },
  // Add any other existing Next.js configurations you have here
};

export default nextConfig; // Use export default for ES Modules