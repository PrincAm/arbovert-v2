import { serviceContent } from "../../../data/arbo";
import { realizations } from "../../../data/realizations";
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
    alternates: {
      canonical: `/sluzby/${slug}`,
    },
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

  const related = realizations
    .filter((r) => r.services && r.services.includes(slug))
    .slice(0, 3)
    .map(({ slug: realizationSlug, title, location, imageSrc }) => ({
      slug: realizationSlug,
      title,
      location,
      imageSrc,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://arbovert.cz/sluzby/${slug}#service`,
    name: service.title,
    description: service.seoDescription,
    url: `https://arbovert.cz/sluzby/${slug}`,
    image: `https://arbovert.cz${service.imageSrc}`,
    serviceType: service.title,
    provider: {
      "@id": "https://arbovert.cz/#organization",
      name: "Arbovert s.r.o.",
      url: "https://arbovert.cz",
    },
    areaServed: [
      { "@type": "City", name: "Praha" },
      { "@type": "City", name: "Vimperk" },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: "https://arbovert.cz" },
      { "@type": "ListItem", position: 2, name: "Služby", item: "https://arbovert.cz/sluzby" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://arbovert.cz/sluzby/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicePageClient service={service} slug={slug} related={related} />
    </>
  );
}
