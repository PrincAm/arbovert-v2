import Image from "next/image";

const Trusted = () => (
  <div className="max-w-screen-lg mx-auto w-full flex flex-col items-center pt-20 pb-20 px-6">
    <h1 className="leading-tight text-4xl md:text-6xl font-bold text-foreground mb-12">
      Spokojení zákazníci
    </h1>
    <div className="grid grid-cols-12 gap-8 md:gap-10 justify-center items-center w-full">
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <Image
          src="/images/reference/lisno.png"
          width={100}
          height={100}
          alt="logo zamen lisno"
          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <Image
          src="/images/reference/mnisek.png"
          width={100}
          height={100}
          alt="logo mesto mnisek pod brdy"
          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <Image
          src="/images/reference/povodni.png"
          width={100}
          height={100}
          alt="logo povodi labe"
          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <Image
          src="/images/reference/ttp-logo.png"
          width={100}
          height={100}
          alt="logo ttp"
          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <Image
          src="/images/reference/vimperk.png"
          width={100}
          height={100}
          alt="logo mesto vimperk"
          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="col-span-4 md:col-span-2 flex justify-center">
        <Image
          src="/images/reference/vsem.png"
          width={100}
          height={100}
          alt="logo vsem"
          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </div>
  </div>
);

export default Trusted;
