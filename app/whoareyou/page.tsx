"use client";

import React, { useState } from "react";
import Image from "next/image";
import sideBackground from "../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import logo from "@/public/logo.png";

const WhoAreYou = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedValue);
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative">
      <div className="absolute top-8 left-16 z-10">
        <div className="flex gap-2 items-center">
          <Image className="" src={logo} alt="Logo" width={32} height={32} />
          <Link href="/" className="text-xl font-semibold">
            Staffium
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col items-start justify-center px-4 sm:px-8 lg:px-12 xl:px-32 ">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-semibold mb-8 text-center">
            Who are you ?
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <RadioGroup onValueChange={setSelectedValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hr" id="hr" />
                  <Label htmlFor="hr">HR</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="staff" id="staff" />
                  <Label htmlFor="staff">Staff member</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Next step
            </Button>
          </form>
        </div>
      </div>

      {/* Decorative Image Section */}
      <div className="hidden md:block relative bg-primary">
        <Image
          src={sideBackground}
          alt="Logo"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default WhoAreYou;
