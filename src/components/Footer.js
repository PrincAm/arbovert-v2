import { FacebookOption } from 'grommet-icons';
import { Anchor, Box, Footer as FooterG, Grommet, Text } from 'grommet';

import { customTheme } from '../theme/theme';

const Media = () => (
  <Box direction="row" gap="xsmall" justify="center" align="center">
    <Anchor
      a11yTitle="Chat with us on Facebook"
      href="https://www.facebook.com/"
      icon={<FacebookOption color="brand" />}
    />
    <Anchor a11yTitle="Call us" href="tel:+420739969933">
      +420 739 969 933
    </Anchor>
  </Box>
);

const Footer = () => (
  <Grommet theme={customTheme}>
    <Box
      flex
      margin={{ horizontal: 'auto' }}
      width={{ max: 'xlarge' }}
      height={{ min: '100%' }}
    >
      <FooterG pad="small">
        <Box align="center" direction="row" gap="xsmall">
          <Text alignSelf="center" color="brand" size="small">
            Arbovert
          </Text>
        </Box>
        <Media />
        <Text textAlign="center" size="xsmall">
          © 2021 Copyright
        </Text>
      </FooterG>
    </Box>
  </Grommet>
);

export default Footer;
