import Head from 'next/head';

import {
  Anchor,
  Avatar,
  Box,
  Footer,
  Heading,
  Nav,
  Paragraph,
  Header,
  Grommet,
  ResponsiveContext,
  Main,
} from 'grommet';
import { Github, Slack, Grommet as GrommetIcon } from 'grommet-icons';
import { deepFreeze } from 'grommet/utils';

export const customTheme = deepFreeze({
  global: {
    colors: {
      brand: '#0072c6',
      control: {
        dark: '#f8f8f8',
        light: '#444444',
      },
      'accent-1': '#fa6800',
      'accent-2': '#128023',
      'accent-3': '#0050ef',
      'accent-4': '#d80073',
      'neutral-1': '#a4c400',
      'neutral-2': '#00aba9',
      'neutral-3': '#BF5A15',
      'neutral-4': '#8F6C53',
    },
    control: {
      border: {
        radius: '0px',
      },
    },
    drop: {
      background: '#005696',
    },
    focus: {
      border: {
        color: {
          0: 'f',
          1: 'o',
          2: 'c',
          3: 'u',
          4: 's',
          light: '#0072c6',
          dark: '#003967',
        },
      },
    },
    hover: {
      background: {
        dark: '#0093ff',
        light: '#003967',
      },
      color: {
        dark: '#333333',
        light: '#ffffff',
      },
    },
  },
  anchor: {
    color: {
      dark: '#ffffff',
      light: '#0078D4',
    },
  },
  button: {
    border: {
      radius: '0px',
    },
  },
  checkBox: {
    border: {
      color: {
        light: 'rgba(0, 98, 186, 0.5)',
      },
    },
    check: {
      radius: '0px',
    },
    toggle: {
      color: {
        dark: '#bdbdbd',
        light: '#0072c6',
      },
      radius: '0px',
    },
  },
  layer: {
    border: {
      radius: '0px',
    },
  },
  radioButton: {
    border: {
      color: {
        light: 'rgba(0, 98, 186, 0.5)',
      },
    },
  },
});

const navItems = [
  { label: 'Arboristika', href: 'arboristika' },
  { label: 'Vyskove prace', href: 'vyskove-prace' },
  { label: 'O nas', href: 'o-nas' },
  { label: 'Kontakt', href: 'kontakt' },
];

export default function Home() {
  const gravatarLink =
    '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

  return (
    <Grommet theme={customTheme}>
      <Header pad="medium" height="xsmall">
        <Box
          direction="row"
          align="center"
          fill="horizontal"
          margin={{ horizontal: 'auto' }}
          width={{ max: 'xlarge' }}
        >
          <Anchor
            href="https://tools.grommet.io/"
            label="Arbovert"
            size="xxlarge"
          />
          <ResponsiveContext.Consumer>
            {(size) =>
              size === 'small' ? (
                <div>TODO MOBILE MENU</div>
              ) : (
                <Nav direction="row">
                  {navItems.map(({ href, label }) => (
                    <Anchor href={href} label={label} key={label} />
                  ))}
                </Nav>
              )
            }
          </ResponsiveContext.Consumer>
        </Box>
      </Header>

      <Box
        flex
        margin={{ horizontal: 'auto' }}
        width={{ max: 'xlarge' }}
        height={{ min: '100%' }}
      >
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Main pad="small">
          <Box flex role="main" pad={{ vertical: 'large' }}>
            <Box
              background={{
                image:
                  'url(https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
              }}
              height="200px"
              width="200px"
              border={{ color: 'brand', size: 'large' }}
            />
            <Heading>
              Welcome to <Anchor href="https://nextjs.org">Next.js</Anchor> and{' '}
              <Anchor href="https://v2.grommet.io">Grommet!</Anchor>
            </Heading>

            <Paragraph fill>
              This application is a boilerplate for using Next.js Framework,
              React library and the Grommet Component Library.
            </Paragraph>

            <Paragraph fill>
              The application and the page you are currently viewing is the
              default page that is created after bootstrapping a Next.js with{' '}
              <Anchor href="https://nextjs.org/docs/api-reference/create-next-app">
                Create Next App
              </Anchor>
              .
            </Paragraph>

            <Paragraph fill>
              To the default Create Next App application we added the grommet
              dependency, and replaced the HTML tags with actual grommet
              components, as a result you are viewing the same default page,
              with only Grommet components.
            </Paragraph>

            <Paragraph fill>
              Feel free to shoot the Grommet team any feedback and questions by
              using this page footer contact info.
            </Paragraph>

            <Paragraph fill>
              Get started by editing <code>pages/index.js</code>
            </Paragraph>

            <Box>
              <Anchor href="https://nextjs.org/docs">
                <Heading level={3}>Documentation &rarr;</Heading>
              </Anchor>
              <Paragraph>
                Find in-depth information about Next.js features and API.
              </Paragraph>

              <Anchor href="https://nextjs.org/learn">
                <Heading level={3}>Learn &rarr;</Heading>
              </Anchor>
              <p>Learn about Next.js in an interactive course with quizzes!</p>

              <Anchor href="https://github.com/vercel/next.js/tree/master/examples">
                <Heading level={3}>Examples &rarr;</Heading>
              </Anchor>
              <Paragraph>
                Discover and deploy boilerplate example Next.js projects.
              </Paragraph>

              <Anchor href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
                <Heading level={3}>Deploy &rarr;</Heading>
              </Anchor>
              <Paragraph>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </Paragraph>
            </Box>

            <Anchor
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js Powered by Vercel
            </Anchor>
          </Box>
        </Main>
        <Footer
          background="light-2"
          pad={{ vertical: 'small', horizontal: 'medium' }}
        >
          <Anchor href="https://github.com/ShimiSun">
            <Avatar src={gravatarLink} />
          </Anchor>
          <Nav direction="row" align="center">
            <Anchor
              a11yTitle="Reach out to the Grommet Community on Slack"
              href="https://slack-invite.grommet.io/"
              icon={<Slack color="plain" />}
              target="_blank"
              rel="noreferrer noopener"
            />
            <Anchor
              a11yTitle="Github repository"
              href="https://github.com/grommet/nextjs-boilerplate"
              icon={<Github color="black" />}
              target="_blank"
              rel="noreferrer noopener"
            />
          </Nav>
        </Footer>
      </Box>
    </Grommet>
  );
}
