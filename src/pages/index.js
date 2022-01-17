import Head from 'next/head';
import { Anchor, Box, Heading, Text, Grommet, Main, Image } from 'grommet';
import { grommet } from 'grommet/themes';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Welcome = styled.div`
  min-height: 50vh;
  background-image: url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3871&q=80');
`;

const Home = () => {
  return (
    <Grommet theme={grommet}>
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
      <Head>
        <title>Arbovert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Welcome>
        <Box
          margin={{ horizontal: 'auto' }}
          width={{ max: 'xlarge' }}
          justify="center"
          align="center"
        >
          <Heading color="accent-1">Arboristika</Heading>
          <Text color="accent-1" size="xxlarge">
            Zabyvame se pracemi ve vyskach{' '}
          </Text>
        </Box>
      </Welcome>
      <Main
        pad="small"
        margin={{ horizontal: 'auto' }}
        width={{ max: 'xlarge' }}
      >
        <Box flex role="main" pad={{ vertical: 'large' }} gap="xlarge">
          <Box justify="center" direction="row-responsive" gap="medium">
            <Box>
              <Anchor href="arboristika">
                <Heading>Arboristika</Heading>
              </Anchor>
              <Text size="large">Arboristika</Text>
            </Box>
            <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
          </Box>
          <Box justify="center" direction="row-responsive" gap="medium">
            <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
            <Box>
              <Anchor href="vyskove-prace">
                <Heading>Vyskove prace</Heading>
              </Anchor>
              <Text size="large">Vyskove prace</Text>
            </Box>
          </Box>
        </Box>
      </Main>

      <Footer />
    </Grommet>
  );
};

export default Home;
