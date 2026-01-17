"use client";

import { Button } from "@heroui/react";

const GoToFormButton = () => {
  const handleScrollToElement = (elementName) => {
    const element = document.getElementById(elementName);
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex">
      <div className="max-w-screen-lg mx-auto w-full flex flex-col items-center pt-20 pb-20 px-6">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold text-lg px-10 py-6 rounded-full"
          radius="full"
          onClick={() => handleScrollToElement("contact")}
        >
          Chci nabídku zdarma
        </Button>
      </div>
    </div>
  );
};

export default GoToFormButton;
