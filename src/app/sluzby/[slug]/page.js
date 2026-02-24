import { serviceContent } from "../../../data/arbo";
import ServicePageClient from "./ServicePageClient";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

// Generate static params for all services
export async function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({
    slug,
  }));
}

// Generate metadata for each service
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceContent[slug];

  if (!service) {
    return {
      title: "Služba nenalezena - Arbovert",
    };
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      images: [
        {
          url: `https://arbovert.cz${service.imageSrc}`,
          width: 800,
          height: 600,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = serviceContent[slug];

  // If service not found, return 404
  if (!service) {
    return (
      <StyledContainer>
        <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
          <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground">
            Služba nenalezena
          </h1>
        </div>
      </StyledContainer>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    image: `https://arbovert.cz${service.imageSrc}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Arbovert s.r.o.",
      url: "https://arbovert.cz",
      telephone: "+420-739-969-933",
    },
    areaServed: [
      { "@type": "City", name: "Praha" },
      { "@type": "City", name: "Vimperk" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageClient service={service} slug={slug} />
    </>
  );
}
