import Image from 'next/image';
import NextLink from 'next/link';
import { realizations } from '../../data/realizations';

const StyledContainer = ({ children, className = '', ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

const RELATED_SLUGS = [
  'kaceni-brizy-a-douglesky-lhenice',
  'osetreni-lip-a-jirovce-lcovice',
  'osetreni-lipy-vacov',
];

const services = [
  {
    title: 'Rizikové kácení stromů',
    href: '/sluzby/rizikove-kaceni-stromu',
    description:
      'postupné kácení stromů ve stísněných podmínkách — u domů, nad střechami, ploty a elektrickým vedením.',
  },
  {
    title: 'Prořezávání a ošetřování stromů',
    href: '/sluzby/odborne-osetrovani-stromu',
    description:
      'zdravotní, bezpečnostní a redukční řezy, péče o vzrostlé i památné stromy.',
  },
  {
    title: 'Kácení a prořez stromů z plošiny',
    description:
      'tam, kde je ke stromu dobrý přístup, pracujeme rychle a bezpečně z vysokozdvižné plošiny.',
  },
  {
    title: 'Štěpkování a likvidace dřevní hmoty',
    href: '/sluzby/likvidace-drevni-hmoty',
    description:
      'štěpkování větví, frézování pařezů a úklid pozemku po kácení.',
  },
  {
    title: 'Prořezávání ovocných stromů',
    href: '/sluzby/prorezavani-ovocnych-stromu',
    description: 'řez jabloní, hrušní a dalších ovocných stromů na zahradách.',
  },
  {
    title: 'Výsadba stromů a povýsadbová péče',
    href: '/sluzby/vysadba-stromu-a-povysadbova-pece',
    description: 'výsadba vhodných druhů a následná péče o mladé stromy.',
  },
];

export const metadata = {
  alternates: {
    canonical: '/kaceni-stromu-vimperk',
  },
  title: 'Kácení a prořez stromů Vimperk – i z plošiny | Arbovert',
  description:
    'Rizikové kácení, prořez a ošetřování stromů ve Vimperku a okolí. Certifikovaní arboristé se sídlem přímo ve Vimperku. Pracujeme stromolezecky i z plošiny.',
  openGraph: {
    title: 'Kácení a prořez stromů Vimperk – i z plošiny | Arbovert',
    description:
      'Rizikové kácení, prořez a ošetřování stromů ve Vimperku a okolí. Certifikovaní arboristé se sídlem přímo ve Vimperku.',
    images: [
      {
        url: 'https://arbovert.cz/images/service/kaceni.jpg',
        width: 800,
        height: 600,
        alt: 'Kácení stromů Vimperk',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://arbovert.cz/kaceni-stromu-vimperk#service',
  name: 'Kácení a prořez stromů Vimperk',
  description:
    'Rizikové kácení, prořezávání a ošetřování stromů ve Vimperku a okolí. Stromolezecká technika i práce z vysokozdvižné plošiny.',
  url: 'https://arbovert.cz/kaceni-stromu-vimperk',
  image: 'https://arbovert.cz/images/service/kaceni.jpg',
  serviceType: 'Kácení stromů',
  provider: {
    '@id': 'https://arbovert.cz/#organization',
    name: 'Arbovert s.r.o.',
    url: 'https://arbovert.cz',
  },
  areaServed: [
    { '@type': 'City', name: 'Vimperk' },
    { '@type': 'City', name: 'Prachatice' },
    { '@type': 'City', name: 'Volyně' },
    { '@type': 'AdministrativeArea', name: 'Šumava' },
  ],
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Domů',
      item: 'https://arbovert.cz',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Kácení stromů Vimperk',
      item: 'https://arbovert.cz/kaceni-stromu-vimperk',
    },
  ],
};

export default function KaceniStromuVimperk() {
  const related = realizations
    .filter((realization) => RELATED_SLUGS.includes(realization.slug))
    .map(({ slug, title, location, imageSrc }) => ({
      slug,
      title,
      location,
      imageSrc,
    }));

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
      <StyledContainer>
        <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
          <h1 className="leading-tight text-3xl md:text-6xl font-bold text-foreground mb-6 md:mb-12">
            Kácení a prořez stromů Vimperk
          </h1>
          <div className="mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200">
            <div className="mb-4 md:float-right md:w-5/12 md:ml-10 md:mb-6">
              <Image
                src="/images/service/kaceni.jpg"
                width={400}
                height={300}
                alt="Kácení stromů Vimperk"
                className="w-full h-auto rounded-lg object-cover"
                style={{ height: 'auto' }}
              />
            </div>
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">
              Certifikovaní arboristé se sídlem ve Vimperku
            </h2>
            <div className="space-y-4 mt-3 md:mt-6">
              <p className="block font-bold text-base md:text-xl text-foreground">
                Potřebujete pokácet nebo prořezat strom ve Vimperku a okolí?
                Sídlíme přímo ve Vimperku, takže u vás můžeme být rychle a bez
                dlouhého dojíždění.
              </p>
              <p className="block text-base md:text-lg text-default-600 leading-relaxed">
                Arboristice se věnujeme od roku 2011. Provádíme rizikové kácení
                stromů, zdravotní a bezpečnostní prořezy, ošetřování vzrostlých
                i památných stromů a likvidaci dřevní hmoty se štěpkováním.
                Pracujeme stromolezeckou technikou i z vysokozdvižné plošiny —
                podle toho, co je pro konkrétní strom a jeho okolí bezpečnější a
                šetrnější.
              </p>
              <p className="block text-base md:text-lg text-default-600 leading-relaxed">
                Naši arboristé jsou držiteli evropské certifikace ETW (European
                Tree Worker) a jsme členy Společnosti pro zahradní a
                krajinářskou tvorbu (SZKT). Kromě Vimperska působíme na celé
                Šumavě a v jižních Čechách.
              </p>
              <p className="block font-bold text-base md:text-xl text-foreground mt-6">
                Jaké služby ve Vimperku a okolí nabízíme?
              </p>
              <ol className="list-decimal list-inside space-y-2 text-base md:text-lg text-default-600 leading-relaxed">
                {services.map((service) => (
                  <li key={service.title} className="mb-2">
                    <span className="font-bold text-foreground">
                      {service.href ? (
                        <NextLink
                          href={service.href}
                          className="underline hover:text-success-600"
                        >
                          {service.title}
                        </NextLink>
                      ) : (
                        service.title
                      )}
                      :
                    </span>{' '}
                    {service.description}
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-8 mt-6 md:mt-10">
              <section className="space-y-3">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  Kácení stromů z plošiny Vimperk
                </h3>
                <p className="text-base md:text-lg text-default-600 leading-relaxed">
                  Pokud je ke stromu dobrý přístup pro techniku, je kácení nebo
                  prořez stromů z plošiny často nejrychlejší a nejbezpečnější
                  postup. Hodí se zejména pro suché a nestabilní stromy, na
                  které nelze bezpečně vylézt, a pro rozsáhlejší redukce korun
                  podél cest a u budov.
                </p>
                <p className="text-base md:text-lg text-default-600 leading-relaxed">
                  Tam, kde se plošina ke stromu nedostane — na zahradách, ve
                  svazích nebo ve stísněné zástavbě — kácíme a prořezáváme
                  stromolezecky, po částech a se spouštěním dřeva na laně.
                  Vhodný postup vždy navrhneme po prohlídce stromu na místě.
                </p>
              </section>
              <section className="space-y-3">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  Kde působíme
                </h3>
                <p className="text-base md:text-lg text-default-600 leading-relaxed">
                  Kácení a prořez stromů zajišťujeme ve Vimperku a širokém okolí
                  — Stachy, Zdíkov, Vacov, Čkyně, Lčovice, Volyně, Vlachovo
                  Březí, Prachatice, Volary nebo Horní Vltavice. Po domluvě
                  vyjíždíme i dále po Šumavě a jižních Čechách.
                </p>
              </section>
            </div>
            <p className="block mt-6 md:mt-10 font-bold text-base md:text-xl text-foreground">
              Chcete pokácet nebo prořezat strom? Ozvěte se nám — strom
              prohlédneme, poradíme s povolením kácení a připravíme nezávaznou
              nabídku.
            </p>
            <div className="clear-both flex flex-col items-center mt-8 mb-4">
              <NextLink
                href="/kontakt"
                className="bg-emerald-700 hover:bg-emerald-800 text-white! hover:text-white! font-bold text-base md:text-lg px-6 md:px-10 py-3 md:py-4 rounded-full transition-colors"
              >
                Nezávazná poptávka
              </NextLink>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-6 md:mt-10">
              <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-6">
                Ukázky naší práce na Šumavě
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
                        <p className="text-sm text-default-500">
                          {realization.location}
                        </p>
                        <p className="text-base font-semibold text-foreground">
                          {realization.title}
                        </p>
                      </div>
                    </div>
                  </NextLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </StyledContainer>
    </>
  );
}
