import { Card, Container, Grid, Text, Link, styled } from '@nextui-org/react';

const SubTitle = styled('p', {
  fs: '$sm',
  fontWeight: '$medium',
  color: '$accents6',
  display: 'block',
});

const Intro = () => (
  <Container sm>
    <Grid.Container gap={5} justify="center">
      <Grid sm={7} direction="column">
        <Text h1 css={{ lh: 1.2 }}>
          Provadime veskere prace v arboristice
        </Text>
        <SubTitle>Lorem ipsum dolor sit amet</SubTitle>
        <Link href="/sluzby">Vice o nasich sluzbach</Link>
      </Grid>
      <Grid sm={5}>
        <Link href="/sluzby">
          <Card cover clickable hoverable>
            <Card.Image
              src="images/image.jpg"
              height="auto"
              width="100%"
              alt="Card image background"
            />
          </Card>
        </Link>
      </Grid>
      <Grid sm={7} direction="column">
        <Text h1 css={{ lh: 1.2 }}>
          Arboristikou se zabyvame desitky let
        </Text>
        <SubTitle>Lorem ipsum dolor sit amet</SubTitle>

        <Link href="/o-nas">Vice o nas</Link>
      </Grid>
      <Grid sm={5}>
        <Link href="/o-nas">
          <Card cover clickable hoverable>
            <Card.Image
              src="images/image.jpg"
              height="auto"
              width="100%"
              alt="Card image background"
            />
          </Card>
        </Link>
      </Grid>
    </Grid.Container>
  </Container>
);
export default Intro;
