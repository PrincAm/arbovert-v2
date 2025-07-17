import Script from 'next/script';
import { NextSeo } from 'next-seo';

import Welcome from '../components/Welcome';
import Intro from '../components/Intro';
import Certificate from '../components/Certificate';

import Layout from '../layouts/index';
import ContactUs from '../components/ContactUs';
import Trusted from '../components/Trusted';
import Organisation from '../components/Organisation';
import GoToFormButton from '../components/GoToFormButton';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arbovert s.r.o.",
    "description": "Profesionální arboristické služby včetně rizikového kácení, ošetřování stromů, inventarizace dřevin a údržby zahrad.",
    "url": "https://arbovert.cz",
    "telephone": "+420-XXX-XXX-XXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pasovská 84/37",
      "addressLocality": "Vimperk",
      "postalCode": "38501",
      "addressCountry": "CZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.0556",
      "longitude": "13.7733"
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "priceRange": "$$",
    "serviceType": [
      "Rizikové kácení",
      "Ošetřování stromů", 
      "Inventarizace dřevin",
      "Údržba zahrad",
      "Výškové práce"
    ],
    "foundingDate": "2011",
    "image": "https://arbovert.cz/images/welcome.jpg",
    "logo": "https://arbovert.cz/images/arbovert-logo.svg"
  };

  return (
    <>
      <NextSeo
        title="Arbovert - Arboristika, rizikové kácení, prořezávání stromů"
        description="Profesionální arboristické služby včetně rizikového kácení, ošetřování stromů, inventarizace dřevin a údržby zahrad. Certifikovaní pracovníci s 12+ lety zkušeností."
        canonical="https://arbovert.cz/"
        openGraph={{
          title: "Arbovert - Arboristika, rizikové kácení, prořezávání stromů",
          description: "Profesionální arboristické služby včetně rizikového kácení, ošetřování stromů, inventarizace dřevin a údržby zahrad.",
          url: "https://arbovert.cz/",
          images: [
            {
              url: "https://arbovert.cz/images/welcome.jpg",
              width: 1536,
              height: 1536,
              alt: "Arboristické práce - lana a stromy",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'arboristika, rizikové kácení, ošetřování stromů, inventarizace dřevin, údržba zahrad, výškové práce, prořezávání stromů, výsadby',
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
