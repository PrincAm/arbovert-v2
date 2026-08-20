import NextLink from 'next/link';

export const metadata = {
  title: 'Stránka nenalezena - Arbovert',
  description: 'Požadovaná stránka nebyla nalezena.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="flex bg-gray-50">
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6 text-center">
        <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground mb-6">
          Stránka nenalezena
        </h1>
        <p className="text-lg text-default-600 mb-8">
          Omlouváme se, požadovaná stránka neexistuje nebo byla přesunuta.
        </p>
        <div className="flex flex-col items-center gap-3">
          <NextLink
            href="/"
            className="text-success-600 hover:text-success-700 font-semibold text-lg underline"
          >
            Zpět na úvodní stránku
          </NextLink>
          <NextLink
            href="/sluzby"
            className="text-success-600 hover:text-success-700 font-semibold text-lg underline"
          >
            Naše služby
          </NextLink>
          <NextLink
            href="/kontakt"
            className="text-success-600 hover:text-success-700 font-semibold text-lg underline"
          >
            Kontakt
          </NextLink>
        </div>
      </div>
    </div>
  );
}
