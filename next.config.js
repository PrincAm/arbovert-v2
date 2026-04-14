/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'cloudinary',
    path: '',
  },
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Přidání konfigurace pro Turbopack
  experimental: {
    turbopack: {
      root: __dirname, // nebo process.cwd()
    },
  },
};

module.exports = nextConfig;
