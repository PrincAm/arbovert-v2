import '../styles/globals.css';
import { Providers } from './providers';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer';

export const metadata = {
  title: 'Arbovert - Arborista Praha | Rizikové kácení stromů a inventarizace dřevin',
  description:
    'Arbovert - profesionální arborista Praha a Šumava. Rizikové kácení stromů, inventarizace dřevin, štěpkování dřevní hmoty, likvidace dřevního odpadu. Certifikovaní arboristé s 14+ lety zkušeností.',
  keywords: [
    'arbovert',
    'arborista praha',
    'arborista šumava',
    'rizikové kácení stromů praha',
    'rizikové kácení stromů šumava',
    'rizikové kácení stromů vimperk',
    'technika kácení stromů',
    'kácení stromů praha',
    'kácení stromů šumava',
    'kácení stromů jižní čechy',
    'kácení stromů prachatice',
    'inventarizace dřevin',
    'inventarizace stromů',
    'štěpkování dřevní hmoty',
    'štěpkování dřeva',
    'likvidace dřevního odpadu',
    'likvidace dřeva',
    'likvidace dřevní hmoty',
    'arboristika praha',
    'arboristika šumava',
    'arboristika střední čechy',
    'arboristika jihočeský kraj',
    'arboristické služby praha',
    'arboristické služby šumava',
    'ošetřování stromů praha',
    'ošetřování stromů šumava',
    'prořezávání stromů praha',
    'péče o stromy praha',
    'péče o stromy šumava',
    'výsadby stromů',
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
    title: 'Arbovert - Arborista Praha | Rizikové kácení stromů a inventarizace dřevin',
    description:
      'Arbovert - profesionální arborista Praha a Šumava. Rizikové kácení stromů, inventarizace dřevin a stromů, štěpkování dřeva, likvidace dřevního odpadu. Technika kácení stromů.',
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
