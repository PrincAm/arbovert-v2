import { Button, Card, Container, Grid, Spacer, Text } from '@nextui-org/react';

const Welcome = () => {
  const handleScrollToElement = (elementName) => {
    const element = document.getElementById(elementName);
    const offset = 75;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };
  return (
    <Container
      sm
      display="flex"
      alignItems="center"
      css={{ minHeight: '100vh' }}
    >
      <Grid.Container gap={5} justify="center">
        <Grid sm={6} direction="column" justify="center">
          <Text
            h1
            size={60}
            css={{
              display: 'inline',
              textGradient: '45deg, $blue500 -20%, $green500 50%',
              lh: '1.2',
            }}
            weight="bold"
          >
            Arboristika,
            <br />
          </Text>
          <Text
            h1
            size={60}
            css={{
              display: 'inline',
              color: '$text',
              lh: '1.2',
            }}
            weight="bold"
          >
            rizikové kácení,
            <br />
          </Text>
          <Text
            h1
            size={60}
            css={{
              display: 'inline',
              color: '$text',
              lh: '1.2',
            }}
            weight="bold"
          >
            stromolezectví
          </Text>
          <Text
            h2
            css={{
              color: '$accents6',
              fs: '$sm',
              fontWeight: '$medium',
              mt: '$md',
            }}
          >
            Pomůžeme Vám se stromy
          </Text>
          <Spacer y={1.5} />
          <Grid.Container justify="flex-star">
            <Grid sm={4.5}>
              <Button
                shadow
                color="gradient"
                rounded
                bordered
                auto
                onClick={() => handleScrollToElement('intro')}
              >
                Chci vědět více
              </Button>
            </Grid>
            <Grid sm={4}>
              <Button
                shadow
                color="gradient"
                rounded
                auto
                onClick={() => handleScrollToElement('contact')}
              >
                Poptávka
              </Button>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid sm={6}>
          <Card cover>
            <Card.Image
              src="images/welcome.jpg"
              alt="práce v koruně stromu"
              width={396}
              height={396}
            />
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Welcome;
