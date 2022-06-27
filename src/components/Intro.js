import { Card, Container, Grid, Text, Link } from '@nextui-org/react';

const Intro = () => (
  <Container sm id="intro" css={{ pt: 0 }}>
    <Grid.Container gap={5} justify="center" css={{ pt: 0 }}>
      <Grid sm={7} direction="column">
        <Text h1 css={{ lh: 1.2 }}>
          Zabýváme se kompletní činností v arboristice
        </Text>
        <Text
          h2
          css={{
            fs: '$sm',
            fontWeight: '$medium',
            color: '$accents6',
            mt: '$md',
            mb: '$md',
          }}
        >
          Rizikové kácení, ošetřování stromů, instalace stabilizačních prvků,
          údržba zahrad, řez ovocných dřevin, posudky stromů a poradenství
        </Text>
        <Link href="/sluzby.html">Více o našich službách</Link>
      </Grid>
      <Grid sm={5}>
        <Link href="/sluzby.html">
          <Card cover clickable hoverable>
            <Card.Image
              src="images/arbo.jpg"
              width={320}
              height={320}
              alt="Card image background"
            />
          </Card>
        </Link>
      </Grid>
      <Grid sm={7} direction="column">
        <Text h1 css={{ lh: 1.2 }}>
          Arboristika je náš život
        </Text>
        <Text
          h2
          css={{
            fs: '$sm',
            fontWeight: '$medium',
            color: '$accents6',
            mt: '$md',
            mb: '$md',
          }}
        >
          Jsme tu déle než 10 let
        </Text>
        <Link href="/o-nas.html">Více o nás</Link>
      </Grid>
      <Grid sm={5}>
        <Link href="/o-nas.html">
          <Card cover clickable hoverable>
            <Card.Image
              src="images/we.jpg"
              width={320}
              height={320}
              alt="Card image background"
            />
          </Card>
        </Link>
      </Grid>
    </Grid.Container>
  </Container>
);
export default Intro;
