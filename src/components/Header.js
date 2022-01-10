import {
  Anchor,
  Box,
  Header as HeaderG,
  Nav,
  ResponsiveContext,
} from 'grommet';
import { Phone } from 'grommet-icons';
import styled from 'styled-components';

const navItems = [
  { label: 'Arboristika', href: 'arboristika' },
  { label: 'Vyskove prace', href: 'vyskove-prace' },
  { label: 'O nas', href: 'o-nas' },
  { label: 'Kontakt', href: 'kontakt' },
];

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
`;

const Header = () => (
  <HeaderContainer>
    <Box
      flex
      margin={{ horizontal: 'auto' }}
      width={{ max: 'xlarge' }}
      height={{ min: '100%' }}
    >
      <HeaderG pad="small" height="xsmall">
        <Anchor
          href="https://tools.grommet.io/"
          label="Arbovert"
          size="xxlarge"
        />
        <ResponsiveContext.Consumer>
          {(size) =>
            size === 'small' ? (
              <div>TODO MOBILE MENU</div>
            ) : (
              <Nav direction="row">
                {navItems.map(({ href, label }) => (
                  <Anchor href={href} label={label} key={label} />
                ))}
                <Box direction="row" gap="xsmall">
                  <Phone />
                  <Anchor href="tel:+420739969933">+420 739 969 933</Anchor>
                </Box>
              </Nav>
            )
          }
        </ResponsiveContext.Consumer>
      </HeaderG>
    </Box>
  </HeaderContainer>
);

export default Header;
