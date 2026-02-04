import { useState, useEffect } from 'react';
import { Button } from '@heroui/react';
import Image from 'next/image';
import { useIsMobile } from '../hooks/use-media-query';

const getYearsSinceFounded = () => {
  const foundedYear = 2011;
  const currentYear = new Date().getFullYear();
  return currentYear - foundedYear;
};

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
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />
      <div
        className={`flex flex-col items-center justify-center ${isMobile ? 'max-w-full p-8' : 'max-w-[900px] p-16'} m-0 z-[1] gap-6`}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-emerald-400 text-lg md:text-xl font-medium tracking-wide uppercase">
            Certifikovaní arboristé
          </p>
          <h1
            className="leading-tight font-bold text-white drop-shadow-lg"
            style={{ fontSize: `${textSize}px` }}
          >
            Kácení stromů
            <br />
            <span className="text-emerald-400">Praha a jižní Čechy</span>
          </h1>
          <p
            className="text-white/90 leading-relaxed max-w-lg"
            style={{ fontSize: `${isMobile ? 18 : 22}px` }}
          >
            Pokácíme, ošetříme, poradíme. Přes {getYearsSinceFounded()} let zkušeností.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 mt-4">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-10 py-6 rounded-full transition-colors shadow-lg"
            radius="full"
            onClick={() => handleScrollToElement('contact')}
          >
            Chci nabídku zdarma
          </Button>
          <a
            href="tel:+420739969933"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="text-white text-lg">nebo volejte</span>
            <span className="text-2xl md:text-3xl font-bold text-emerald-400">739 969 933</span>
          </a>
        </div>
      </div>
    </BackgroundContainer>
  );
};

export default Welcome;
