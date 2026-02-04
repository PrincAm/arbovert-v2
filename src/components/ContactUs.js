"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Button,
  Card,
  Checkbox,
  FieldError,
  Form,
  Input,
  Label,
  Link,
  TextArea,
  TextField,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import NextLink from "next/link";
import { useIsMobile } from "../hooks/use-media-query";

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = useIsMobile();
  const isPaddingRemoved = isMobile;

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
      data,
      process.env.NEXT_PUBLIC_EMAILJS_USER,
    );
    setIsSubmitted(true);
  };

  return (
    <div className={`max-w-6xl mx-auto w-full mt-20 mb-32 ${isPaddingRemoved ? "p-0" : "px-6"}`} id="contact">
      <Card variant="default" className="border-4 border-success rounded-3xl shadow-2xl bg-white">
        <Card.Content className={`${isMobile ? "p-6" : "p-12 md:p-20"} ${isMobile ? "space-y-8" : "space-y-14"}`}>
          <h1 className={`${isMobile ? "text-2xl" : "text-4xl md:text-6xl"} font-bold text-foreground text-center`}>Nezávazná nabídka zdarma</h1>

          <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? "gap-6" : "gap-10"}`}>
            <div className={`flex items-center ${isMobile ? "justify-start gap-3" : "justify-center gap-5"}`}>
              <FontAwesomeIcon icon={faPhone} className={`${isMobile ? "text-2xl" : "text-4xl"} text-success-500 flex-shrink-0`} />
              <a
                href="tel:+420739969933"
                className={`${isMobile ? "text-lg" : "text-2xl md:text-3xl"} font-bold text-foreground hover:text-success-500 transition-colors break-all`}
              >
                +420 739 969 933
              </a>
            </div>

            <div className={`flex items-center ${isMobile ? "justify-start gap-3" : "justify-center gap-5"}`}>
              <FontAwesomeIcon icon={faEnvelope} className={`${isMobile ? "text-2xl" : "text-4xl"} text-success-500 flex-shrink-0`} />
              <a
                href="mailto:info@arbovert.cz"
                className={`${isMobile ? "text-lg" : "text-2xl md:text-3xl"} font-bold text-foreground hover:text-success-500 transition-colors break-all`}
              >
                info@arbovert.cz
              </a>
            </div>
          </div>

          {isSubmitted ? (
            <div className={`text-center ${isMobile ? "space-y-4 py-6" : "space-y-6 py-12"}`}>
              <p className={`${isMobile ? "text-base" : "text-lg"} text-foreground/80`}>
                Děkujeme za odeslání dotazu, byl Vám zaslán potvrzující email.
              </p>
              <p className={`${isMobile ? "text-base" : "text-lg"} text-foreground/80`}>Ozveme se vám do příštího pracovního dne.</p>
            </div>
          ) : (
            <div className={isMobile ? "space-y-6" : "space-y-12"}>
              <h3 className={`${isMobile ? "text-xl" : "text-3xl md:text-4xl"} font-semibold text-center text-foreground`}>Nebo pomocí formuláře</h3>

              <Form name="contact" method="post" onSubmit={onSubmit} className={isMobile ? "space-y-6" : "space-y-10"} validationBehavior="native">
                <div className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? "gap-4" : "gap-8"}`}>
                  <TextField
                    name="name"
                    isRequired
                    validate={(value) => {
                      if (!value || value.trim() === "") {
                        return "Povinné";
                      }
                      return null;
                    }}
                    className="w-full"
                  >
                    <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"} text-foreground mb-2`}>Jméno</Label>
                    <Input
                      placeholder="Zadejte jméno"
                      className={`border-3 border-gray-300 bg-gray-50 rounded-2xl ${isMobile ? "h-12 px-3 text-base" : "h-16 px-4 text-lg"} hover:border-gray-400 focus:border-success-500 focus:bg-white`}
                    />
                    <FieldError className="text-danger-500 text-sm mt-1" />
                  </TextField>

                  <TextField
                    name="email"
                    type="email"
                    isRequired
                    validate={(value) => {
                      if (!value || value.trim() === "") {
                        return "Povinné";
                      }
                      if (!/^\S+@\S+\.\S+$/.test(value)) {
                        return "Špatný formát";
                      }
                      return null;
                    }}
                    className="w-full"
                  >
                    <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"} text-foreground mb-2`}>Email</Label>
                    <Input
                      placeholder="vas@email.cz"
                      className={`border-3 border-gray-300 bg-gray-50 rounded-2xl ${isMobile ? "h-12 px-3 text-base" : "h-16 px-4 text-lg"} hover:border-gray-400 focus:border-success-500 focus:bg-white`}
                    />
                    <FieldError className="text-danger-500 text-sm mt-1" />
                  </TextField>

                  <TextField name="telefon" type="tel" className="w-full">
                    <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"} text-foreground mb-2`}>Telefon</Label>
                    <Input
                      placeholder="+420"
                      className={`border-3 border-gray-300 bg-gray-50 rounded-2xl ${isMobile ? "h-12 px-3 text-base" : "h-16 px-4 text-lg"} hover:border-gray-400 focus:border-success-500 focus:bg-white`}
                    />
                  </TextField>
                </div>

                <TextField
                  name="problem"
                  isRequired
                  validate={(value) => {
                    if (!value || value.trim() === "") {
                      return "Povinné";
                    }
                    return null;
                  }}
                  className="w-full"
                >
                  <Label className={`font-semibold ${isMobile ? "text-base" : "text-lg"} text-foreground mb-2`}>
                    Seznamte nás s vaším problémem
                  </Label>
                  <TextArea
                    placeholder="Popište váš problém..."
                    rows={isMobile ? 5 : 8}
                    className={`border-3 border-gray-300 bg-gray-50 rounded-2xl ${isMobile ? "px-3 py-2 text-base min-h-[120px]" : "px-4 py-3 text-lg min-h-[200px]"} hover:border-gray-400 focus:border-success-500 focus:bg-white`}
                  />
                  <FieldError className="text-danger-500 text-sm mt-1" />
                </TextField>

                <div className="space-y-3 py-4">
                  <Checkbox
                    name="gdpr"
                    value="on"
                    isRequired
                    validate={(value) => {
                      if (value !== true) {
                        return "Povinné";
                      }
                      return null;
                    }}
                  >
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Content>
                      <Label className={`${isMobile ? "text-sm" : "text-lg md:text-xl"} leading-relaxed text-foreground`}>
                        Souhlasím se{" "}
                        <Link
                          as={NextLink}
                          href="/gdpr"
                          className={`${isMobile ? "text-sm" : "text-lg"} text-success-600 underline decoration-2 underline-offset-4 hover:text-success-700 transition-colors`}
                          target="_blank"
                        >
                          zpracováním osobních údajů
                        </Link>{" "}
                        dle GDPR.*
                      </Label>
                    </Checkbox.Content>
                  </Checkbox>
                </div>

                <p className={`${isMobile ? "text-base" : "text-xl md:text-2xl"} text-center text-foreground font-semibold ${isMobile ? "py-4" : "py-6"}`}>
                  Ozveme se vám do příštího pracovního dne.
                </p>

                <div className={`flex justify-center ${isMobile ? "pt-4" : "pt-6"}`}>
                  <Button
                    type="submit"
                    size="lg"
                    className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold ${isMobile ? "text-base px-12 py-5 w-full max-w-xs" : "text-2xl px-24 py-8"} rounded-full transition-colors shadow-md`}
                    radius="full"
                  >
                    Odeslat
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ContactUs;
