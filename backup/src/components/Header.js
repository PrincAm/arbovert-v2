import { Link, Grid, styled, Text } from '@nextui-org/react';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import Head from 'next/head';

const navItems = [
  { label: 'Arboristika', href: 'arboristika' },
  { label: 'Vyskove prace', href: 'vyskove-prace' },
  { label: 'O nas', href: 'o-nas' },
  { label: 'Kontakt', href: 'kontakt' },
];

const HeaderContainer = styled('div', {
  position: 'sticky',
  top: 0,
  background: 'rgba(255, 255, 255, 0.7)',
  zIndex: 1,
});

const Header = () => {
  return (
    <HeaderContainer>
      <Head>
        <title>Arbovert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text
        css={{
          color: '$blue800',
          fontSize: '$tiny',
          padding: '$2 $4',
        }}
      >
        Using tokens
      </Text>
      <Grid.Container
        justify="space-between"
        css={{ height: '$10' }}
        alignItems="center"
      >
        <Grid md={3}>
          <NextLink href="/">
            <Link css={{ color: '$blue600' }}>Arbovert</Link>
          </NextLink>
        </Grid>
        <Grid md={6} justify="flex-end">
          {navItems.map(({ href, label }) => (
            <NextLink href={href} key={label}>
              <Link css={{ marginLeft: '$2' }}>{label}</Link>
            </NextLink>
          ))}
          <FontAwesomeIcon icon={faPhone} />
          <Link href="tel:+420739969933">+420 739 969 933</Link>
        </Grid>
      </Grid.Container>
    </HeaderContainer>
  );
};

export default Header;
