"use client";

import { Link } from "@heroui/react";
import Image from "next/image";
import FadeIn from "./FadeIn";

const clients = [
  { src: "/images/reference/logos/cez-logo.png", alt: "ČEZ" },
  { src: "/images/reference/logos/lisno-logo.png", alt: "Zámeček Lišno" },
  { src: "/images/reference/logos/mnisek-pod-brdy-logo.png", alt: "Město Mníšek pod Brdy" },
  { src: "/images/reference/logos/povodi-vltavy-logo.png", alt: "Povodí Vltavy" },
  { src: "/images/reference/logos/ttp-invest-logo.png", alt: "TTP Invest" },
  { src: "/images/reference/logos/vimperk-logo.jpeg", alt: "Město Vimperk" },
  { src: "/images/reference/logos/vsem-logo.jpeg", alt: "VŠEM" },
];

const TrustSection = () => (
  <div className="bg-white py-16 md:py-20">
    <div className="max-w-screen-lg mx-auto w-full px-6">
      {/* Certifications row */}
      <FadeIn>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16">
        <Link href="https://www.eac-arboriculture.com/eac-intro.aspx" target="_blank" className="flex flex-col items-center gap-3 group">
          <div className="bg-white p-4 rounded-xl border-2 border-transparent hover:border-success-500 transition-colors">
            <Image
              src="/images/etw.png"
              width={140}
              height={90}
              alt="ETW certifikace"
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-500 group-hover:text-success-600 transition-colors">
            Evropská certifikace ETW
          </span>
        </Link>
        <Link href="https://szkt.cz/" target="_blank" className="flex flex-col items-center gap-3 group">
          <div className="bg-white p-4 rounded-xl border-2 border-transparent hover:border-success-500 transition-colors">
            <Image
              src="/images/szkt.svg"
              width={140}
              height={90}
              alt="SZKT"
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-500 group-hover:text-success-600 transition-colors">
            Členové SZKT
          </span>
        </Link>
      </div>
      </FadeIn>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-16" />

      {/* Client logos */}
      <FadeIn delay={100}>
      <div className="text-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
          Pracujeme pro města, firmy i soukromníky
        </h3>
      </div>
      <div className="marquee-container overflow-hidden">
        <div className="marquee-track flex items-center">
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="flex-shrink-0 px-6 md:px-10 h-20 md:h-28 flex items-center">
              <img
                src={client.src}
                alt={client.alt}
                className="h-full w-auto object-contain grayscale opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
      </FadeIn>
    </div>
  </div>
);

export default TrustSection;
