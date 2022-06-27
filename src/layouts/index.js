import { styled } from '@nextui-org/react';
import NavBar from './NavBar';
import Footer from './Footer';

const StyledContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
});

const Layouts = ({ children }) => (
  <>
    <NavBar />
    <StyledContainer as="main">{children}</StyledContainer>
    <Footer />
  </>
);

export default Layouts;
