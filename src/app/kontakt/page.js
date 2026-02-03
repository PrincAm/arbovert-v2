import { Card } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ContactUs from "../../components/ContactUs";

const StyledContainer = ({ children, className = "", ...props }) => (
  <div className={`flex bg-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

const StyledIcon = ({ className = "", ...props }) => (
  <FontAwesomeIcon className={`text-3xl text-success-500 flex-shrink-0 ${className}`} {...props} />
);

const ContactPerson = ({ children, className = "", ...props }) => (
  <h3 className={`flex items-center justify-center pt-8 pb-8 text-2xl md:text-3xl font-semibold text-foreground ${className}`} {...props}>
    {children}
  </h3>
);

export const metadata = {
  title: "Kontakt - Arbovert s.r.o. | Arboristické služby",
  description:
    "Kontaktujte nás pro arboristické služby. Sídlo ve Vimperku, pobočka v Praze. Lukáš Kačer - certifikovaný arborista s 12+ lety zkušeností.",
  openGraph: {
    title: "Kontakt - Arbovert s.r.o. | Arboristické služby",
    description: "Kontaktujte nás pro arboristické služby. Sídlo ve Vimperku, pobočka v Praze. Lukáš Kačer - certifikovaný arborista.",
    images: [
      {
        url: "https://arbovert.cz/images/aboutUs.jpg",
        width: 800,
        height: 600,
        alt: "Kontakt Arbovert",
      },
    ],
  },
};

export default function Contact() {
  return (
    <StyledContainer>
      <div className="max-w-screen-lg mx-auto w-full pt-8 md:pt-20 pb-12 md:pb-20 px-4 md:px-6">
        <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground mb-12">
          Kontakt
        </h1>
        <Card className="p-12 md:p-16 mb-10 shadow-none border-2 border-default-200 rounded-2xl">
          <ContactPerson>
            <StyledIcon icon={faUser} />
            Lukáš Kačer
          </ContactPerson>
          <div className="grid grid-cols-12 gap-8 md:gap-10">
            <div className="col-span-12 md:col-span-4 flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">Sídlo firmy</h3>
              <p className="text-lg text-default-600 leading-relaxed">
                Arbovert s.r.o. <br />
                Pasovská 84/37 <br />
                Vimperk, 38501
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">Pobočka</h3>
              <p className="text-lg text-default-600 leading-relaxed">
                Jirsíkova 484/6 <br />
                Praha 8, 180 00
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">IČO</h3>
              <p className="text-lg text-default-600 leading-relaxed">02059690</p>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-6 text-foreground">DIČ</h3>
              <p className="text-lg text-default-600 leading-relaxed">CZ02059690</p>
            </div>
          </div>
          <ContactUs />
        </Card>
      </div>
    </StyledContainer>
  );
}
