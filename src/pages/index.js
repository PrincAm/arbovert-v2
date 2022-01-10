import Head from 'next/head';
import { Box, Heading, Paragraph, Grommet, Main } from 'grommet';
import styled from 'styled-components';

import { customTheme } from '../theme/theme';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Welcome = styled.div`
  min-height: calc(100vh - 90px);
  background-image: url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3871&q=80');
`;

const Home = () => {
  return (
    <Grommet theme={customTheme}>
      <style jsx global>
        {`
          body {
            margin: 0;
          }
        `}
      </style>
      <Head>
        <title>Arbovert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Welcome>
        <Box margin={{ horizontal: 'auto' }} width={{ max: 'xlarge' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus.
          Etiam dictum tincidunt diam. Nullam at arcu a est sollicitudin
          euismod. Duis ante orci, molestie vitae vehicula Lorem ipsum dolor sit
          amet, consectetuer adipiscing elit. Duis risus. Etiam dictum tincidunt
          diam. Nullam at arcu a est sollicitudin euismod. Duis ante orci,
          molestie vitae vehicula Lorem ipsum dolor sit amet, consectetuer
          adipiscing elit. Duis risus. Etiam dictum tincidunt diam. Nullam at
          arcu a est sollicitudin euismod. Duis ante orci, molestie vitae
          vehicula Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          Duis risus. Etiam dictum tincidunt diam. Nullam at arcu a est
          sollicitudin euismod. Duis ante orci, molestie vitae vehicula Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Etiam
          dictum tincidunt diam. Nullam at arcu a est sollicitudin euismod. Duis
          ante orci, molestie vitae vehicula Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit. Duis risus. Etiam dictum tincidunt diam.
          Nullam at arcu a est sollicitudin euismod. Duis ante orci, molestie
          vitae vehicula Lorem ipsum dolor sit amet, consectetuer adipiscing
          elit. Duis risus. Etiam dictum tincidunt diam. Nullam at arcu a est
          sollicitudin euismod. Duis ante orci, molestie vitae vehicula Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Etiam
          dictum tincidunt diam. Nullam at arcu a est sollicitudin euismod. Duis
          ante orci, molestie vitae vehicula Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit. Duis risus. Etiam dictum tincidunt diam.
          Nullam at arcu a est sollicitudin euismod. Duis ante orci, molestie
          vitae vehicula Lorem ipsum dolor sit amet, consectetuer adipiscing
          elit. Duis risus. Etiam dictum tincidunt diam. Nullam at arcu a est
          sollicitudin euismod. Duis ante orci, molestie vitae vehicula Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Etiam
          dictum tincidunt diam. Nullam at arcu a est sollicitudin euismod. Duis
          ante orci, molestie vitae vehicula Lorem ipsum dolor sit amet,
          consectetuer adipiscing elit. Duis risus. Etiam dictum tincidunt diam.
          Nullam at arcu a est sollicitudin euismod. Duis ante orci, molestie
          vitae vehicula
        </Box>
      </Welcome>
      <Main
        pad="small"
        margin={{ horizontal: 'auto' }}
        width={{ max: 'xlarge' }}
      >
        <Box flex role="main" pad={{ vertical: 'large' }}>
          <Heading>Arbovert.cz</Heading>
          <Paragraph fill>Arboristika a vyskove prace</Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis
            risus. Etiam dictum tincidunt diam. Nullam at arcu a est
            sollicitudin euismod. Duis ante orci, molestie vitae vehicula
            venenatis, tincidunt ac pede. Praesent dapibus. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Phasellus faucibus molestie nisl. Sed ac
            dolor sit amet purus malesuada congue. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Nulla accumsan, elit sit amet varius semper,
            nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Etiam dictum tincidunt diam. Nunc
            auctor. Quis autem vel eum iure reprehenderit qui in ea voluptate
            velit esse quam nihil molestiae consequatur, vel illum qui dolorem
            eum fugiat quo voluptas nulla pariatur? Morbi scelerisque luctus
            velit. Nulla accumsan, elit sit amet varius semper, nulla mauris
            mollis quam, tempor suscipit diam nulla vel leo. In convallis.
            Praesent in mauris eu tortor porttitor accumsan. Curabitur vitae
            diam non enim vestibulum interdum. Pellentesque ipsum. Sed ut
            perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Suspendisse nisl. Nam quis nulla. Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur? Aliquam in lorem sit amet leo accumsan lacinia. Praesent
            dapibus. Pellentesque sapien. Praesent in mauris eu tortor porttitor
            accumsan. Nullam eget nisl. Maecenas ipsum velit, consectetuer eu
            lobortis ut, dictum at dui. Duis sapien nunc, commodo et, interdum
            suscipit, sollicitudin et, dolor. Nulla pulvinar eleifend sem. Nam
            libero tempore, cum soluta nobis est eligendi optio cumque nihil
            impedit quo minus id quod maxime placeat facere possimus, omnis
            voluptas assumenda est, omnis dolor repellendus. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Aenean vel massa quis mauris vehicula
            lacinia. Nullam lectus justo, vulputate eget mollis sed, tempor sed
            magna. Fusce nibh. Proin mattis lacinia justo. Nulla non arcu
            lacinia neque faucibus fringilla. Mauris elementum mauris vitae
            tortor. Etiam egestas wisi a erat. Maecenas ipsum velit,
            consectetuer eu lobortis ut, dictum at dui. Vivamus porttitor turpis
            ac leo. Suspendisse sagittis ultrices augue. Donec quis nibh at
            felis congue commodo. Nulla quis diam. Aliquam ornare wisi eu metus.
            Nullam rhoncus aliquam metus. Phasellus et lorem id felis nonummy
            placerat. Vestibulum fermentum tortor id mi. Mauris elementum mauris
            vitae tortor. Etiam ligula pede, sagittis quis, interdum ultricies,
            scelerisque eu. Mauris suscipit, ligula sit amet pharetra semper,
            nibh ante cursus purus, vel sagittis velit mauris vel metus. Integer
            vulputate sem a nibh rutrum consequat. Aenean placerat. Maecenas
            lorem. Curabitur bibendum justo non orci. Duis sapien nunc, commodo
            et, interdum suscipit, sollicitudin et, dolor. Mauris metus. Fusce
            suscipit libero eget elit. Sed convallis magna eu sem. Etiam quis
            quam. Phasellus enim erat, vestibulum vel, aliquam a, posuere eu,
            velit. Nullam rhoncus aliquam metus. Nulla accumsan, elit sit amet
            varius semper, nulla mauris mollis quam, tempor suscipit diam nulla
            vel leo. Fusce nibh. Aliquam erat volutpat. Et harum quidem rerum
            facilis est et expedita distinctio. Sed elit dui, pellentesque a,
            faucibus vel, interdum nec, diam. Sed ac dolor sit amet purus
            malesuada congue. Nam quis nulla. Donec vitae arcu.
          </Paragraph>
        </Box>
      </Main>

      <Footer />
    </Grommet>
  );
};

export default Home;
