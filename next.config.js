module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'cloudinary',
    path: '',
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
};
