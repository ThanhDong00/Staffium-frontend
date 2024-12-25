"use client";

import React, { useState } from "react";
import Image from "next/image";
import sideBackground from "../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import { USER_ROLES } from "@/constants/enum";

const WhoAreYou = () => {
  const router = useRouter();

  const [selectedValue, setSelectedValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedValue === "hr") {
      // Navigate to HR signup
      router.push(`/signup?role=${USER_ROLES.HR}`);
    } else if (selectedValue === "staff") {
      // Navigate to Staff signup
      router.push(`/signup?role=${USER_ROLES.STAFF}`);
    } else {
      setError("Please select an option");
      // console.log("Please select an option");
    }
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
              <RadioGroup onValueChange={handleRadioChange}>
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

            {error && <p className="text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              Next step
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Image Section */}
      <div className="hidden md:block relative bg-primary">
        <Image
          src={sideBackground}
          alt="Logo"
          fill
          sizes="(max-width: 768px) 0vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default WhoAreYou;
