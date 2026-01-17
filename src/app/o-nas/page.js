import Image from "next/image";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

export const metadata = {
  title: "O nás - Arbovert s.r.o. | Certifikovaní arboristé od roku 2011",
  description:
    "Arbovert s.r.o. - tým certifikovaných arboristů s 12+ lety zkušeností. Specializujeme se na rizikové kácení, ošetřování stromů, inventarizace dřevin a údržbu zahrad.",
  openGraph: {
    title: "O nás - Arbovert s.r.o. | Certifikovaní arboristé od roku 2011",
    description: "Arbovert s.r.o. - tým certifikovaných arboristů s 12+ lety zkušeností. Specializujeme se na rizikové kácení, ošetřování stromů a údržbu zahrad.",
    images: [
      {
        url: "https://arbovert.cz/images/aboutUs.jpg",
        width: 800,
        height: 600,
        alt: "O nás - Arbovert tým",
      },
    ],
  },
};

export default function AboutUs() {
  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-20 pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-3xl md:text-6xl font-bold text-foreground mb-8 md:mb-12">
          O nás
        </h1>
        <div className="grid grid-cols-12 gap-4 md:gap-10 mb-6 md:mb-10 bg-white rounded-2xl p-4 md:p-12 border-2 border-default-200">
          <div className="col-span-12 md:col-span-7 flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground">Arbovert</h2>
            <p className="text-base md:text-lg text-default-600 leading-relaxed">
              Arboristikou se zabýváme již od roku 2011. Jsme tým certifikovaných pracovníků. Naší hlavní činností není jen
              rizikové kácení a těžba stromů, ale i ošetřování a prořezávání stromů, které rostou na nejrůznějších špatně přístupných
              místech. Součástí naší práce je také ošetřování ovocných stromů a údržba zahrad, včetně likvidace dřeva biomasy a dřevní hmoty.
              Arbovert se orientuje na arboristikou, kompletní péči o dřeviny, rizikové kácení, instalaci stabilizačních systémů, odborné
              posudky a poradenství. Příroda, stromy a naše práce nás baví a inspiruje, proto se stále v oboru vzděláváme a chceme jít
              dopředu, pro 100% odbornost na Vašich stromech a zahradách.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5">
            <Image
              src="/images/aboutUs.jpg"
              width={400}
              height={300}
              alt="man in front of tree"
              className="w-full h-auto rounded-lg object-cover"
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
