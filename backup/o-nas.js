import { Box, Heading, Text } from 'grommet';
import styled from 'styled-components';
import Image from 'next/image';

import Layout from './src/components/Layout';
import aboutUs from '../public/images/aboutUs.jpg';

const ImageBox = styled(Box)`
  max-width: 40%;
`;

const AboutUs = () => (
  <Layout>
    <Heading>Arbovert</Heading>
    <Box
      background="white"
      direction="row"
      pad="medium"
      gap="medium"
      margin={{ bottom: 'medium' }}
    >
      <Text size="large">
        Náš Arbovert se již od roku 2013 zabývá arboristikou, kompletní péčí o
        dřeviny a výškovými pracemi všeho druhu. Pokud Vás tíží nebezpečně
        přerostlé stromy, opadávající omítka, dotěrní holubi nebo strom trefený
        bleskem, zavolejte a my s vámi váš problém rádi probereme. Klidně se na
        nás obraťte, i když se jedná o havarijní situace v nepopulární čas. Snad
        ani nemusíme zmiňovat, že nezávazné nacenění práce je samozřejmostí.
        Zakládáme si na odbornosti našich lidí a naším cílem je se zdokonalovat
        a zlepšovat v pracích, u kterých ostatní tápají.
      </Text>
      <ImageBox fill>
        <Image src={aboutUs} />
      </ImageBox>
    </Box>
  </Layout>
);

export default AboutUs;
