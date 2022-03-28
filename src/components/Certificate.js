import { Card, Container, Link, styled, Text } from '@nextui-org/react';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const Certificate = () => (
  <StyledContainer>
    <Container
      sm
      display="flex"
      direction="column"
      alignItems="center"
      css={{ mt: '$15', mb: '$15' }}
    >
      <Text h1 css={{ lh: 1.2, mt: 0 }}>
        Mame evropskou certifikaci
      </Text>
      <Link
        href="https://www.eac-arboriculture.com/eac-intro.aspx"
        target="_blank"
      >
        <Card cover clickable hoverable>
          <Card.Image
            src="images/etw.png"
            height="auto"
            width="100%"
            alt="Card image background"
          />
        </Card>
      </Link>
    </Container>
  </StyledContainer>
);

export default Certificate;
