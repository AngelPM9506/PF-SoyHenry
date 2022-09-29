/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com", "i.vgy.me"],
  },
  pageExtensions: ['tsx', 'ts']
};

module.exports = nextConfig;
