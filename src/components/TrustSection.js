"use client";

import { Link } from "@heroui/react";
import Image from "next/image";

const TrustSection = () => (
  <div className="bg-gray-50 py-16 md:py-20">
    <div className="max-w-screen-lg mx-auto w-full px-6">
      {/* Certifications row */}
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

      {/* Divider */}
      <div className="border-t border-gray-200 mb-16" />

      {/* Client logos */}
      <div className="text-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
          Pracujeme pro města, firmy i soukromníky
        </h3>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
        <Image
          src="/images/reference/lisno.png"
          width={80}
          height={80}
          alt="Zámeček Lišno"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
        <Image
          src="/images/reference/mnisek.png"
          width={80}
          height={80}
          alt="Město Mníšek pod Brdy"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
        <Image
          src="/images/reference/povodni.png"
          width={80}
          height={80}
          alt="Povodí Labe"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
        <Image
          src="/images/reference/ttp-logo.png"
          width={80}
          height={80}
          alt="TTP"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
        <Image
          src="/images/reference/vimperk.png"
          width={80}
          height={80}
          alt="Město Vimperk"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
        <Image
          src="/images/reference/vsem.png"
          width={80}
          height={80}
          alt="VŠEM"
          className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
        />
      </div>
    </div>
  </div>
);

export default TrustSection;
