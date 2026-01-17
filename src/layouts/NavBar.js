"use client";

import { useState, useEffect } from 'react';
import { Link } from '@heroui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import Hamburger from '../components/Hamburger';

import { StyledNavBar, StyledMobileNavBar } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useIsMobile } from '../hooks/use-media-query';
import MobileMenu from '../components/MobileMenu';

const navItems = [
  { label: 'Služby', href: '/sluzby' },
  { label: 'O nás', href: '/o-nas' },
  { label: 'Kontakt', href: '/kontakt' },
  {
    label: 'Výškové práce',
    href: 'https://vyskoveprace-arbovert.cz/',
    target: '_blank',
  },
];

const StyledIcon = ({ className = '', ...props }) => (
  <FontAwesomeIcon
    className={`mr-2 w-5 h-5 ${className}`}
    {...props}
  />
);

const IconContainer = ({ children, className = '', ...props }) => (
  <div className={`flex items-center ${className}`} {...props}>
    {children}
  </div>
);

const HamburgerContainer = ({ children, className = '', ...props }) => (
  <div className={`z-[9999] ${className}`} {...props}>
    {children}
  </div>
);

const NavBar = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const handleLogoClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <StyledMobileNavBar>
          {isExpanded && (
            <MobileMenu navItems={navItems} onExpand={setIsExpanded} />
          )}
          <NextLink href="/" onClick={handleLogoClick}>
            <Image
              src="/images/arbovert-logo.svg"
              width={220}
              height={76}
              className="hover:cursor-pointer relative z-[9999] m-6"
              alt="green logo arbovert"
            />
          </NextLink>
          <HamburgerContainer>
            <Hamburger toggle={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
          </HamburgerContainer>
        </StyledMobileNavBar>
      ) : (
        <StyledNavBar showBlur detached>
          <nav className="max-w-screen-lg mx-auto flex items-center w-full px-4 gap-4">
            <NextLink href="/" className="flex-shrink-0">
              <Image
                src="/images/arbovert-logo.svg"
                width={180}
                height={62}
                className="hover:cursor-pointer"
                alt="green logo arbovert"
              />
            </NextLink>
            <div className="flex-1 min-w-0 flex justify-end items-center gap-4">
              {navItems.map(({ href, label, target }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-green-800 hover:underline whitespace-nowrap text-base md:text-lg"
                  target={target && target}
                >
                  {label}
                </Link>
              ))}
              <IconContainer className="flex-shrink-0 ml-2">
                <Link
                  href="https://www.facebook.com/arbovertcz/"
                  target="_blank"
                  className="text-blue-600 text-xl"
                >
                  <StyledIcon icon={faFacebook} title="facebook" />
                </Link>
                <Link
                  href="tel:+420739969933"
                  className="ml-3 text-green-800 flex items-center whitespace-nowrap text-base md:text-lg"
                >
                  <StyledIcon icon={faPhone} title="telefon" /> +420 739 969
                  933
                </Link>
              </IconContainer>
            </div>
          </nav>
        </StyledNavBar>
      )}
    </>
  );
};

export default NavBar;
