"use client";

import { Link } from "@heroui/react";
import NextLink from "next/link";
import Image from "next/image";
import { useIsMobile } from "../hooks/use-media-query";

const getYearsSinceFounded = () => {
  const foundedYear = 2011;
  const currentYear = new Date().getFullYear();
  return currentYear - foundedYear;
};

const Intro = () => {
  const isMobile = useIsMobile();

  return (
    <div id="intro" className="w-full">
      {/* Services Overview */}
      <div className="max-w-screen-lg mx-auto w-full pt-20 pb-16 px-6">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-5">
            <h2 className="leading-tight text-3xl md:text-5xl font-bold text-foreground">
              Co umíme
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Rizikové kácení, ošetřování stromů, instalace stabilizačních prvků, údržba zahrad, řez ovocných dřevin, inventarizace dřevin, ošetřování památných stromů, posudky stromů a poradenství.
            </p>
            <Link
              as={NextLink}
              href="/sluzby"
              className="text-success-600 hover:text-success-700 text-lg font-semibold transition-colors w-fit group"
            >
              <span className="border-b-2 border-success-600 group-hover:border-success-700 pb-1">
                Více o našich službách →
              </span>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6">
            <NextLink href="/sluzby" className="block">
              <div className="overflow-hidden rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/images/arbo.jpg"
                  width={600}
                  height={400}
                  alt="Arboristické služby"
                  className="object-cover w-full h-64 md:h-80 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </NextLink>
          </div>
        </div>
      </div>

      {/* Full-width image strip with stats */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/strom.jpg"
          fill
          alt="Výškové práce"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-screen-lg mx-auto w-full px-6 grid grid-cols-3 gap-4 md:gap-8 text-center text-white">
            <div>
              <p className="text-3xl md:text-5xl font-bold text-emerald-400">{getYearsSinceFounded()}</p>
              <p className="text-sm md:text-base mt-1">let zkušeností</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-bold text-emerald-400">2</p>
              <p className="text-sm md:text-base mt-1">pobočky v ČR</p>
            </div>
            <div>
              <p className="text-3xl md:text-5xl font-bold text-emerald-400">ETW</p>
              <p className="text-sm md:text-base mt-1">certifikace</p>
            </div>
          </div>
        </div>
      </div>

      {/* About section - reversed layout */}
      <div className="max-w-screen-lg mx-auto w-full py-20 px-6">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-6 order-2 md:order-1">
            <NextLink href="/realizace" className="block">
              <div className="overflow-hidden rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <Image
                  src="/images/we.jpg"
                  width={600}
                  height={400}
                  alt="Náš tým"
                  className="object-cover w-full h-64 md:h-80 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </NextLink>
          </div>
          <div className="col-span-12 md:col-span-6 order-1 md:order-2 flex flex-col gap-5">
            <h2 className="leading-tight text-3xl md:text-5xl font-bold text-foreground">
              Praha • Šumava • Jižní Čechy
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Jsme tým certifikovaných arboristů. Díky pobočkám v <strong>Praze</strong> a <strong>Vimperku na Šumavě</strong> zajišťujeme rychlé a profesionální kácení stromů a péči o stromy v celých jižních Čechách.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                as={NextLink}
                href="/realizace"
                className="text-success-600 hover:text-success-700 text-lg font-semibold transition-colors w-fit group"
              >
                <span className="border-b-2 border-success-600 group-hover:border-success-700 pb-1">
                  Naše realizace →
                </span>
              </Link>
              <Link
                as={NextLink}
                href="/o-nas"
                className="text-success-600 hover:text-success-700 text-lg font-semibold transition-colors w-fit group"
              >
                <span className="border-b-2 border-success-600 group-hover:border-success-700 pb-1">
                  O nás →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
