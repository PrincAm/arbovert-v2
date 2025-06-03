import { Card, Container, Grid, Text, styled } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Layout from '../layouts/index';
import ContactUs from '../components/ContactUs';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const StyledIcon = styled(FontAwesomeIcon, {
  fs: '2rem',
  mr: '$3',
  color: '$green800',
  width: '$12',
  height: '$12',
});

const ContactPerson = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pt: '$6',
  pb: '$6',
});

const Contact = () => (
  <>
    <Layout>
      <StyledContainer>
        <Container sm>
          <Text h1 css={{ mt: '$5', mb: '$5' }}>
            Kontakt
          </Text>
          <Card shadow={false} css={{ p: '$8', mb: '$10' }}>
            <ContactPerson h3>
              <StyledIcon icon={faUser} />
              Lukáš Kačer
            </ContactPerson>
            <Grid.Container gap={2}>
              <Grid sm={4} direction="column">
                <Text h3>Sídlo firmy</Text>
                <Text css={{ fs: '$sm' }}>
                  Arbovert s.r.o. <br />
                  Pasovská 84/37 <br />
                  Vimperk, 38501
                </Text>
              </Grid>
              <Grid sm={4} direction="column">
                <Text h3>Pobočka</Text>
                <Text css={{ fs: '$sm' }}>
                  Jirsíkova 484/6 <br />
                  Praha 8, 180 00
                </Text>
              </Grid>
              <Grid sm={4} direction="column">
                <Text h3>IČO</Text>
                <Text css={{ fs: '$sm' }}>02059690</Text>
                <Text h3>DIČ</Text>
                <Text css={{ fs: '$sm' }}>CZ02059690</Text>
              </Grid>
            </Grid.Container>
            <ContactUs />
          </Card>
        </Container>
      </StyledContainer>
    </Layout>
  </>
);

export default Contact;
