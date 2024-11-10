/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
