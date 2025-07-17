import {
  Container,
  Image,
  Grid,
  Text,
  styled,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';

import Layout from '../../layouts/index';
import data from '../../data/arbo';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const StyledItem = styled('li', {
  marginBottom: 0,
});

// Function to generate slug from title (same as in sluzby.js)
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Service content mapping
const serviceContent = {
  'rizikove-kaceni-stromu': {
    title: 'Rizikové kácení stromů',
    description: 'Profesionální rizikové kácení stromů v obtížně přístupných místech.',
    longDescription: 'Naší činností je odborné kácení stromů v místech kam se nedostane technika, je potřeba strom pokácet a při tom nepoškodit místo. Zabýváme se rizikovým kácením a postupným kácením bez možnosti dopadu částí dřeva na zem.',
    imageSrc: '/images/service/kaceni.jpg',
    benefits: [
      { title: 'Obtížně přístupná místa', description: 'Kde se nedostane technika nebo je omezený prostor.' },
      { title: 'Citlivé prostředí', description: 'Když je potřeba strom pokácet bez poškození okolí.' },
      { title: 'Kontrolované kácení', description: 'Postupné kácení bez možnosti dopadu částí dřeva na zem.' },
      { title: 'Bezpečnostní rizika', description: 'Stromy ohrožující majetek nebo zdraví osob.' },
    ],
    ctaText: 'Chci rizikové kácení stromů',
    question: 'Potřebujete profesionální pomoc s rizikovým kácením?',
    seoTitle: 'Rizikové kácení stromů - Profesionální arboristické služby | Arbovert',
    seoDescription: 'Odborné rizikové kácení stromů v obtížně přístupných místech. Postupné kácení bez možnosti dopadu částí dřeva na zem. Profesionální arboristické služby.',
  },
  'odborne-osetrovani-stromu': {
    title: 'Odborné ošetřování stromů',
    description: 'Komplexní ošetřování stromů pro jejich zdraví a bezpečnost.',
    longDescription: 'Mezi odborné ošetření stromů nepatří jen odstranění suchých větví ze stromu ale i zdravotní řezy stromů, obvodové redukce a lokální redukce stromů. Stabilizace sekundárních korun a samozřejmě výchovné řezy na mladých stromech po výsadbách.',
    imageSrc: '/images/service/osetreni.jpg',
    benefits: [
      { title: 'Zdravotní řezy', description: 'Odstranění suchých, nemocných a poškozených větví.' },
      { title: 'Obvodové redukce', description: 'Zmenšení koruny pro lepší stabilitu stromu.' },
      { title: 'Lokální redukce', description: 'Cílené zmenšení problematických částí koruny.' },
      { title: 'Stabilizace korun', description: 'Zajištění bezpečnosti stromů s rizikovým větvením.' },
      { title: 'Výchovné řezy', description: 'Správný vývoj mladých stromů po výsadbách.' },
    ],
    ctaText: 'Chci ošetřování stromů',
    question: 'Máte stromy, které potřebují odborné ošetření?',
    seoTitle: 'Odborné ošetřování stromů - Profesionální arboristické služby | Arbovert',
    seoDescription: 'Komplexní ošetřování stromů: zdravotní řezy, obvodové redukce, stabilizace korun a výchovné řezy. Profesionální arboristické služby.',
  },
  'zajistovani-stromu': {
    title: 'Zajišťování stromů',
    description: 'Profesionální zajišťování stromů pomocí dynamických vazeb.',
    longDescription: 'Dynamické vazby instalujeme vždy na stromy s problémovým větvením, které může ohrozit majetek, nebo zdraví občanů v jeho blízkosti. Instalujeme lana s nosností 2, 4 nebo 8 tun. Zajišťujeme i asanaci pozemků, například před stavbou, výřezy náletových dřevin, těžbu stromů a likvidaci dřevní hmoty.',
    imageSrc: '/images/service/zajisteni.jpg',
    benefits: [
      { title: 'Dynamické vazby', description: 'Instalace lan s nosností 2, 4 nebo 8 tun.' },
      { title: 'Stabilizace stromů', description: 'Zajištění bezpečnosti problematických stromů.' },
      { title: 'Asanace pozemků', description: 'Příprava pozemků před stavbou.' },
      { title: 'Výřezy náletových dřevin', description: 'Odstranění nežádoucího porostu.' },
      { title: 'Kompletní zahradnické práce', description: 'Údržba a správa zeleně včetně biokoridorů.' },
    ],
    ctaText: 'Chci zajišťování stromů',
    question: 'Potřebujete zajištění problematických stromů?',
    seoTitle: 'Zajišťování stromů - Dynamické vazby a stabilizace | Arbovert',
    seoDescription: 'Instalace dynamických vazeb pro stromy s problémovým větvením. Lana s nosností 2, 4 nebo 8 tun. Kompletní zahradnické práce a údržba zeleně.',
  },
  'prorezavani-ovocnych-stromu': {
    title: 'Prořezávání ovocných stromů',
    description: 'Odborné ošetřování ovocných stromů pro zdravý růst a plodnost.',
    longDescription: 'Další činností je i odborné ošetřování ovocných stromů, pod které spadá jak povýsadbová péče se zakládacím a udržovacím řezem. Tak i údržba starých a neošetřovaných stromů v parcích, alejích a stromořadích.',
    imageSrc: '/images/service/ovocne.jpg',
    benefits: [
      { title: 'Povýsadbová péče', description: 'Správné založení mladých ovocných stromů.' },
      { title: 'Zakládací řez', description: 'Vytvoření správné struktury koruny.' },
      { title: 'Udržovací řez', description: 'Pravidelná údržba pro zdravý růst.' },
      { title: 'Údržba starých stromů', description: 'Oživení a zlepšení plodnosti starých stromů.' },
      { title: 'Péče o aleje a stromořadí', description: 'Údržba ovocných stromů v parcích.' },
    ],
    ctaText: 'Chci prořezávání ovocných stromů',
    question: 'Chcete zlepšit úrodu vašich ovocných stromů?',
    seoTitle: 'Prořezávání ovocných stromů - Odborné ošetřování | Arbovert',
    seoDescription: 'Odborné ošetřování ovocných stromů: povýsadbová péče, zakládací a udržovací řez, údržba starých stromů v parcích a alejích.',
  },
  'likvidace-drevni-hmoty': {
    title: 'Likvidace dřevní hmoty',
    description: 'Kompletní likvidace dřevní hmoty a zpracování dřeva.',
    longDescription: 'Zařizujeme likvidace dřeva, frézování pařezů po pokácení stromů, včetně štěpkování dřevní hmoty a větví. Profesionální zpracování a likvidace všech druhů dřevního odpadu.',
    imageSrc: '/images/service/frezovani.jpg',
    benefits: [
      { title: 'Frézování pařezů', description: 'Kompletní odstranění pařezů po pokácení stromů.' },
      { title: 'Štěpkování větví', description: 'Rozdrcení větví na mulčovací materiál.' },
      { title: 'Likvidace dřevní hmoty', description: 'Zpracování a odvoz dřevního odpadu.' },
      { title: 'Kompletní úklid', description: 'Zanechání čistého pozemku po práci.' },
      { title: 'Ekologické zpracování', description: 'Šetrné zpracování dřevní hmoty.' },
    ],
    ctaText: 'Chci likvidaci dřevní hmoty',
    question: 'Potřebujete kompletní úklid po kácení stromů?',
    seoTitle: 'Likvidace dřevní hmoty - Frézování pařezů a štěpkování | Arbovert',
    seoDescription: 'Kompletní likvidace dřevní hmoty: frézování pařezů po pokácení stromů, štěpkování větví a dřevní hmoty. Profesionální zpracování dřeva.',
  },
  'vysadba-stromu-a-povysadbova-pece': {
    title: 'Výsadba stromů a povýsadbová péče',
    description: 'Profesionální výsadba stromů a dlouhodobá povýsadbová péče.',
    longDescription: 'Zabýváme se výsadbou stromů, které realizujeme jak pro města a obce, tak i pro soukromé osoby na zahradách. K výsadbovým pracím neodmyslitelně patří i povýsadbová péče, kterou poskytujeme po několik let.',
    imageSrc: '/images/service/vysadba.jpg',
    benefits: [
      { title: 'Výsadba stromů', description: 'Profesionální výsadba pro města, obce i soukromé osoby.' },
      { title: 'Povýsadbová péče', description: 'Dlouhodobá péče po několik let po výsadbě.' },
      { title: 'Výběr stromů', description: 'Doporučení vhodných druhů pro dané prostředí.' },
      { title: 'Příprava stanoviště', description: 'Správná příprava půdy a místa pro výsadbu.' },
      { title: 'Zavlažování a hnojení', description: 'Zajištění správného růstu nově vysazených stromů.' },
    ],
    ctaText: 'Chci výsadbu stromů',
    question: 'Chcete vysadit nové stromy na vašem pozemku?',
    seoTitle: 'Výsadba stromů a povýsadbová péče - Profesionální arboristické služby | Arbovert',
    seoDescription: 'Výsadba stromů pro města, obce i soukromé osoby. Povýsadbová péče po několik let. Profesionální arboristické služby výsadby a údržby.',
  },
  'inventarizace-drevin': {
    title: 'Inventarizace dřevin',
    description: 'Komplexní analýza stromového porostu pro udržitelné hospodaření a ochranu přírody.',
    longDescription: 'Zanalyzujeme vaše stromy, abyste z nich měli maximum. Uděláme evidenci vašich stromů, a to komplexně. Můžete tak efektivně a udržitelně využívat zdroje dřeva. Při inventarizaci dřevin analyzujeme informace o stromovém porostu na různých místech, nejen v lesích, ale i v městských parcích a jiných zelených plochách. Což je zásadní pro udržitelné využívání dřevní hmoty a ochranu přírody.',
    imageSrc: '/images/strom.jpg',
    benefits: [
      { title: 'Udržitelné hospodaření', description: 'Zajišťuje, že těžba probíhá v souladu s obnovou porostů.' },
      { title: 'Ochrana přírody', description: 'Chrání vzácné a ohrožené druhy dřevin.' },
      { title: 'Ekonomická efektivita', description: 'Optimalizuje těžbu a zpracování dřeva.' },
      { title: 'Plánování a prevence', description: 'Pomáhá předcházet škodám způsobeným požáry a škůdci.' },
    ],
    ctaText: 'Chci inventarizaci dřevin',
    question: 'Potřebujete inventarizaci vašich stromů?',
    seoTitle: 'Inventarizace dřevin - Komplexní analýza stromového porostu | Arbovert',
    seoDescription: 'Profesionální inventarizace dřevin pro udržitelné hospodaření. Analyzujeme stromový porost v lesích, parcích a městských zelených plochách. Zajistíme efektivní využití dřevní hmoty.',
  },
};

// Generate static paths for all services
export async function getStaticPaths() {
  const paths = Object.keys(serviceContent).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for any paths not returned by getStaticPaths
  };
}

// Generate static props for each service
export async function getStaticProps({ params }) {
  const { slug } = params;
  const service = serviceContent[slug];

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
      slug,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

const ServicePage = ({ service, slug }) => {
  const router = useRouter();

  useEffect(() => {
    // Client-side only logic
    console.log('Component mounted on client side');
  }, []);

  const handleButtonClick = () => {
    router.push('/kontakt.html');
  };

  // If the page is not yet generated, this will be displayed
  // until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout>
        <StyledContainer>
          <Container sm>
            <Text h1 css={{ mt: '$5', mb: '$5' }}>
              Načítání...
            </Text>
          </Container>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <>
      <NextSeo
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={`https://arbovert.cz/sluzby/${slug}.html`}
        openGraph={{
          title: service.seoTitle,
          description: service.seoDescription,
          url: `https://arbovert.cz/sluzby/${slug}.html`,
          images: [
            {
              url: `https://arbovert.cz/${service.imageSrc}`,
              width: 800,
              height: 600,
              alt: service.title,
            },
          ],
        }}
      />
      <Layout>
        <StyledContainer>
          <Container sm>
            <Text h1 css={{ mt: '$5', mb: '$5' }}>
              {service.title}
            </Text>
            <Grid.Container
              gap={2}
              css={{ mb: '$10', bc: 'white', borderRadius: '$lg' }}
            >
              <Grid sm={7} direction="column">
                <Text h2>Arbovert</Text>
                <Text>
                  <p>
                    <b>{service.description}</b>
                  </p>
                  <p>
                    <b>{service.longDescription}</b>
                  </p>
                  <b>Jaké služby nabízíme?</b>
                  <br />
                  <ol>
                    {service.benefits.map((benefit, index) => (
                      <StyledItem key={index}>
                        <b>{benefit.title}:</b> {benefit.description}
                      </StyledItem>
                    ))}
                  </ol>
                  <b>{service.question}</b>
                </Text>
              </Grid>
              <Grid sm={5}>
                <Image src={service.imageSrc} alt={service.title} />
              </Grid>
              <Grid sm={12}>
                <Container
                  sm
                  display="flex"
                  direction="column"
                  alignItems="center"
                  align="center"
                  css={{ mt: '$5', mb: '$5' }}
                >
                  <Button
                    size="lg"
                    shadow
                    color="gradient"
                    rounded
                    auto
                    onClick={handleButtonClick}
                  >
                    {service.ctaText}
                  </Button>
                </Container>
              </Grid>
            </Grid.Container>
          </Container>
        </StyledContainer>
      </Layout>
    </>
  );
};

export default ServicePage; 