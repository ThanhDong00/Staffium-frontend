"use client";

import React, { useState } from "react";
import Image from "next/image";
import sideBackground from "../../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import logo from "@/public/logo.png";
import { Input } from "@/components/ui/input";

const CreateWorkspace = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    size: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
            Get started
          </h1>
          <p className="text-sm text-center mb-8">
            Let us know about your organization
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Your organization name</Label>
              <Input
                id="organization-name"
                type="text"
                placeholder="E.g. Meta"
                value={formData.organizationName}
                onChange={(e) =>
                  setFormData({ ...formData, organizationName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Size</Label>
              <Input
                id="size"
                type="text"
                placeholder="E.g. 50"
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                required
              />
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

export default CreateWorkspace;
