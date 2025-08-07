import '../../styles/globals.css';
import { useEffect } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import CookieBanner from '../components/CookieBanner';

// Base SEO configuration
const baseSEO = {
  title: 'Arbovert',
  description:
    'Rizikové kácení, ošetřování stromů, inventarizace dřevin a další arboristické služby. Profesionální péče o stromy a zahrady.',
  additionalMetaTags: [
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'author',
      content: 'Arbovert s.r.o.',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Arbovert',
    title:
      'Arboristika, rizikové kácení, prořezávání stromů, výsadby | Arbovert',
    description:
      'Rizikové kácení, ošetřování stromů, inventarizace dřevin, ošetřování památných stromů, instalace stabilizačních prvků, údržba zahrad, řez ovocných dřevin, posudky stromů a poradenství.',
    images: [
      {
        url: 'https://arbovert.cz/images/welcome.jpg',
        width: 1536,
        height: 1536,
        alt: 'Arboristické práce - lana a stromy',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    handle: '@arbovert',
    site: '@arbovert',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Generate canonical URL based on current path
  // Add .html suffix for all pages except homepage (consistent with useCanonicalUrl hook)
  const path = router.asPath;
  const canonicalUrl = path === '/' 
    ? 'https://arbovert.cz/' 
    : `https://arbovert.cz${path}.html`;
  
  // Create SEO config with dynamic canonical URL
  const seoConfig = {
    ...baseSEO,
    canonical: canonicalUrl,
    openGraph: {
      ...baseSEO.openGraph,
      url: canonicalUrl,
    },
    additionalLinkTags: [
      ...baseSEO.additionalLinkTags,
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
  };

  useEffect(() => {
    const loadGtagScript = () => {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=GTM-5V7DRKB`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        updateGtagConsent();
      };
    };

    const updateGtagConsent = () => {
      const consent = Cookies.get('ga_consent');
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
          ad_storage: consent === 'accepted' ? 'granted' : 'denied',
          ad_user_data: consent === 'accepted' ? 'granted' : 'denied',
          ad_personalization: consent === 'accepted' ? 'granted' : 'denied',
        });
      }
    };

    loadGtagScript();
  }, []);

  const theme = createTheme({
    type: 'light',
    theme: {
      colors: {
        gradient: 'linear-gradient(45deg, $blue500 -20%, $green500 50%)',
      },
    },
  });
  return (
    <>
      <NextUIProvider theme={theme}>
        <DefaultSeo {...seoConfig} />
        <Component {...pageProps} />
        <CookieBanner />
      </NextUIProvider>
    </>
  );
}

export default MyApp;
