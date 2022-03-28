import Welcome from '../components/Welcome';
import Intro from '../components/Intro';
import Certificate from '../components/Certificate';

import Layout from '../layouts/index';
import ContactUs from '../components/ContactUs';

export default function Home() {
  return (
    <Layout>
      <Welcome />
      <Intro />
      <Certificate />
      <ContactUs />
    </Layout>
  );
}
