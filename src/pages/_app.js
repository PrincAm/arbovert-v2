import '../../styles/globals.css';
import { useEffect } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import CookieBanner from '../components/CookieBanner';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Arbovert s.r.o.",
  "alternateName": "Arbovert",
  "description": "Profesionální arboristické služby včetně rizikového kácení, ošetřování stromů, inventarizace dřevin a údržby zahrad v Praze a Vimperku.",
  "url": "https://arbovert.cz",
  "telephone": "+420-739-969-933",
  "email": "info@arbovert.cz",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Pasovská 84/37",
      "addressLocality": "Vimperk",
      "postalCode": "38501",
      "addressCountry": "CZ"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Jirsíkova 484/6",
      "addressLocality": "Praha",
      "addressCountry": "CZ"
    }
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Praha",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Hlavní město Praha"
      }
    },
    {
      "@type": "City", 
      "name": "Vimperk",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Jihočeský kraj"
      }
    }
  ],
  "geo": [
    {
      "@type": "GeoCoordinates",
      "latitude": "50.0755",
      "longitude": "14.4378",
      "name": "Praha"
    },
    {
      "@type": "GeoCoordinates", 
      "latitude": "49.0556",
      "longitude": "13.7733",
      "name": "Vimperk"
    }
  ],
  "openingHours": "Mo-Fr 08:00-17:00",
  "priceRange": "$$",
  "serviceType": [
    "Rizikové kácení",
    "Ošetřování stromů", 
    "Inventarizace dřevin",
    "Údržba zahrad",
    "Výškové práce",
    "Prořezávání stromů",
    "Výsadby stromů"
  ],
  "foundingDate": "2011",
  "image": "https://arbovert.cz/images/welcome.jpg",
  "logo": "https://arbovert.cz/images/arbovert-logo.svg",
  "sameAs": [
    "https://vyskoveprace-arbovert.cz/",
    "https://www.facebook.com/arbovertcz/"
  ]
};

// Base SEO configuration
const baseSEO = {
  title: 'Arbovert - Arboristika Praha, Vimperk',
  description:
    'Rizikové kácení, ošetřování stromů, inventarizace dřevin a další arboristické služby v Praze a Vimperku. Profesionální péče o stromy a zahrady.',
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
      'Arboristika Praha, Vimperk - rizikové kácení, prořezávání stromů, výsadby | Arbovert',
    description:
      'Rizikové kácení, ošetřování stromů, inventarizace dřevin, ošetřování památných stromů, instalace stabilizačních prvků, údržba zahrad, řez ovocných dřevin, posudky stromů a poradenství v Praze a Vimperku.',
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
  // Only add .html suffix for pages that actually have .html files
  const path = router.asPath;
  const canonicalUrl = path === '/' 
    ? 'https://arbovert.cz/' 
    : `https://arbovert.cz${path}${path.endsWith('.html') ? '' : '.html'}`;
  
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
