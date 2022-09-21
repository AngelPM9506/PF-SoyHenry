/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  pageExtensions: ['tsx', 'ts']
};

module.exports = nextConfig;
