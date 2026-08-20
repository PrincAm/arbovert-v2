"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

const StyledItem = ({ children, className = "", ...props }) => (
  <li className={`mb-2 ${className}`} {...props}>
    {children}
  </li>
);

export default function ServicePageClient({ service, slug, related = [] }) {
  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-3xl md:text-6xl font-bold text-foreground mb-6 md:mb-12">
          {service.title}
        </h1>
        <div className="mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200">
          <div className="mb-4 md:float-right md:w-5/12 md:ml-10 md:mb-6">
            <Image
              src={service.imageSrc}
              width={400}
              height={300}
              alt={service.title}
              className="w-full h-auto rounded-lg object-cover"
              style={{ height: "auto" }}
            />
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
            {service.subtitle || service.title}
          </h2>
          <div className="space-y-4 mt-3 md:mt-6">
            <p className="block font-bold text-base md:text-xl text-foreground">{service.description}</p>
            <p className="block text-base md:text-lg text-default-600 leading-relaxed">{service.longDescription}</p>
            <p className="block font-bold text-base md:text-xl text-foreground mt-6">
              Jaké služby nabízíme?
            </p>
            <ol className="list-decimal list-inside space-y-2 text-base md:text-lg text-default-600 leading-relaxed">
              {service.benefits.map((benefit, index) => (
                <StyledItem key={index}>
                  <span className="font-bold text-foreground">{benefit.title}:</span> {benefit.description}
                </StyledItem>
              ))}
            </ol>
          </div>
          {service.sections && (
            <div className="space-y-8 mt-6 md:mt-10">
              {service.sections.map((section) => (
                <section key={section.heading} className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {section.heading}
                  </h3>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base md:text-lg text-default-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          )}
          <p className="block mt-6 md:mt-10 font-bold text-base md:text-xl text-foreground">{service.question}</p>
          <div className="clear-both flex flex-col items-center mt-8 mb-4">
            <NextLink href="/kontakt">
              <Button
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base md:text-lg px-6 md:px-10 py-5 md:py-6 rounded-full transition-colors"
                radius="full"
              >
                {service.ctaText}
              </Button>
            </NextLink>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-6 md:mt-10">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-6">
              Ukázky naší práce
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {related.map((realization) => (
                <NextLink
                  key={realization.slug}
                  href={`/realizace/${realization.slug}`}
                  className="block no-underline hover:-translate-y-1 hover:transition-transform hover:duration-300"
                >
                  <div className="overflow-hidden rounded-2xl border-2 border-default-200 hover:border-success-500 transition-colors duration-300 bg-white">
                    <div className="relative w-full h-40">
                      <Image
                        src={realization.imageSrc}
                        alt={realization.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 340px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-default-500">{realization.location}</p>
                      <p className="text-base font-semibold text-foreground">{realization.title}</p>
                    </div>
                  </div>
                </NextLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledContainer>
  );
}
