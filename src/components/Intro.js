import { Card, Container, Grid, Text, Link } from '@nextui-org/react';
import { useIsMobile } from '../hooks/use-media-query';

const Intro = () => {
  const isMobile = useIsMobile();

  return (
    <Container sm id="intro" css={{ pt: '$15' }}>
      <Grid.Container gap={5} justify="center" css={{ pt: 0 }}>
        <Grid sm={7} direction="column">
          <Text h1 css={{ lh: 1.2 }}>
            Co umíme
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
            údržba zahrad, řez ovocných dřevin,
            <Link href="/inventarizace-drevin.html">inventarizace dřevin</Link>,
            ošetřování památných stromů, posudky stromů a poradenství
          </Text>
          <Link href="/sluzby.html">Více o našich službách</Link>
        </Grid>
        <Grid sm={5}>
          <Link href="/sluzby.html">
            <Card cover clickable hoverable>
              <Card.Image
                src="images/arbo.jpg"
                width={isMobile ? 260 : 320}
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
            Máme přes 10 let zkušeností.
            <br />A na naší práci to uvidíte.
          </Text>
          <Link href="/o-nas.html">Více o nás</Link>
        </Grid>
        <Grid sm={5}>
          <Link href="/o-nas.html">
            <Card cover clickable hoverable>
              <Card.Image
                src="images/we.jpg"
                width={isMobile ? 260 : 320}
                alt="Card image background"
              />
            </Card>
          </Link>
        </Grid>
      </Grid.Container>
    </Container>
  );
};
export default Intro;
