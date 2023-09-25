import { styled } from '@nextui-org/react';
import PropTypes from 'prop-types';

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

Layouts.propTypes = {
  children: PropTypes.node.isRequired,
};
