import { Container, Link, Row, Col, Spacer, styled } from '@nextui-org/react';

import { StyledNavBar } from './styles';
import NextLink from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { label: 'Sluzby', href: 'sluzby' },
  { label: 'O nas', href: 'o-nas' },
  { label: 'Kontakt', href: 'kontakt' },
];

const StyledIcon = styled(FontAwesomeIcon, {
  marginRight: '$2',
});

const NavBar = () => (
  <StyledNavBar showBlur detached>
    <Container sm as="nav" display="flex" wrap="nowrap" alignItems="center">
      <Col>
        <Row>
          <NextLink href="/">
            <Link css={{ color: '$green600' }}>Arbovert</Link>
          </NextLink>
        </Row>
      </Col>
      <Col>
        <Row justify="flex-end">
          {navItems.map(({ href, label }) => (
            <NextLink href={href} key={label}>
              <Link
                css={{
                  ml: '$6',
                  color: '$green600',
                  // TODO active link
                  // '&.active': {
                  //   fontWeight: '600',
                  //   color: '$primary',
                  // },
                }}
              >
                {label}
              </Link>
            </NextLink>
          ))}
          <Spacer x={1} y={0} />
          <Link
            href="tel:+420739969933"
            css={{
              marginLeft: '$5',
              color: '$green600',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <StyledIcon icon={faPhone} /> +420 739 969 933
          </Link>
        </Row>
      </Col>
    </Container>
  </StyledNavBar>
);

export default NavBar;
