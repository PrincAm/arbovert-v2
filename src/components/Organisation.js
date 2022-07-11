import { Card, Container, Link, styled, Text } from '@nextui-org/react';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const Organisation = () => (
  <StyledContainer>
    <Container
      sm
      display="flex"
      direction="column"
      alignItems="center"
      align="center"
      css={{ mt: '$15', mb: '$15' }}
    >
      <Text h1 css={{ lh: 1.2, mt: 0 }}>
        Jsme členy Společnosti pro zahradní a krajinářskou tvorbu{' '}
      </Text>
      <Link href="https://szkt.cz/" target="_blank">
        <Card cover clickable hoverable>
          <Card.Image
            src="images/szkt.svg"
            height="auto"
            width="100%"
            alt="SZKT logo"
          />
        </Card>
      </Link>
    </Container>
  </StyledContainer>
);

export default Organisation;
