import { Card, Link } from "@heroui/react";
import Image from "next/image";

const Organisation = () => (
  <div className="flex bg-gray-50">
    <div className="max-w-screen-lg mx-auto w-full flex flex-col items-center pt-20 pb-20 px-6">
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground">
          Jsme členy SZKT
        </h1>
        <p className="text-lg md:text-xl font-medium text-default-600 leading-relaxed max-w-2xl">
          Společnost pro zahradní a krajinářskou tvorbu
        </p>
      </div>
      <Link href="https://szkt.cz/" target="_blank">
        <Card className="overflow-hidden border-2 border-success-500 hover:border-success-600 transition-colors duration-300 rounded-lg">
          <Image
            src="/images/szkt.svg"
            width={300}
            height={200}
            alt="SZKT logo"
            className="object-contain"
            style={{ width: "100%", height: "auto" }}
          />
        </Card>
      </Link>
    </div>
  </div>
);

export default Organisation;
