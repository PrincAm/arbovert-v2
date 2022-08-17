import { Container, Image, Grid, Text, Link, styled } from '@nextui-org/react';
import { NextSeo } from 'next-seo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

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
      title="Naše služby | Arbovert"
      description="Zabýváme se kompletní čiností v arboristice, jako je rizikové kácení stromů, odborné ošetřování stromů,
                   zajišťovaní stromů, prořezávání ovocných stromů, likvidace dřevní hmoty, výsadba stromů a povýsadbová péče"
      canonical="https://www.arbovert.cz/sluzby.html"
    />

    <Layout>
      <StyledContainer>
        <Container sm>
          <Text h1 css={{ mt: '$5', mb: '$5' }}>
            Služby
          </Text>
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
