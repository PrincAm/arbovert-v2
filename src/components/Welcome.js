import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Spacer,
  Text,
} from '@nextui-org/react';

const Welcome = () => (
  <Container
    sm
    display="flex"
    alignItems="center"
    justify="space-between"
    wrap="nowrap"
    css={{ height: 'calc(100vh - 72px)' }}
  >
    <Col>
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
        rizikove kaceni, stromolezectvi
      </Text>
      <Text
        h2
        css={{
          color: '$accents6',
          fs: '$sm',
          fontWeight: '$medium',
        }}
      >
        Lorem ipsum dolor sit amet
      </Text>
      <Spacer y={1.5} />
      <Grid.Container justify="flex-star">
        <Grid sm={4.5}>
          <Button shadow color="gradient" rounded bordered auto>
            Chci vedet vice
          </Button>
        </Grid>
        <Grid sm={4}>
          <Button shadow color="gradient" rounded auto>
            Poptavka
          </Button>
        </Grid>
      </Grid.Container>
    </Col>
    <Col>
      <Grid.Container justify="center">
        <Grid
          sm={6}
          css={{
            position: 'relative',
            top: -35,
            left: 30,
          }}
        >
          <Card cover>
            <Card.Image
              src="images/image.jpg"
              height="auto"
              width="100%"
              alt="Card image background"
            />
          </Card>
        </Grid>
        <Grid sm={6}>
          <Card cover>
            <Card.Image
              src="images/image.jpg"
              height="auto"
              width="100%"
              alt="Card image background"
            />
          </Card>
        </Grid>
      </Grid.Container>
    </Col>
  </Container>
);

export default Welcome;
