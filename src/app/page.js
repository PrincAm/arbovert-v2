"use client";

import Script from 'next/script';
import Welcome from '../components/Welcome';
import Intro from '../components/Intro';
import TrustSection from '../components/TrustSection';
import ContactUs from '../components/ContactUs';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arbovert s.r.o.",
    "alternateName": "Arbovert",
    "description": "Arbovert - profesionální arborista Praha. Rizikové kácení stromů, inventarizace dřevin a stromů, štěpkování dřevní hmoty, likvidace dřevního odpadu. Technika kácení stromů v Praze a na Šumavě.",
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
      "Rizikové kácení stromů",
      "Arborista Praha",
      "Inventarizace dřevin",
      "Inventarizace stromů",
      "Štěpkování dřevní hmoty",
      "Štěpkování dřeva",
      "Likvidace dřevního odpadu",
      "Likvidace dřeva",
      "Technika kácení stromů",
      "Ošetřování stromů",
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

  return (
    <>
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
      <Welcome />
      <Intro />
      <TrustSection />
      <ContactUs />
    </>
  );
}
