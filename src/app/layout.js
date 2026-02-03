import '../styles/globals.css';
import { Providers } from './providers';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

export const metadata = {
  title: 'Arbovert - Kácení stromů Praha, Šumava | Arboristika a rizikové kácení',
  description:
    'Profesionální kácení stromů a arboristika v Praze a na Šumavě. Rizikové kácení, ošetřování stromů, péče o památné stromy. Certifikovaní arboristé s 14+ lety zkušeností. Pobočky Praha a Vimperk.',
  keywords: [
    'kácení stromů praha',
    'kácení stromů šumava',
    'arboristika praha',
    'arboristika šumava',
    'rizikové kácení praha',
    'rizikové kácení šumava',
    'rizikové kácení vimperk',
    'ošetřování stromů praha',
    'ošetřování stromů šumava',
    'arborista praha',
    'arborista šumava',
    'kácení stromů jižní čechy',
    'arboristické služby praha',
    'arboristické služby šumava',
    'prořezávání stromů praha',
    'péče o stromy praha',
    'péče o stromy šumava',
    'inventarizace dřevin',
    'výsadby stromů',
    'arboristika střední čechy',
    'arboristika jihočeský kraj',
    'kácení stromů prachatice',
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
    title: 'Arbovert - Kácení stromů Praha, Šumava | Arboristika a rizikové kácení',
    description:
      'Profesionální kácení stromů a arboristika v Praze a na Šumavě. Rizikové kácení, ošetřování stromů, péče o památné stromy. Certifikovaní arboristé.',
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
