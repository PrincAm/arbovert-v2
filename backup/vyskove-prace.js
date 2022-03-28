import { Heading, Text } from 'grommet';

import Layout from './src/components/Layout';
import data from './src/data/upwork';
import SectionBox from './src/components/SectionBox';

const UpWork = () => (
  <Layout>
    <Heading>Výškové práce</Heading>
    <Text size="large">
      Ve výškových pracích pokrýváme v podstatě všechna povolání
    </Text>
    {data.map(({ title, description, imageSrc }) => (
      <SectionBox title={title} description={description} imageSrc={imageSrc} />
    ))}
  </Layout>
);

export default UpWork;
