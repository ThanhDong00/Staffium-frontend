import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import icon3d from "../public/3dicons 1.png";
import logo from "../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoDiamondOutline } from "react-icons/io5";

export default function LandingPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-18 py-16 md:py-24">
        <div className="grid md:grid-cols-3 items-center gap-y-8">
          <div className=" px-16 col-span-2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mx-auto">
              Leadership is taking care of those in your charge.
            </h1>
            <p className="text-md text-gray-600 italic py-4 px-2 text-right">
              - Simon Sinek -
            </p>
          </div>

          <div className="w-full max-w-md mx-auto p-2">
            <Image
              className=""
              src={icon3d}
              alt="Logo"
              width={185}
              height={185}
            />
          </div>

          <div className="rounded-lg p-6 bg-slate-100 col-span-3 items-center mx-auto">
            <p className="text-lg text-muted-foreground">
              The way management treats associates is how they will treat
              customers.
            </p>
          </div>
        </div>
      </section>

      <section className=" bg-primary py-12">
        <div className="flex flex-col gap-y-4 container mx-auto">
          <div className="rounded-md bg-indigo-400 w-fit px-4 py-3 flex gap-2 items-center">
            <IoDiamondOutline size={24} color="white" />
            <p className="text-lg text-white font-semibold">Feature 1</p>
            <p className="text-lg text-wrap text-white pl-6">
              Be life confident Wall Street you can bank on portfolio <br />
              upside downside yield to broker makin' chedda sure thing.
            </p>
          </div>
          <div className="rounded-md bg-indigo-400 w-fit px-4 py-3 flex gap-2 items-center ml-auto">
            <IoDiamondOutline size={24} color="white" />
            <p className="text-lg text-white font-semibold">Feature 2</p>
            <p className="text-lg text-wrap text-white pl-6">
              Be life confident Wall Street you can bank on portfolio <br />
              upside downside yield to broker makin' chedda sure thing.
            </p>
          </div>
          <div className="rounded-md bg-indigo-400 w-fit px-4 py-3 flex gap-2 items-center">
            <IoDiamondOutline size={24} color="white" />
            <p className="text-lg text-white font-semibold">Feature 3</p>
            <p className="text-lg text-wrap text-white pl-6">
              Be life confident Wall Street you can bank on portfolio <br />
              upside downside yield to broker makin' chedda sure thing.
            </p>
          </div>
          <div className="rounded-md bg-indigo-400 w-fit px-4 py-3 flex gap-2 items-center ml-auto">
            <IoDiamondOutline size={24} color="white" />
            <p className="text-lg text-white font-semibold">Feature 4</p>
            <p className="text-lg text-wrap text-white pl-6">
              Be life confident Wall Street you can bank on portfolio <br />
              upside downside yield to broker makin' chedda sure thing.
            </p>
          </div>
        </div>
      </section>

      <section className=" container mx-auto p-16">
        <h2 className="text-3xl font-bold text-center text-primary">
          Our customer
        </h2>

        <div className="m-24 flex gap-8 flex-wrap justify-center">
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
          <div className="flex gap-2 items-center">
            <Image className="" src={logo} alt="Logo" width={32} height={32} />
            <span className="text-xl font-semibold">Staffium</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="rounded-md bg-slate-100 w-fit px-4 py-3">
            <p className=" text-lg ">
              "This platform has transformed the way we manage our team! Super
              user-friendly and efficient."
            </p>
            <p className=" text-lg text-right text-gray-600 mt-2">John Doe</p>
          </div>
          <div className="rounded-md bg-slate-100 w-fit px-4 py-3 ml-auto">
            <p className=" text-lg ">
              "Absolutely love the seamless interface and how easy it is to
              track our staff's progress."
            </p>
            <p className=" text-lg text-right text-gray-600 mt-2">Jane Doe</p>
          </div>
          <div className="rounded-md bg-slate-100 w-fit px-4 py-3">
            <p className=" text-lg ">
              "The perfect solution for our HR needs—intuitive, reliable, and
              packed with useful features!"
            </p>
            <p className=" text-lg text-right text-gray-600 mt-2">
              who’s know?
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
