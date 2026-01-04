import {
  Container,
  Image,
  Grid,
  Text,
  styled,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Layout from '../../layouts/index';
import { serviceContent } from '../../data/arbo';

const StyledContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$accents1',
});

const StyledItem = styled('li', {
  marginBottom: 0,
});

// Generate static paths for all services
export async function getStaticPaths() {
  const paths = Object.keys(serviceContent).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // Return 404 for any paths not returned by getStaticPaths
  };
}

// Generate static props for each service
export async function getStaticProps({ params }) {
  const { slug } = params;
  const service = serviceContent[slug];

  if (!service) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      service,
      slug,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

const ServicePage = ({ service, slug }) => {
  const router = useRouter();
  // Build canonical URL from slug prop to ensure consistency between server and client
  // This prevents hydration mismatches
  const canonicalUrl = `https://arbovert.cz/sluzby/${slug}`;

  const handleButtonClick = () => {
    router.push('/kontakt');
  };

  // If the page is not yet generated, this will be displayed
  // until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <Layout>
        <StyledContainer>
          <Container sm>
            <Text h1 css={{ mt: '$5', mb: '$5' }}>
              Načítání...
            </Text>
          </Container>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <>
      <NextSeo
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: service.seoTitle,
          description: service.seoDescription,
          url: canonicalUrl,
          images: [
            {
              url: `https://arbovert.cz/${service.imageSrc}`,
              width: 800,
              height: 600,
              alt: service.title,
            },
          ],
        }}
      />
      <Layout>
        <StyledContainer>
          <Container sm>
            <Text h1 css={{ mt: '$5', mb: '$5' }}>
              {service.title}
            </Text>
            <Grid.Container
              gap={2}
              css={{ mb: '$10', bc: 'white', borderRadius: '$lg' }}
            >
              <Grid sm={7} direction="column">
                <Text h2>Arbovert</Text>
                <div>
                  <Text b css={{ display: 'block', mb: '$2' }}>
                    {service.description}
                  </Text>
                  <Text b css={{ display: 'block', mb: '$4' }}>
                    {service.longDescription}
                  </Text>
                  <Text b css={{ display: 'block', mb: '$2' }}>
                    Jaké služby nabízíme?
                  </Text>
                  <ol>
                    {service.benefits.map((benefit, index) => (
                      <StyledItem key={index}>
                        <Text b>{benefit.title}:</Text> {benefit.description}
                      </StyledItem>
                    ))}
                  </ol>
                  <Text b css={{ display: 'block', mt: '$4' }}>
                    {service.question}
                  </Text>
                </div>
              </Grid>
              <Grid sm={5}>
                <Image src={service.imageSrc} alt={service.title} />
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
                    {service.ctaText}
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

export default ServicePage; 