"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function ServicePageClient({ service, slug }) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/kontakt");
  };

  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-3xl md:text-6xl font-bold text-foreground mb-6 md:mb-12">
          {service.title}
        </h1>
        <div className="grid grid-cols-12 gap-4 md:gap-10 mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-3 md:gap-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">Arbovert</h2>
            <div className="space-y-4">
              <p className="block font-bold text-base md:text-xl text-foreground">{service.description}</p>
              <p className="block font-bold text-base md:text-xl text-foreground">{service.longDescription}</p>
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
              <p className="block mt-6 font-bold text-base md:text-xl text-foreground">{service.question}</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5">
            <Image
              src={service.imageSrc}
              width={400}
              height={300}
              alt={service.title}
              className="w-full h-auto rounded-lg object-cover"
              style={{ height: "auto" }}
            />
          </div>
          <div className="col-span-12">
            <div className="max-w-screen-lg mx-auto flex flex-col items-center mt-8 mb-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base md:text-lg px-6 md:px-10 py-5 md:py-6 rounded-full transition-colors"
                radius="full"
                onClick={handleButtonClick}
              >
                {service.ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
