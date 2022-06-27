import { Container, Image, Grid, Text, styled } from '@nextui-org/react';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/index';
import data from '../data/arbo';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
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
        </Container>
      </StyledContainer>
    </Layout>
  </>
);

export default Service;
