/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prod-airnote.kr.object.ncloudstorage.com',
      },
    ],
  },
};

export default nextConfig;
