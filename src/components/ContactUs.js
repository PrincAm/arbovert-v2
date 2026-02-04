"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Button,
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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};

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
    <div className="bg-white py-16 md:py-24" id="contact">
      <div className="max-w-screen-md mx-auto w-full px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Nezávazná nabídka zdarma
          </h2>
          <p className="text-lg text-gray-600">
            Ozveme se vám do příštího pracovního dne
          </p>
        </div>

        {/* Quick contact */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 pb-12 border-b border-gray-200">
          <a
            href="tel:+420739969933"
            className="flex items-center gap-3 text-lg md:text-xl font-semibold text-foreground hover:text-success-600 transition-colors"
          >
            <FontAwesomeIcon icon={faPhone} className="text-xl text-success-500" />
            +420 739 969 933
          </a>
          <span className="hidden sm:block text-gray-300">|</span>
          <a
            href="mailto:info@arbovert.cz"
            className="flex items-center gap-3 text-lg md:text-xl font-semibold text-foreground hover:text-success-600 transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-xl text-success-500" />
            info@arbovert.cz
          </a>
        </div>

        {isSubmitted ? (
          <div className="text-center py-12 bg-success-50 rounded-2xl">
            <div className="text-5xl mb-4">✓</div>
            <p className="text-xl font-semibold text-success-700 mb-2">
              Děkujeme za odeslání dotazu
            </p>
            <p className="text-gray-600">
              Byl Vám zaslán potvrzující email. Ozveme se vám do příštího pracovního dne.
            </p>
          </div>
        ) : (
          <Form name="contact" method="post" onSubmit={onSubmit} className="space-y-6" validationBehavior="native">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label className="font-medium text-gray-700 mb-2">Jméno *</Label>
                <Input
                  placeholder="Vaše jméno"
                  className="border-2 border-gray-200 bg-white rounded-xl h-12 px-4 hover:border-gray-300 focus:border-success-500"
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
                <Label className="font-medium text-gray-700 mb-2">Email *</Label>
                <Input
                  placeholder="vas@email.cz"
                  className="border-2 border-gray-200 bg-white rounded-xl h-12 px-4 hover:border-gray-300 focus:border-success-500"
                />
                <FieldError className="text-danger-500 text-sm mt-1" />
              </TextField>
            </div>

            <TextField name="telefon" type="tel" className="w-full">
              <Label className="font-medium text-gray-700 mb-2">Telefon</Label>
              <Input
                placeholder="+420"
                className="border-2 border-gray-200 bg-white rounded-xl h-12 px-4 hover:border-gray-300 focus:border-success-500"
              />
            </TextField>

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
              <Label className="font-medium text-gray-700 mb-2">
                Popište váš problém *
              </Label>
              <TextArea
                placeholder="Co potřebujete? Kde se nachází strom/stromy? Máte fotky?"
                rows={5}
                className="border-2 border-gray-200 bg-white rounded-xl px-4 py-3 hover:border-gray-300 focus:border-success-500"
              />
              <FieldError className="text-danger-500 text-sm mt-1" />
            </TextField>

            <div className="pt-2">
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
                  <Label className="text-sm text-gray-600">
                    Souhlasím se{" "}
                    <Link
                      as={NextLink}
                      href="/gdpr"
                      className="text-success-600 underline hover:text-success-700"
                      target="_blank"
                    >
                      zpracováním osobních údajů
                    </Link>{" "}
                    *
                  </Label>
                </Checkbox.Content>
              </Checkbox>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-12 py-6 rounded-full transition-colors w-full sm:w-auto"
                radius="full"
              >
                Odeslat poptávku
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
