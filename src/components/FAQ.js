"use client";

import { Accordion } from "@heroui/react";
import FadeIn from "./FadeIn";
import { faqItems } from "../data/faq";

export default function FAQ() {
  return (
    <div className="bg-white py-16 md:py-20">
      <div className="max-w-screen-lg mx-auto w-full px-6">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
            Často kladené otázky
          </h2>
          <Accordion>
            {faqItems.map((item, index) => (
              <Accordion.Item key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger className="text-lg md:text-xl">
                    {item.question}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </div>
  );
}
