import { Container, Image, Grid, Text, Link, styled } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/index';
import data from '../data/arbo';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const StyledIcon = styled(FontAwesomeIcon, {
  width: '$10',
  height: '$10',
  ml: '$3',
});

const Service = () => (
  <>
    <NextSeo
      title="Služby - Rizikové kácení, ošetřování stromů, inventarizace dřevin | Arbovert"
      description="Kompletní arboristické služby: rizikové kácení, ošetřování stromů, inventarizace dřevin, výsadby, údržba zahrad, řez ovocných dřevin a výškové práce."
      canonical="https://www.arbovert.cz/sluzby"
      openGraph={{
        title: "Služby - Rizikové kácení, ošetřování stromů, inventarizace dřevin | Arbovert",
        description: "Kompletní arboristické služby: rizikové kácení, ošetřování stromů, inventarizace dřevin, výsadby, údržba zahrad, řez ovocných dřevin a výškové práce.",
        url: "https://www.arbovert.cz/sluzby",
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
          <Link href="/inventarizace-drevin.html">
            <Grid.Container
              gap={2}
              css={{ mb: '$10', bc: '#fff', borderRadius: '$lg' }}
            >
              <Grid sm={7} direction="column">
                <Text h3>Inventarizace dřevin</Text>
                <Text>
                  Při inventarizaci dřevin analyzujeme informace o stromovém
                  porostu na různých místech, nejen v lesích, ale i v městských
                  parcích a jiných zelených plochách. Což je zásadní pro
                  udržitelné využívání dřevní hmoty a ochranu přírody.
                </Text>
              </Grid>

              <Grid sm={5}>
                <Image src="images/service/strom-cropped.jpg" alt="tree" />
              </Grid>
            </Grid.Container>
          </Link>
          {data.map(({ title, description, imageSrc }) => (
            <Grid.Container
              key={title}
              gap={2}
              css={{ mb: '$10', bc: '#fff', borderRadius: '$lg' }}
            >
              <Grid sm={7} direction="column">
                <Text h3>{title}</Text>
                <Text>{description}</Text>
              </Grid>
              <Grid sm={5}>
                <Image src={imageSrc} alt={title} />
              </Grid>
            </Grid.Container>
          ))}
          <Grid.Container
            key="upwork"
            gap={2}
            css={{ mb: '$10', bc: '#fff', borderRadius: '$lg' }}
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
                  mt: '$5',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: 500,
                }}
              >
                Více <StyledIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </Grid>
            <Grid sm={5}>
              <Link href="https://vyskoveprace-arbovert.cz/" target="_blank">
                <Image src="images/service/vysky.webp" alt="vyskove prace" />
              </Link>
            </Grid>
          </Grid.Container>
        </Container>
      </StyledContainer>
    </Layout>
  </>
);

export default Service;
