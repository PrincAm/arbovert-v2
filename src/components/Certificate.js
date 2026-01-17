import { Card, Link } from "@heroui/react";
import Image from "next/image";

const Certificate = () => (
  <div className="flex bg-gray-50">
    <div className="max-w-screen-lg mx-auto w-full flex flex-col items-center pt-20 pb-20 px-6">
      <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground mb-12">
        Máme evropskou certifikaci
      </h1>
      <Link href="https://www.eac-arboriculture.com/eac-intro.aspx" target="_blank">
        <Card className="overflow-hidden border-2 border-success-500 hover:border-success-600 transition-colors duration-300 rounded-lg">
          <Image
            src="/images/etw.png"
            width={300}
            height={200}
            alt="ETW logo"
            className="object-contain"
            style={{ width: "100%", height: "auto" }}
          />
        </Card>
      </Link>
    </div>
  </div>
);

export default Certificate;
