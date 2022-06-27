import { useState, useEffect } from 'react';
import {
  Container,
  Image,
  Link,
  Row,
  Col,
  Spacer,
  styled,
} from '@nextui-org/react';
import Hamburger from 'hamburger-react';

import { StyledNavBar, StyledMobileNavBar } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useIsMobile } from '../hooks/use-media-query';
import MobileMenu from '../components/MobileMenu';

const navItems = [
  { label: 'Služby', href: 'sluzby.html' },
  { label: 'O nás', href: 'o-nas.html' },
  { label: 'Kontakt', href: 'kontakt.html' },
];

const StyledIcon = styled(FontAwesomeIcon, {
  marginRight: '$2',
  width: '$9',
  height: '$9',
});

const IconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

const HamburgerContainer = styled('div', {
  zIndex: '$max',
});

const NavBar = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <StyledMobileNavBar>
          {isExpanded && (
            <MobileMenu navItems={navItems} onExpand={setIsExpanded} />
          )}
          <Link href="/">
            <Image
              src="images/arbovert-logo.svg"
              width={220}
              css={{ '&:hover': { cursor: 'pointer' } }}
              containerCss={{ m: '$6' }}
              alt="green logo arbovert"
            />
          </Link>
          <HamburgerContainer>
            <Hamburger toggled={isExpanded} toggle={setIsExpanded} />
          </HamburgerContainer>
        </StyledMobileNavBar>
      ) : (
        <StyledNavBar showBlur detached>
          <Container
            sm
            as="nav"
            display="flex"
            wrap="nowrap"
            alignItems="center"
          >
            <Link href="/">
              <Image
                src="images/arbovert-logo.svg"
                width={220}
                css={{ '&:hover': { cursor: 'pointer' } }}
                alt="green logo arbovert"
              />
            </Link>
            <Col>
              <Row justify="flex-end">
                {navItems.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    css={{
                      ml: '$6',
                      color: '$green800',
                    }}
                  >
                    {label}
                  </Link>
                ))}
                <Spacer x={1} y={0} />
                <IconContainer>
                  <Link
                    href="https://www.facebook.com/arbovertcz/"
                    target="_blank"
                    css={{
                      color: '$blue600',
                      fs: '1.2rem',
                    }}
                  >
                    <StyledIcon icon={faFacebook} title="facebook" />
                  </Link>
                  <Link
                    href="tel:+420739969933"
                    css={{
                      marginLeft: '$5',
                      color: '$green800',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <StyledIcon icon={faPhone} title="telefon" /> +420 739 969
                    933
                  </Link>
                </IconContainer>
              </Row>
            </Col>
          </Container>
        </StyledNavBar>
      )}
    </>
  );
};

export default NavBar;
