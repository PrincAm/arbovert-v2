import Script from 'next/script';

import Welcome from '../components/Welcome';
import Intro from '../components/Intro';
import Certificate from '../components/Certificate';

import Layout from '../layouts/index';
import ContactUs from '../components/ContactUs';
import Trusted from '../components/Trusted';
import Organisation from '../components/Organisation';
import GoToFormButton from '../components/GoToFormButton';

export default function Home() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8GZ2HM5LBZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8GZ2HM5LBZ');
        `}
      </Script>
      <Layout>
        <Welcome />
        <Intro />
        <ContactUs />
        <Certificate />
        <Trusted />
        <Organisation />
        <GoToFormButton />
      </Layout>
    </>
  );
}
