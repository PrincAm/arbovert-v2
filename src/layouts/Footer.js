import { Link } from '@heroui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = ({ className = '', ...props }) => (
  <FontAwesomeIcon className={`mr-2 w-5 h-5 ${className}`} {...props} />
);

const FooterLink = ({ href, children }) => (
  <NextLink
    href={href}
    className="text-default-600 hover:text-success-600 transition-colors text-sm"
  >
    {children}
  </NextLink>
);

const Footer = () => (
  <footer className="bg-gray-100">
    <div className="max-w-screen-lg mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Contact */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/images/arbovert-logo-cropped.svg"
            width={80}
            height={80}
            alt="Arbovert logo - arboristika Praha a Šumava"
          />
          <div className="mt-4 space-y-2">
            <Link
              href="tel:+420739969933"
              className="text-default-700 hover:text-success-600 flex items-center text-sm"
            >
              <StyledIcon icon={faPhone} /> +420 739 969 933
            </Link>
            <Link
              href="mailto:info@arbovert.cz"
              className="text-default-700 hover:text-success-600 flex items-center text-sm"
            >
              <StyledIcon icon={faEnvelope} /> info@arbovert.cz
            </Link>
          </div>
        </div>

        {/* Služby Praha */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold text-foreground mb-4">
            Kácení stromů Praha
          </h3>
          <nav className="flex flex-col space-y-2">
            <FooterLink href="/sluzby/rizikove-kaceni-stromu">
              Rizikové kácení stromů Praha
            </FooterLink>
            <FooterLink href="/sluzby/odborne-osetrovani-stromu">
              Ošetřování stromů Praha
            </FooterLink>
            <FooterLink href="/sluzby/likvidace-drevni-hmoty">
              Frézování pařezů Praha
            </FooterLink>
            <FooterLink href="/sluzby/zajistovani-stromu">
              Stabilizace stromů Praha
            </FooterLink>
          </nav>
        </div>

        {/* Služby Šumava */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold text-foreground mb-4">
            Arboristika Jižní Čechy
          </h3>
          <nav className="flex flex-col space-y-2">
            <FooterLink href="/sluzby/rizikove-kaceni-stromu">
              Kácení stromů Šumava
            </FooterLink>
            <FooterLink href="/sluzby/odborne-osetrovani-stromu">
              Arboristika jižní Čechy
            </FooterLink>
            <FooterLink href="/sluzby/vysadba-stromu-a-povysadbova-pece">
              Výsadba stromů Šumava
            </FooterLink>
            <FooterLink href="/sluzby/inventarizace-drevin">
              Inventarizace dřevin
            </FooterLink>
          </nav>
        </div>

        {/* O firmě */}
        <div className="text-center md:text-left">
          <h3 className="text-base font-semibold text-foreground mb-4">
            Arbovert s.r.o.
          </h3>
          <nav className="flex flex-col space-y-2">
            <FooterLink href="/o-nas">O nás</FooterLink>
            <FooterLink href="/realizace">Realizace prací</FooterLink>
            <FooterLink href="/sluzby">Všechny služby</FooterLink>
            <FooterLink href="/kontakt">Kontakt</FooterLink>
            <FooterLink href="/gdpr">Ochrana osobních údajů</FooterLink>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-default-200 text-center">
        <p className="text-xs text-default-500">
          © {new Date().getFullYear()} Arbovert s.r.o. - Profesionální kácení stromů a arboristika v Praze a na Šumavě. Certifikovaní arboristé od roku 2011.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
