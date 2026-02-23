import { Link } from '@heroui/react';
import NextLink from 'next/link';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useLockBodyScroll from '../hooks/use-lock-body-scroll';

const MobileMenu = ({ navItems, onExpand, isExpanded }) => {
  useLockBodyScroll(isExpanded);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => onExpand(false)}
      />

      {/* Slide-in panel */}
      <nav
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white z-50 flex flex-col p-10 transition-transform duration-300 ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <NextLink
          href="/"
          key="home"
          className="mt-13 mb-2"
          onClick={() => onExpand(false)}
        >
          <span className="text-green-800 text-2xl font-bold">Domů</span>
        </NextLink>

        {navItems.map(({ href, label, target }) => {
          const LinkComponent = target === '_blank' ? Link : NextLink;
          return (
            <LinkComponent
              href={href}
              key={label}
              target={target && target}
              className="py-2 border-t border-gray-100"
              onClick={() => onExpand(false)}
            >
              <span className="text-green-800 text-2xl font-bold">
                {label}
              </span>
            </LinkComponent>
          );
        })}

        {/* Contact section at bottom */}
        <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-4">
          <Link
            href="tel:+420739969933"
            className="flex items-center text-green-800"
          >
            <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3" />
            <span className="text-xl font-semibold">+420 739 969 933</span>
          </Link>
          <Link
            href="https://www.facebook.com/arbovertcz/"
            target="_blank"
            className="flex items-center text-blue-600"
          >
            <FontAwesomeIcon icon={faFacebook} className="w-5 h-5 mr-3" />
            <span className="text-xl font-semibold">Facebook</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
