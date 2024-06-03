import '../../styles/globals.css';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import Script from 'next/script';

import CookieBanner from '../components/CookieBanner';

function MyApp({ Component, pageProps }) {
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
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5V7DRKB');`,
        }}
      ></Script>
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
        <CookieBanner />
      </NextUIProvider>
    </>
  );
}

export default MyApp;
