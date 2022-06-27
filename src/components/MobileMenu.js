import { Image, Link, styled, Text } from '@nextui-org/react';
import NextLink from 'next/link';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useLockBodyScroll from '../hooks/use-lock-body-scroll';

const Container = styled('nav', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100%',
  backgroundColor: '#fff',
  zIndex: '$1',
  padding: '$10 $5 $5 $5',
});

const MobileMenu = ({ navItems, onExpand }) => {
  useLockBodyScroll();

  return (
    <Container>
      <NextLink href="/">
        <Image
          src="images/arbovert-logo.svg"
          width={220}
          css={{ '&:hover': { cursor: 'pointer' }, mb: '$10' }}
          onClick={() => onExpand(false)}
          alt="arbovert green logo"
        />
      </NextLink>
      <NextLink href="/" key="home">
        <Link
          css={{
            ml: '$5',
          }}
          onClick={() => onExpand(false)}
        >
          <Text
            h1
            css={{
              color: '$green800',
            }}
          >
            Domů
          </Text>
        </Link>
      </NextLink>
      {navItems.map(({ href, label }) => (
        <NextLink href={href} key={label}>
          <Link
            css={{
              ml: '$5',
            }}
          >
            <Text
              h1
              css={{
                color: '$green800',
              }}
            >
              {label}
            </Text>
          </Link>
        </NextLink>
      ))}
      <Link
        href="tel:+420739969933"
        css={{
          display: 'flex',
          alignItems: 'center',
          ml: '$5',
          mt: '$5',
        }}
      >
        <Text h2>
          <FontAwesomeIcon
            icon={faPhone}
            css={{
              color: '$green800',
            }}
          />{' '}
          +420 739 969 933
        </Text>
      </Link>
    </Container>
  );
};

export default MobileMenu;
