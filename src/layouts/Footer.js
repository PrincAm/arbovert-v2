import { Link } from '@heroui/react';
import Image from 'next/image';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = ({ className = '', ...props }) => (
  <FontAwesomeIcon className={`mr-2 w-5 h-5 ${className}`} {...props} />
);

const Footer = () => (
  <div className="flex flex-col items-center justify-center mt-10 mb-10">
    <Image
      src="/images/arbovert-logo-cropped.svg"
      width={100}
      height={100}
      alt="green logo arbovert without text"
    />
    <Link
      href="tel:+420739969933"
      className="mt-8 text-green-800 flex items-center"
    >
      <StyledIcon icon={faPhone} /> +420 739 969 933
    </Link>
  </div>
);

export default Footer;
