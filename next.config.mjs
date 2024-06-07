/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['media.licdn.com','fakestoreapi.com'],
    unoptimized: true,
  },
};

export default nextConfig;
