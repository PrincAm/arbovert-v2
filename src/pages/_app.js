import '../../styles/globals.css';
import { useEffect } from 'react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Script from 'next/script';
import Cookies from 'js-cookie';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

import CookieBanner from '../components/CookieBanner';

function MyApp({ Component, pageProps }) {
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
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <CookieBanner />
      </NextUIProvider>
    </>
  );
}

export default MyApp;
