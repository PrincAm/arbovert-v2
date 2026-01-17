"use client";

import { Card, Link } from "@heroui/react";
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
    <div id="intro" className="max-w-screen-lg mx-auto w-full pt-20 px-6">
      <div className="grid grid-cols-12 gap-8 md:gap-10 justify-center">
        <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
          <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground">Co umíme</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Rizikové kácení, ošetřování stromů, instalace stabilizačních prvků, údržba zahrad, řez ovocných dřevin, inventarizace dřevin, ošetřování památných stromů, posudky stromů a poradenství
          </p>
          <Link
            as={NextLink}
            href="/sluzby"
            className="text-success-600 hover:text-success-700 text-lg md:text-xl font-semibold transition-colors w-fit group"
          >
            <span className="border-b-2 border-success-600 group-hover:border-success-700 pb-1">
              Více o našich službách →
            </span>
          </Link>
        </div>
        <div className="col-span-12 md:col-span-5">
          <NextLink href="/sluzby">
            <Card className="overflow-hidden hover:border-success-600 transition-colors duration-300 rounded-lg p-0">
              <Image
                src="/images/arbo.jpg"
                width={isMobile ? 320 : 400}
                height={isMobile ? 320 : 400}
                alt="Arboristické služby"
                className="object-cover w-full h-full"
              />
            </Card>
          </NextLink>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col gap-6 mt-8 md:mt-12">
          <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground">Arboristika je náš život</h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Máme přes {getYearsSinceFounded()} let zkušeností.
            <br />A na naší práci to uvidíte.
          </p>
          <Link
            as={NextLink}
            href="/o-nas"
            className="text-success-600 hover:text-success-700 text-lg md:text-xl font-semibold transition-colors w-fit group"
          >
            <span className="border-b-2 border-success-600 group-hover:border-success-700 pb-1">Více o nás →</span>
          </Link>
        </div>
        <div className="col-span-12 md:col-span-5 mt-8 md:mt-12">
          <NextLink href="/o-nas">
            <Card className="overflow-hidden hover:border-success-600 transition-colors duration-300 rounded-lg p-0">
              <Image
                src="/images/we.jpg"
                width={isMobile ? 320 : 400}
                height={isMobile ? 320 : 400}
                alt="Náš tým"
                className="object-cover w-full h-full"
              />
            </Card>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default Intro;
