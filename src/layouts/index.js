import { Container, styled } from '@nextui-org/react';
import NavBar from './NavBar';

const StyledContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
});

const Layouts = ({ children }) => (
  <>
    <NavBar />
    <StyledContainer as="main">{children}</StyledContainer>
  </>
);

export default Layouts;
