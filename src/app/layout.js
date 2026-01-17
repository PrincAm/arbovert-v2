import '../styles/globals.css';
import { Providers } from './providers';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

export const metadata = {
  title: 'Arbovert - Arboristika Praha, Vimperk | Rizikové kácení, ošetřování stromů',
  description:
    'Arbovert Praha, Vimperk - profesionální arboristické služby: rizikové kácení stromů, ošetřování stromů, inventarizace dřevin, výsadby. 12+ let zkušeností, certifikovaní pracovníci.',
  keywords: [
    'arbovert',
    'arboristika praha',
    'arboristika vimperk',
    'rizikové kácení praha',
    'rizikové kácení vimperk',
    'ošetřování stromů praha',
    'ošetřování stromů vimperk',
    'inventarizace dřevin',
    'výsadby stromů',
    'arboristické služby praha',
    'arboristické služby vimperk',
    'výškové práce',
    'prořezávání stromů',
    'arboristika střední čechy',
    'arboristika jihočeský kraj',
  ],
  authors: [{ name: 'Arbovert s.r.o.' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Arbovert',
    title: 'Arbovert - Arboristika Praha, Vimperk | Rizikové kácení, ošetřování stromů',
    description:
      'Arbovert Praha, Vimperk - profesionální arboristické služby: rizikové kácení stromů, ošetřování stromů, inventarizace dřevin, výsadby. 12+ let zkušeností.',
    images: [
      {
        url: 'https://arbovert.cz/images/welcome.jpg',
        width: 1536,
        height: 1536,
        alt: 'Arboristické práce - lana a stromy',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://arbovert.cz'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <head>
        <meta name="robots" content="index, follow" />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5V7DRKB"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </head>
      <body>
        <Providers>
          <NavBar />
          <main className="flex flex-col content-between">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
