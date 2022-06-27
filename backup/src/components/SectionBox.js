import { Box, Heading, Text } from 'grommet';
import Image from 'next/image';
import styled from 'styled-components';

const ImageBox = styled(Box)`
  max-width: 40%;
`;

const SectionBox = ({ title, description, imageSrc }) => (
  <Box
    background="white"
    direction="row"
    margin={{ vertical: 'medium' }}
    pad="medium"
    gap="medium"
  >
    <Box fill>
      <Heading level={2}>{title}</Heading>
      <Text size="large">{description}</Text>
    </Box>
    <ImageBox fill>
      <Image src={imageSrc} alt={description} />
    </ImageBox>
  </Box>
);

export default SectionBox;
