import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grommet, Main } from 'grommet';
import { grommet } from 'grommet/themes';
import Header from './Header';
import Footer from './Footer';

const Background = styled.div`
  // TODO replace by theme color
  background-color: #f5f5f5;
`;

const Layout = ({ children }) => (
  <Grommet theme={grommet}>
    <Header />
    <Background>
      <Main
        pad="small"
        margin={{ horizontal: 'auto' }}
        width={{ max: 'xlarge' }}
      >
        {children}
      </Main>
    </Background>
    <Footer />
  </Grommet>
);

export default Layout;

Layout.propTypes = { children: PropTypes.node };
