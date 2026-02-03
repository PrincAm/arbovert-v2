import { Card } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { realizations } from "../../data/realizations";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

export const metadata = {
  title: "Realizace kácení stromů a arboristiky - Praha, Šumava | Arbovert",
  description:
    "Ukázky našich prací: kácení stromů v Praze, ošetřování stromů na Šumavě, péče o památné stromy v jižních Čechách. Rizikové kácení, havarijní zásahy, arboristika.",
  openGraph: {
    title: "Realizace kácení stromů a arboristiky - Praha, Šumava | Arbovert",
    description:
      "Ukázky našich prací: kácení stromů v Praze, ošetřování stromů na Šumavě, péče o památné stromy v jižních Čechách. Rizikové kácení, havarijní zásahy.",
    images: [
      {
        url: "https://arbovert.cz/images/service/kaceni.jpg",
        width: 800,
        height: 600,
        alt: "Realizace arboristických prací",
      },
    ],
  },
};

export default function RealizacePage() {
  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-3xl md:text-6xl font-bold text-foreground mb-8 md:mb-12">
          Realizace
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {realizations.map((realization) => (
            <NextLink
              key={realization.id}
              href={`/realizace/${realization.slug}`}
              className="block no-underline hover:-translate-y-1 hover:transition-transform hover:duration-300"
            >
              <Card className="overflow-hidden border-2 border-default-200 hover:border-success-500 transition-colors duration-300 rounded-2xl bg-white p-0">
                <div className="relative w-full h-48 md:h-64">
                  <Image
                    src={realization.imageSrc}
                    alt={realization.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-6 space-y-3">
                  <div className="flex items-center justify-between text-sm text-default-500">
                    <span>{realization.location}</span>
                    <span>{new Date(realization.date).toLocaleDateString('cs-CZ', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {realization.title}
                  </h3>
                  <p className="text-base md:text-lg text-default-600 leading-relaxed">
                    {realization.excerpt}
                  </p>
                  <p className="text-default-700 hover:text-default-900 font-semibold text-base md:text-lg transition-colors mt-2">
                    Více informací →
                  </p>
                </div>
              </Card>
            </NextLink>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
}
