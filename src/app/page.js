"use client";

import Script from 'next/script';
import Welcome from '../components/Welcome';
import Intro from '../components/Intro';
import Certificate from '../components/Certificate';
import ContactUs from '../components/ContactUs';
import Trusted from '../components/Trusted';
import Organisation from '../components/Organisation';
import GoToFormButton from '../components/GoToFormButton';

export default function Home() {
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
      <ContactUs />
      <Certificate />
      <Trusted />
      <Organisation />
      <GoToFormButton />
    </>
  );
}
