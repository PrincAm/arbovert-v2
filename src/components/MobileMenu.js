import { Link, styled, Text } from '@nextui-org/react';
import PropTypes from 'prop-types';
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

const StyledIcon = styled(FontAwesomeIcon, {
  width: '$12',
  height: '$12',
});

const MobileMenu = ({ navItems, onExpand }) => {
  useLockBodyScroll();

  return (
    <Container>
      <Link
        href="/"
        key="home"
        css={{
          mt: '$13',
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
      {navItems.map(({ href, label, target }) => (
        <Link
          href={href}
          key={label}
          target={target && target}
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
      ))}
      <Link
        href="tel:+420739969933"
        css={{
          display: 'flex',
          alignItems: 'center',
          color: '$black',
          mt: '$5',
        }}
      >
        <StyledIcon
          icon={faPhone}
          css={{
            ml: '$10',
            mr: '$5',
          }}
        />
        <Text
          h2
          css={{
            mt: 0,
          }}
        >
          +420 739 969 933
        </Text>
      </Link>
    </Container>
  );
};

export default MobileMenu;

MobileMenu.propType = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,
  onExpand: PropTypes.func.isRequired,
};
