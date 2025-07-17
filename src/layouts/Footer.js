import { Link, Image, styled } from '@nextui-org/react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledIcon = styled(FontAwesomeIcon, {
  marginRight: '$2',
  width: '$9',
  height: '$9',
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  mt: '$10',
  mb: '$10',
});

const Footer = () => (
  <Container>
    <Image
      src="/images/arbovert-logo-cropped.svg"
      width={100}
      alt="green logo arbovert without text"
    />
    <Link
      href="tel:+420739969933"
      css={{
        mt: '$8',
        color: '$green800',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StyledIcon icon={faPhone} /> +420 739 969 933
    </Link>
  </Container>
);

export default Footer;
