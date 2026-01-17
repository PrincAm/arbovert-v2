import PropTypes from 'prop-types';

import NavBar from './NavBar';
import Footer from './Footer';

const StyledContainer = ({ children, className = '', ...props }) => (
  <div
    className={`flex flex-col content-between ${className}`}
    {...props}
  >
    {children}
  </div>
);

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
