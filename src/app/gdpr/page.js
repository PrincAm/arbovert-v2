const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

export const metadata = {
  title: "Ochrana osobních údajů (GDPR) - Arbovert s.r.o.",
  description:
    "Informace o zpracování osobních údajů podle GDPR. Zjistěte, jak Arbovert s.r.o. chrání vaše osobní údaje a jaká máte práva.",
  openGraph: {
    title: "Ochrana osobních údajů (GDPR) - Arbovert s.r.o.",
    description: "Informace o zpracování osobních údajů podle GDPR.",
  },
};

export default function GDPR() {
  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground mb-16">
          Ochrana osobních údajů (GDPR)
        </h1>

        <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-default-200 space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Správce osobních údajů</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-2">
              <p>
                <strong>Arbovert s.r.o.</strong>
              </p>
              <p>Pasovská 84/37</p>
              <p>Vimperk, 38501</p>
              <p>IČO: 02059690</p>
              <p>DIČ: CZ02059690</p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Účel zpracování osobních údajů</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-3">
              <p>
                Vaše osobní údaje zpracováváme za účelem:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Zpracování a vyřízení vašich dotazů a poptávek</li>
                <li>Komunikace s vámi ohledně našich služeb</li>
                <li>Příprava a zasílání nezávazných nabídek</li>
                <li>Plnění smluvních závazků</li>
                <li>Plnění zákonných povinností</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Zpracovávané údaje</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-3">
              <p>Zpracováváme následující kategorie osobních údajů:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Jméno a příjmení</li>
                <li>E-mailová adresa</li>
                <li>Telefonní číslo</li>
                <li>Adresa (pokud je poskytnuta)</li>
                <li>Další údaje, které nám dobrovolně poskytnete v rámci komunikace</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Právní základ zpracování</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-3">
              <p>Osobní údaje zpracováváme na základě:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Vašeho souhlasu se zpracováním osobních údajů</li>
                <li>Plnění smlouvy nebo opatření před uzavřením smlouvy</li>
                <li>Plnění zákonných povinností</li>
                <li>Oprávněných zájmů správce</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Doba uchování údajů</h2>
            <div className="text-lg text-default-600 leading-relaxed">
              <p>
                Osobní údaje uchováváme pouze po dobu nezbytnou pro naplnění účelů, pro které byly shromážděny, nebo
                po dobu stanovenou zákonem. Po uplynutí této doby budou osobní údaje bezpečně zlikvidovány.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Předávání údajů třetím stranám</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-3">
              <p>
                Vaše osobní údaje neposkytujeme třetím stranám, kromě případů, kdy:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>K tomu dáte svůj výslovný souhlas</li>
                <li>Je to nezbytné pro plnění smlouvy nebo zákonných povinností</li>
                <li>Je to vyžadováno zákonem</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Vaše práva</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-3">
              <p>V souvislosti se zpracováním osobních údajů máte následující práva:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Právo na přístup k osobním údajům</li>
                <li>Právo na opravu nepřesných údajů</li>
                <li>Právo na výmaz údajů („právo být zapomenut")</li>
                <li>Právo na omezení zpracování</li>
                <li>Právo na přenositelnost údajů</li>
                <li>Právo vznést námitku proti zpracování</li>
                <li>Právo odvolat souhlas se zpracováním osobních údajů</li>
                <li>Právo podat stížnost u Úřadu pro ochranu osobních údajů</li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Kontakt</h2>
            <div className="text-lg text-default-600 leading-relaxed space-y-2">
              <p>
                Pro uplatnění vašich práv nebo pro jakékoli dotazy týkající se zpracování osobních údajů nás můžete
                kontaktovat:
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:info@arbovert.cz" className="text-success-600 hover:text-success-700 underline">
                  info@arbovert.cz
                </a>
              </p>
              <p>
                <strong>Telefon:</strong>{" "}
                <a href="tel:+420739969933" className="text-success-600 hover:text-success-700 underline">
                  +420 739 969 933
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Zabezpečení údajů</h2>
            <div className="text-lg text-default-600 leading-relaxed">
              <p>
                Pro zajištění ochrany vašich osobních údajů používáme vhodné technické a organizační opatření, která
                zabraňují neoprávněnému přístupu, ztrátě, zničení nebo změně osobních údajů.
              </p>
            </div>
          </section>
        </div>
      </div>
    </StyledContainer>
  );
}
