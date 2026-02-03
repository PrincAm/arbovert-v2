import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useIsMobile } from '../hooks/use-media-query';

const BackgroundContainer = ({ children, className = '', ...props }) => (
  <div
    className={`flex items-center justify-center min-h-[calc(100vh-76px)] relative z-[1] p-0 ${className}`}
    {...props}
  >
    {children}
  </div>
);

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
  const subTextSize = isMobile ? 28 : 36;

  return (
    <BackgroundContainer>
      <Image
        src={`https://res.cloudinary.com/dznxs2k2a/image/upload/v1727335383/arbovert/${imageSrc}`}
        alt="Background"
        fill
        priority={true}
        quality={75}
        className="object-cover"
      />
      <div
        className={`flex flex-col items-center justify-center bg-black/50 ${isMobile ? 'max-w-full rounded-none p-10' : 'max-w-[900px] rounded-xl p-16'} m-0 z-[1] gap-8`}
      >
        <div className="flex flex-col items-center text-center gap-6">
          <h1
            className="leading-tight font-bold"
            style={{ fontSize: `${textSize}px` }}
          >
            <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Kácení stromů
            </span>
            <br />
            <span className="text-white">Praha a Šumava</span>
          </h1>
          <h2
            className="text-white leading-relaxed font-bold"
            style={{ fontSize: `${subTextSize}px` }}
          >
            Pokácíme, ošetříme, poradíme.
          </h2>
        </div>
        <div className="flex items-center justify-center w-full">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg px-10 py-6 rounded-full flex items-center justify-center"
            radius="full"
            onClick={() => handleScrollToElement('contact')}
          >
            Chci nabídku zdarma
          </Button>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Welcome;
