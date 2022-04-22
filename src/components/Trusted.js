import {
  Card,
  Container,
  Grid,
  Image,
  Link,
  styled,
  Text,
} from '@nextui-org/react';

import mnisek from '../../public/images/reference/mnisek.png';
import ttp from '../../public/images/reference/ttp-logo.png';
import povodi from '../../public/images/reference/povodni.png';
import vsem from '../../public/images/reference/vsem.png';
import lisno from '../../public/images/reference/lisno.png';
import vimperk from '../../public/images/reference/vimperk.png';

const Trusted = () => (
  <Container
    sm
    display="flex"
    direction="column"
    alignItems="center"
    css={{ mt: '$15', mb: '$15' }}
  >
    <Text h1 css={{ lh: 1.2, mt: 0 }}>
      Spokojeni zakaznici
    </Text>
    <Grid.Container gap={2} justify="center">
      <Grid xs={2}>
        <Image src="images/reference/lisno.png" alt="Default Image" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/mnisek.png" alt="Default Image" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/povodni.png" alt="Default Image" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/ttp-logo.png" alt="Default Image" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/vimperk.png" alt="Default Image" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/vsem.png" alt="Default Image" />
      </Grid>
    </Grid.Container>
  </Container>
);

export default Trusted;
