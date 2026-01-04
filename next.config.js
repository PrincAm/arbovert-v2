module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
    loader: 'cloudinary',
    path: '',
  },
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
};
