import { Heading, Text } from 'grommet';

import Layout from './src/components/Layout';
import SectionBox from './src/components/SectionBox';
import data from './src/data/arbo';

const Arbo = () => (
  <Layout>
    <Heading>Arboristika</Heading>
    <Text size="large">V arboristice provádíme kompletní péči o dřeviny</Text>
    {data.map(({ title, description, imageSrc }) => (
      <SectionBox title={title} description={description} imageSrc={imageSrc} />
    ))}
  </Layout>
);

export default Arbo;
