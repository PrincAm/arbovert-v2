import { serviceContent } from '../data/arbo';
import { realizations } from '../data/realizations';

export const dynamic = 'force-static';

const BASE_URL = 'https://arbovert.cz';

export default function sitemap() {
  const newestRealizationDate = realizations
    .map((realization) => realization.date)
    .sort()
    .at(-1);

  const staticRoutes = [
    '',
    '/o-nas',
    '/sluzby',
    '/kontakt',
    '/gdpr',
    '/kaceni-stromu-vimperk',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
  }));

  const serviceRoutes = Object.keys(serviceContent).map((slug) => ({
    url: `${BASE_URL}/sluzby/${slug}`,
  }));

  const realizationRoutes = realizations.map((realization) => ({
    url: `${BASE_URL}/realizace/${realization.slug}`,
    lastModified: realization.date,
  }));

  return [
    ...staticRoutes,
    { url: `${BASE_URL}/realizace`, lastModified: newestRealizationDate },
    ...serviceRoutes,
    ...realizationRoutes,
  ];
}
