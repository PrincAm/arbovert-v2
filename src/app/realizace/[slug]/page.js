import { Button, Card } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { realizations } from "../../../data/realizations";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

// Generate static params for all realizations
export async function generateStaticParams() {
  return realizations.map((realization) => ({
    slug: realization.slug,
  }));
}

// Generate metadata for each realization
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const realization = realizations.find((r) => r.slug === slug);

  if (!realization) {
    return {
      title: "Realizace nenalezena - Arbovert",
    };
  }

  return {
    title: `${realization.title} | Arbovert`,
    description: realization.excerpt,
    openGraph: {
      title: realization.title,
      description: realization.excerpt,
      images: [
        {
          url: `https://arbovert.cz${realization.imageSrc}`,
          width: 800,
          height: 600,
          alt: realization.title,
        },
      ],
    },
  };
}

export default async function RealizaceDetailPage({ params }) {
  const { slug } = await params;
  const realization = realizations.find((r) => r.slug === slug);

  // If realization not found, return 404
  if (!realization) {
    return (
      <StyledContainer>
        <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
          <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground">
            Realizace nenalezena
          </h1>
        </div>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <NextLink
          href="/realizace"
          className="inline-flex items-center text-success-600 hover:text-success-700 hover:underline transition-colors mb-8 text-base md:text-lg"
        >
          ← Zpět na realizace
        </NextLink>

        <div className="space-y-8 md:space-y-12">
          <div>
            <div className="flex items-center justify-between text-sm md:text-base text-default-500 mb-4">
              <span>{realization.location}</span>
              <span>
                {new Date(realization.date).toLocaleDateString("cs-CZ", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="leading-tight text-3xl md:text-5xl font-bold text-foreground mb-6">
              {realization.title}
            </h1>
          </div>

          <Card className="overflow-hidden border-2 border-default-200 rounded-2xl bg-white p-0">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={realization.imageSrc}
                alt={realization.title}
                fill
                className="object-cover"
              />
            </div>
          </Card>

          <div
            className="text-base md:text-lg text-default-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: realization.content }}
          />

          {/* Photo Gallery */}
          {realization.gallery && realization.gallery.length > 1 && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                Fotogalerie
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {realization.gallery.map((image, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-2 border-default-200 rounded-xl bg-white p-0 hover:border-success-500 transition-colors duration-300"
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={image}
                        alt={`${realization.title} - foto ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-6 pt-8">
            <p className="text-xl md:text-2xl font-semibold text-foreground text-center">
              Potřebujete podobnou službu?
            </p>
            <NextLink href="/kontakt">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg px-10 py-6 rounded-full hover:opacity-90 transition-opacity shadow-md"
                radius="full"
              >
                Kontaktujte nás
              </Button>
            </NextLink>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
