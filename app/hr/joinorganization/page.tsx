"use client";

import React, { useState } from "react";
import Image from "next/image";
import sideBackground from "../../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";

const JoinOrganization = () => {
  const [invatationCode, setInvatationCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(invatationCode);
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
          <h1 className="text-4xl font-semibold my-1 text-center">
            Join your organization
          </h1>
          <p className="text-sm text-center mb-8">
            Contact your HR to get invitation code
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Invitation code</Label>
              <Input
                id="invatation-code"
                type="text"
                placeholder="E.g. 1as24"
                value={invatationCode}
                onChange={(e) => setInvatationCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Join
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Your organization doesn't have one yet?{" "}
              <Link
                href="/hr/createworkspace"
                className="text-primary hover:underline"
              >
                Create a new one
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
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default JoinOrganization;
