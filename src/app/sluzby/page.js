import { Link } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { serviceContent } from "../../data/arbo";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

const StyledIcon = ({ className = "", ...props }) => (
  <FontAwesomeIcon className={`w-5 h-5 ml-2 ${className}`} {...props} />
);

const StyledServiceCard = ({ children, href, className = "", ...props }) => (
  <NextLink
    href={href}
    className={`block no-underline hover:-translate-y-1 hover:transition-transform hover:duration-300 ${className}`}
    {...props}
  >
    {children}
  </NextLink>
);

// Convert serviceContent to array, excluding inventarizace-drevin (handled separately)
const services = Object.entries(serviceContent)
  .filter(([slug]) => slug !== "inventarizace-drevin")
  .map(([slug, service]) => ({ ...service, slug }));

export const metadata = {
  title: "Kácení stromů a arboristika Praha, Šumava - Služby | Arbovert",
  description:
    "Profesionální kácení stromů v Praze a na Šumavě. Rizikové kácení, ošetřování stromů, péče o památné stromy, inventarizace dřevin. Certifikovaní arboristé pro jižní Čechy.",
  openGraph: {
    title: "Kácení stromů a arboristika Praha, Šumava - Služby | Arbovert",
    description: "Profesionální kácení stromů v Praze a na Šumavě. Rizikové kácení, ošetřování stromů, péče o památné stromy, inventarizace dřevin.",
    images: [
      {
        url: "https://arbovert.cz/images/service/strom-cropped.jpg",
        width: 800,
        height: 600,
        alt: "Arboristické služby - stromy",
      },
    ],
  },
};

export default function Service() {
  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-3xl md:text-6xl font-bold text-foreground mb-8 md:mb-12">
          Služby
        </h1>

        {/* Inventarizace dřevin - Special case with existing page */}
        <StyledServiceCard href="/sluzby/inventarizace-drevin">
          <div className="grid grid-cols-12 gap-4 md:gap-10 mb-6 md:mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200 hover:border-success-500 transition-colors duration-300">
            <div className="col-span-12 md:col-span-7 flex flex-col gap-3 md:gap-4">
              <h3 className="text-xl md:text-3xl font-semibold text-foreground">Inventarizace dřevin</h3>
              <p className="text-base md:text-lg text-default-600 leading-relaxed">
                Při inventarizaci dřevin analyzujeme informace o stromovém porostu na různých místech, nejen v lesích, ale i v městských
                parcích a jiných zelených plochách. Což je zásadní pro udržitelné využívání dřevní hmoty a ochranu přírody.
              </p>
              <p className="mt-2 md:mt-3 text-default-700 hover:text-default-900 font-semibold text-base md:text-xl transition-colors">
                Více informací →
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <Image
                src="/images/service/strom-cropped.jpg"
                width={400}
                height={300}
                alt="Inventarizace dřevin"
                className="w-full h-auto rounded-lg object-cover"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </StyledServiceCard>

        {/* Services from serviceContent */}
        {services.map(({ title, description, imageSrc, slug }) => {
          return (
            <StyledServiceCard key={slug} href={`/sluzby/${slug}`}>
              <div className="grid grid-cols-12 gap-4 md:gap-10 mb-6 md:mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200 hover:border-success-500 transition-colors duration-300">
                <div className="col-span-12 md:col-span-7 flex flex-col gap-3 md:gap-4">
                  <h3 className="text-xl md:text-3xl font-semibold text-foreground">{title}</h3>
                  <p className="text-base md:text-lg text-default-600 leading-relaxed">{description}</p>
                  <p className="mt-2 md:mt-3 text-default-700 hover:text-default-900 font-semibold text-base md:text-xl transition-colors">
                    Více informací →
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <Image
                    src={imageSrc}
                    width={400}
                    height={300}
                    alt={title}
                    className="w-full h-auto rounded-lg object-cover"
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
            </StyledServiceCard>
          );
        })}

        {/* Výškové práce - External link */}
        <div key="upwork" className="grid grid-cols-12 gap-4 md:gap-10 mb-6 md:mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-3 md:gap-4">
            <h3 className="text-xl md:text-3xl font-semibold text-foreground">Výškové práce</h3>
            <p className="text-base md:text-xl font-medium text-default-600 leading-relaxed">
              Máme bohaté zkušenosti i s prací ve výškách. Pokud potřebujete čištění a mytí nebo nátěry a opravy fasád, až po opravy střech a
              drobných klempířských prvků, jsou práce z lana ta nejlepší varianta.
            </p>
            <Link
              href="https://vyskoveprace-arbovert.cz/"
              target="_blank"
              className="mt-2 md:mt-3 flex items-center font-semibold text-default-700 hover:text-default-900 text-base md:text-xl transition-colors w-fit"
            >
              Více informací <StyledIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </div>
          <div className="col-span-12 md:col-span-5">
            <Link href="https://vyskoveprace-arbovert.cz/" target="_blank">
              <Image
                src="/images/service/vysky.webp"
                width={400}
                height={300}
                alt="Výškové práce"
                className="w-full h-auto rounded-lg object-cover"
                style={{ height: "auto" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
