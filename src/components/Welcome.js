import { useState, useEffect } from 'react';
import { Button, Grid, Text, styled } from '@nextui-org/react';
import Image from 'next/image';
import { useIsMobile } from '../hooks/use-media-query';

const BackgroundContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 76px)',
  position: 'relative',
  zIndex: '1',
  padding: '0',
});

const Welcome = () => {
  const isMobile = useIsMobile();
  const [imageSrc, setImageSrc] = useState('background-small_fx4luw.webp');

  useEffect(() => {
    if (!isMobile) {
      setImageSrc('background_ehubfy.webp');
    }
  }, [isMobile]);

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
    <BackgroundContainer>
      <Image
        src={imageSrc}
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority={true}
        quality={75}
        loader={({ src }) =>
          `https://res.cloudinary.com/dznxs2k2a/image/upload/v1727335383/arbovert/${src}`
        }
      />
      <Grid.Container
        gap={3}
        justify="center"
        align="center"
        css={{
          background: 'rgba(0, 0, 0, 0.5)',
          maxWidth: isMobile ? 'auto' : '650px',
          borderRadius: isMobile ? 0 : '$xl',
          m: 0,
          zIndex: 1,
        }}
      >
        <Grid sm={12} direction="column">
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
              lh: '1.2',
              color: 'white',
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
              color: 'white',
              lh: '1.6',
            }}
            weight="bold"
          >
            Pokácíme, ošetříme, poradíme.
          </Text>
        </Grid>
        <Grid sm={12} alignItems="center" justify="center">
          <Button
            size="lg"
            color="gradient"
            rounded
            auto
            onClick={() => handleScrollToElement('contact')}
          >
            Chci nabídku zdarma
          </Button>
        </Grid>
      </Grid.Container>
    </BackgroundContainer>
  );
};

export default Welcome;
