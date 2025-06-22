import {
  Container,
  Image,
  Grid,
  Text,
  styled,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';

import Layout from '../layouts/index';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const StyledItem = styled('li', {
  marginBottom: 0,
});

const Invent = () => {
  useEffect(() => {
    // Client-side only logic
    console.log('Component mounted on client side');
  }, []);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/kontakt.html');
  };

  return (
    <>
      <NextSeo
        title="Inventarizace dřevin - Komplexní analýza stromového porostu | Arbovert"
        description="Profesionální inventarizace dřevin pro udržitelné hospodaření. Analyzujeme stromový porost v lesích, parcích a městských zelených plochách. Zajistíme efektivní využití dřevní hmoty."
        canonical="https://www.arbovert.cz/inventarizace-drevin"
        openGraph={{
          title: "Inventarizace dřevin - Komplexní analýza stromového porostu | Arbovert",
          description: "Profesionální inventarizace dřevin pro udržitelné hospodaření. Analyzujeme stromový porost v lesích, parcích a městských zelených plochách.",
          url: "https://www.arbovert.cz/inventarizace-drevin",
          images: [
            {
              url: "https://arbovert.cz/images/strom.jpg",
              width: 800,
              height: 600,
              alt: "Inventarizace dřevin - stromy",
            },
          ],
        }}
      />
      <Layout>
        <StyledContainer>
          <Container sm>
            <Text h1 css={{ mt: '$5', mb: '$5' }}>
              Inventarizace dřevin
            </Text>
            <Grid.Container
              gap={2}
              css={{ mb: '$10', bc: 'white', borderRadius: '$lg' }}
            >
              <Grid sm={7} direction="column">
                <Text h2>Arbovert</Text>
                <Text>
                  <p>
                    <b>Zanalyzujeme vaše stromy, abyste z nich měli maximum.</b>
                  </p>
                  <p>
                    <b>
                      Uděláme evidenci vašich stromů, a to komplexně. Můžete tak
                      efektivně a udržitelně využívat zdroje dřeva.
                    </b>
                    <br />
                    Při inventarizaci dřevin analyzujeme informace o stromovém
                    porostu na různých místech, nejen v lesích, ale i v
                    městských parcích a jiných zelených plochách. Což je zásadní
                    pro udržitelné využívání dřevní hmoty a ochranu přírody.
                  </p>
                  <b>Proč je inventarizace důležitá?</b>
                  <br />
                  <ol>
                    <StyledItem>
                      <b>Udržitelné hospodaření:</b> Zajišťuje, že těžba probíhá
                      v souladu s obnovou porostů.
                    </StyledItem>
                    <StyledItem>
                      <b>Ochrana přírody:</b> Chrání vzácné a ohrožené druhy
                      dřevin.
                    </StyledItem>
                    <StyledItem>
                      <b>Ekonomická efektivita:</b> Optimalizuje těžbu a
                      zpracování dřeva.
                    </StyledItem>
                    <StyledItem>
                      <b>Plánování a prevence:</b> Pomáhá předcházet škodám
                      způsobeným požáry a škůdci.
                    </StyledItem>
                  </ol>
                  <b>Kdy se podíváme na vaše stromy?</b>
                </Text>
              </Grid>
              <Grid sm={5}>
                <Image src="images/strom.jpg" alt="man in front of tree" />
              </Grid>
              <Grid sm={12}>
                <Container
                  sm
                  display="flex"
                  direction="column"
                  alignItems="center"
                  align="center"
                  css={{ mt: '$5', mb: '$5' }}
                >
                  <Button
                    size="lg"
                    shadow
                    color="gradient"
                    rounded
                    auto
                    onClick={handleButtonClick}
                  >
                    Chci inventarizaci dřevin
                  </Button>
                </Container>
              </Grid>
            </Grid.Container>
          </Container>
        </StyledContainer>
      </Layout>
    </>
  );
};
export default Invent;
