module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    loader: 'cloudinary',
    path: '',
  },
  // Ensure .html files are generated for static export
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/o-nas.html': { page: '/o-nas' },
      '/sluzby.html': { page: '/sluzby' },
      '/kontakt.html': { page: '/kontakt' },
      '/sluzby/rizikove-kaceni-stromu.html': { page: '/sluzby/[slug]', query: { slug: 'rizikove-kaceni-stromu' } },
      '/sluzby/odborne-osetrovani-stromu.html': { page: '/sluzby/[slug]', query: { slug: 'odborne-osetrovani-stromu' } },
      '/sluzby/zajistovani-stromu.html': { page: '/sluzby/[slug]', query: { slug: 'zajistovani-stromu' } },
      '/sluzby/prorezavani-ovocnych-stromu.html': { page: '/sluzby/[slug]', query: { slug: 'prorezavani-ovocnych-stromu' } },
      '/sluzby/likvidace-drevni-hmoty.html': { page: '/sluzby/[slug]', query: { slug: 'likvidace-drevni-hmoty' } },
      '/sluzby/vysadba-stromu-a-povysadbova-pece.html': { page: '/sluzby/[slug]', query: { slug: 'vysadba-stromu-a-povysadbova-pece' } },
      '/sluzby/inventarizace-drevin.html': { page: '/sluzby/[slug]', query: { slug: 'inventarizace-drevin' } },
    };
  },
};
