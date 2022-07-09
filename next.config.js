/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'images.ctfassets.net',
      'downloads.ctfassets.net'
    ],
  }
};

module.exports = nextConfig
