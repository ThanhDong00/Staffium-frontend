import React from "react";
import { Button } from "@/components/ui/button";
import logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="shadow-xl rounded">
      <div className="py-4 px-4 flex justify-between container mx-auto items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image className="" src={logo} alt="Logo" width={32} height={32} />
          <Link href="/" className="text-xl font-semibold">
            Staffium
          </Link>
        </div>

        {/* Link */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="#features"
            className="px-4 py-3 rounded-md text-gray-600 text-muted-foreground hover:bg-gray-100"
          >
            Features
          </Link>
          <Link
            href="#resource"
            className="px-4 py-3 rounded-md text-gray-600 text-muted-foreground hover:bg-gray-100"
          >
            Resource
          </Link>
          <Link
            href="#about"
            className="px-4 py-3 rounded-md text-gray-600 text-muted-foreground hover:bg-gray-100"
          >
            About
          </Link>
        </div>

        {/* Button  */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-gray-600">
            <Link href={"/login"}>Log in</Link>
          </Button>
          <Button className="bg-primary">
            <Link href={"/signup"}>Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
