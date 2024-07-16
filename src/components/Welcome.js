import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { useIsMobile } from '../hooks/use-media-query';

const Welcome = () => {
  const isMobile = useIsMobile();

  const handleScrollToElement = (elementName) => {
    const element = document.getElementById(elementName);
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const textSize = isMobile ? 50 : 60;

  return (
    <Container
      sm
      display="flex"
      alignItems="center"
      css={{
        minHeight: '100vh',
      }}
    >
      <Grid.Container gap={5} justify="center">
        <Grid sm={6} direction="column" justify="center">
          <Text
            h1
            size={textSize}
            css={{
              display: 'inline',
              textGradient: '45deg, $blue500 -20%, $green500 50%',
              lh: '1.2',
            }}
            weight="bold"
          >
            O stromy
            <br />
          </Text>
          <Text
            h1
            size={textSize}
            css={{
              display: 'inline',
              color: '$text',
              lh: '1.2',
            }}
            weight="bold"
          >
            se postaráme za vás.
            <br />
          </Text>
          <Text
            h1
            size={40}
            css={{
              display: 'inline',
              color: '$text',
              lh: '1.2',
            }}
            weight="bold"
          >
            Pokácíme, ošetříme, poradíme.
          </Text>
        </Grid>
        <Grid sm={6}>
          <Card cover>
            <Card.Image
              src="images/welcome.jpg"
              alt="práce v koruně stromu"
              width={isMobile ? 260 : 396}
            />
          </Card>
        </Grid>
        <Grid sm={12} alignItems="center" justify="center">
          <Button
            size="lg"
            shadow
            color="gradient"
            rounded
            auto
            onClick={() => handleScrollToElement('contact')}
          >
            Chci nabídku zdarma
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Welcome;
