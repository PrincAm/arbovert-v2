import { Container, Image, Grid, Text, Link, styled } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';
import { useCanonicalUrl } from '../hooks/use-canonical-url';

import Layout from '../layouts/index';
import { serviceContent } from '../data/arbo';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const StyledIcon = styled(FontAwesomeIcon, {
  width: '$10',
  height: '$10',
  ml: '$3',
});

const StyledServiceCard = styled(Link, {
  display: 'block',
  textDecoration: 'none',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
  },
});

// Convert serviceContent to array, excluding inventarizace-drevin (handled separately)
const services = Object.entries(serviceContent)
  .filter(([slug]) => slug !== 'inventarizace-drevin')
  .map(([slug, service]) => ({ ...service, slug }));

const Service = () => {
  const canonicalUrl = useCanonicalUrl();
  
  return (
    <>
      <NextSeo
        title="Služby - Rizikové kácení, ošetřování stromů, inventarizace dřevin | Arbovert"
        description="Kompletní arboristické služby: rizikové kácení, ošetřování stromů, inventarizace dřevin, výsadby, údržba zahrad, řez ovocných dřevin a výškové práce."
        canonical={canonicalUrl}
        openGraph={{
          title: "Služby - Rizikové kácení, ošetřování stromů, inventarizace dřevin | Arbovert",
          description: "Kompletní arboristické služby: rizikové kácení, ošetřování stromů, inventarizace dřevin, výsadby, údržba zahrad, řez ovocných dřevin a výškové práce.",
          url: canonicalUrl,
          images: [
            {
              url: "https://arbovert.cz/images/service/strom-cropped.jpg",
              width: 800,
              height: 600,
              alt: "Arboristické služby - stromy",
            },
          ],
        }}
      />
    <Layout>
      <StyledContainer>
        <Container sm>
          <Text h1 css={{ mt: '$5', mb: '$5' }}>
            Služby
          </Text>
          
          {/* Inventarizace dřevin - Special case with existing page */}
          <StyledServiceCard href="/sluzby/inventarizace-drevin">
            <Grid.Container
              gap={2}
              css={{ mb: '$10', bc: '#fff', borderRadius: '$lg', p: '$4' }}
            >
              <Grid sm={7} direction="column">
                <Text h3>Inventarizace dřevin</Text>
                <Text>
                  Při inventarizaci dřevin analyzujeme informace o stromovém
                  porostu na různých místech, nejen v lesích, ale i v městských
                  parcích a jiných zelených plochách. Což je zásadní pro
                  udržitelné využívání dřevní hmoty a ochranu přírody.
                </Text>
                <Text css={{ mt: '$3', color: '$primary', fontWeight: 500 }}>
                  Více informací →
                </Text>
              </Grid>
              <Grid sm={5}>
                <Image src="/images/service/strom-cropped.jpg" alt="Inventarizace dřevin" />
              </Grid>
            </Grid.Container>
          </StyledServiceCard>

          {/* Services from serviceContent */}
          {services.map(({ title, description, imageSrc, slug }) => {
            return (
              <StyledServiceCard key={slug} href={`/sluzby/${slug}`}>
                <Grid.Container
                  gap={2}
                  css={{ mb: '$10', bc: '#fff', borderRadius: '$lg', p: '$4' }}
                >
                  <Grid sm={7} direction="column">
                    <Text h3>{title}</Text>
                    <Text>{description}</Text>
                    <Text css={{ mt: '$3', color: '$primary', fontWeight: 500 }}>
                      Více informací →
                    </Text>
                  </Grid>
                  <Grid sm={5}>
                    <Image src={imageSrc} alt={title} />
                  </Grid>
                </Grid.Container>
              </StyledServiceCard>
            );
          })}

          {/* Výškové práce - External link */}
          <Grid.Container
            key="upwork"
            gap={2}
            css={{ mb: '$10', bc: '#fff', borderRadius: '$lg', p: '$4' }}
          >
            <Grid sm={7} direction="column">
              <Text h3>Výškové práce</Text>
              <Text>
                Máme bohaté zkušenosti i s prací ve výškách. Pokud potřebujete
                čištění a mytí nebo nátěry a opravy fasád, až po opravy střech a
                drobných klempířských prvků, jsou práce z lana ta nejlepší
                varianta.
              </Text>
              <Link
                href="https://vyskoveprace-arbovert.cz/"
                target="_blank"
                css={{
                  mt: '$3',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 500,
                  color: '$primary',
                }}
              >
                Více informací <StyledIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </Grid>
            <Grid sm={5}>
              <Link href="https://vyskoveprace-arbovert.cz/" target="_blank">
                <Image src="/images/service/vysky.webp" alt="Výškové práce" />
              </Link>
            </Grid>
          </Grid.Container>
        </Container>
      </StyledContainer>
    </Layout>
    </>
  );
};

export default Service;
