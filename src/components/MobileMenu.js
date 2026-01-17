import { Link } from '@heroui/react';
import NextLink from 'next/link';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import useLockBodyScroll from '../hooks/use-lock-body-scroll';

const Container = ({ children, className = '', ...props }) => (
  <nav
    className={`absolute flex flex-col items-start top-0 left-0 h-screen w-full bg-white z-10 p-10 ${className}`}
    {...props}
  >
    {children}
  </nav>
);

const StyledIcon = ({ className = '', ...props }) => (
  <FontAwesomeIcon className={`w-12 h-12 ${className}`} {...props} />
);

const MobileMenu = ({ navItems, onExpand }) => {
  // useLockBodyScroll();

  return (
    <Container>
      <NextLink
        href="/"
        key="home"
        className="mt-13 ml-5 mb-4"
        onClick={() => onExpand(false)}
      >
        <h1 className="text-green-800 text-3xl md:text-4xl font-bold">
          Domů
        </h1>
      </NextLink>
      {navItems.map(({ href, label, target }) => {
        const LinkComponent = target === '_blank' ? Link : NextLink;
        return (
          <LinkComponent
            href={href}
            key={label}
            target={target && target}
            className="ml-5 mb-4"
            onClick={() => onExpand(false)}
          >
            <h1 className="text-green-800 text-3xl md:text-4xl font-bold">
              {label}
            </h1>
          </LinkComponent>
        );
      })}
      <Link
        href="tel:+420739969933"
        className="flex items-center text-black mt-5"
      >
        <StyledIcon icon={faPhone} className="ml-10 mr-5 text-2xl" />
        <h2 className="mt-0 text-2xl md:text-3xl font-semibold">
          +420 739 969 933
        </h2>
      </Link>
    </Container>
  );
};

export default MobileMenu;
