/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myplantin.com',
        port: '',
        pathname: '/**', // Allow all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: 'strapi.myplantin.com',
        port: '',
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
};

module.exports = nextConfig;