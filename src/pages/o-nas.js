import { Container, Image, Grid, Text, styled } from '@nextui-org/react';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/index';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const AboutUs = () => (
  <>
    <NextSeo
      title="O nás | Arbovert"
      description="Arboristice se věnujeme déle než 10 let. Naší hlavní činností není jen
                   rizikové kácení a těžba stromů, ale i ošetřování a prořezávání
                   stromů, které rostou na nejrůznějších špatně přístupných místech."
      canonical="https://www.arbovert.cz/o-nas.html"
    />
    <Layout>
      <StyledContainer>
        <Container sm>
          <Text h1 css={{ mt: '$5', mb: '$5' }}>
            O nás
          </Text>
          <Grid.Container
            gap={2}
            css={{ mb: '$10', bc: 'white', borderRadius: '$lg' }}
          >
            <Grid sm={7} direction="column">
              <Text h2>Arbovert</Text>
              <Text>
                Arboristikou se zabýváme již od roku 2011. Jsme tým
                certifikovaných pracovníků. Naší hlavní činností není jen
                rizikové kácení a těžba stromů, ale i ošetřování a prořezávání
                stromů, které rostou na nejrůznějších špatně přístupných
                místech. Součástí naší práce je také ošetřování ovocných stromů
                a údržba zahrad, včetně likvidace dřeva biomasy a dřevní hmoty.
                Arbovert se orientuje na arboristikou, kompletní péči o dřeviny,
                rizikové kácení, instalaci stabilizačních systémů, odborné
                posudky a poradenství. Příroda, stromy a naše práce nás baví a
                inspiruje, proto se stále v oboru vzděláváme a chceme jít
                dopředu, pro 100% odbornost na Vašich stromech a zahradách.
              </Text>
            </Grid>
            <Grid sm={5}>
              <Image src="images/aboutUs.jpg" alt="man in front of tree" />
            </Grid>
          </Grid.Container>
        </Container>
      </StyledContainer>
    </Layout>
  </>
);

export default AboutUs;
