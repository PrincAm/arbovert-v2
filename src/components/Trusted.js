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
    align="center"
    css={{ mt: '$15', mb: '$15' }}
  >
    <Text h1 css={{ lh: 1.2, mt: 0 }}>
      Spokojení zákazníci
    </Text>
    <Grid.Container gap={2} justify="center">
      <Grid xs={2}>
        <Image src="images/reference/lisno.png" alt="logo zamen lisno" />
      </Grid>
      <Grid xs={2}>
        <Image
          src="images/reference/mnisek.png"
          alt="logo mesto mnisek pod brdy"
        />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/povodni.png" alt="logo povodi labe" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/ttp-logo.png" alt="logo ttp" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/vimperk.png" alt="logo mesto vimperk" />
      </Grid>
      <Grid xs={2}>
        <Image src="images/reference/vsem.png" alt="logo vsem" />
      </Grid>
    </Grid.Container>
  </Container>
);

export default Trusted;
