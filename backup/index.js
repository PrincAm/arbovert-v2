import { Anchor, Box, Heading, Grommet, Main } from 'grommet';
import { grommet } from 'grommet/themes';
import styled from 'styled-components';
import Image from 'next/image';
import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Link,
} from '@nextui-org/react';

import Header from './src/components/Header';
// import Footer from '../components/Footer';
// import route from '../assets/pictures/route.jpg';
// import etw from '../assets/pictures/etw.png';

// import mnisek from '../assets/logos/mnisek.png';
// import ttp from '../assets/logos/ttp-logo.png';
// import povodi from '../assets/logos/povodni.png';
// import vsem from '../assets/logos/vsem.png';
// import lisno from '../assets/logos/lisno.png';
// import vimperk from '../assets/logos/vimperk.png';

// const Welcome = styled.div`
//   min-height: 50vh;
//   background-image: url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3871&q=80');
// `;

export default function Home() {
  return (
    <div>
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
      <Main pad={{ vertical: 'large' }} gap="xlarge">
        <Box
          justify="center"
          direction="row-responsive"
          gap="large"
          margin={{ horizontal: 'auto' }}
          width={{ max: 'xlarge' }}
        >
          <Box width={{ max: '50%' }}>
            <Anchor href="arboristika">
              <Heading>Arboristika</Heading>
            </Anchor>
            <Text size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
          <Box>
            <Image src={route} width={400} height={400} />
          </Box>
        </Box>
        <Box
          justify="center"
          direction="row-responsive"
          gap="medium"
          margin={{ horizontal: 'auto' }}
          width={{ max: 'xlarge' }}
        >
          <Image width={400} height={400} src={route} />
          <Box width={{ max: '50%' }}>
            <Anchor href="vyskove-prace">
              <Heading>Vyskove prace</Heading>
            </Anchor>
            <Text size="large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
        </Box>
        <Box align="center" style={{ backgroundColor: '#f5f5f5' }} pad="medium">
          <Heading level={2}>Jsme drziteli evropske certifikace</Heading>
          <Anchor
            href="https://www.eac-arboriculture.com/eac-intro.aspx"
            target="_blank"
          >
            <Image src={etw} />
          </Anchor>
        </Box>
        <Box align="center">
          <Heading level={2}>Spokojeni zakazanici</Heading>
          <Box
            direction="row"
            alignContent="center"
            style={{ height: '150px' }}
            gap="large"
          >
            <Image src={vsem} />
            <Image src={vimperk} />
            <Image src={povodi} />
            <Image src={ttp} />
            <Image src={lisno} />
            <Image src={mnisek} />
          </Box>
        </Box>
        <Box
          align="center"
          alignContent="center"
          justify="center"
          border={{ color: 'brand', size: 'large' }}
          gap="medium"
          pad="medium"
          responsive={true}
          margin={{ horizontal: 'auto' }}
          width={{ max: 'xlarge' }}
        >
          <Text size="xxlarge" textAlign="center">
            Potrebujete se poradit, nezavazne probrat zakazku, zavolejte nam
            nebo poslete zpravu
          </Text>
          <Button primary label="Kontakt" href="kontakt" size="large" />
        </Box>
      </Main>

      <Footer />
    </div>
  );
};
