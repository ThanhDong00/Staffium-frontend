"use client";

import React, { useState } from "react";
import Image from "next/image";
import sideBackground from "../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("fromData", formData);
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
      {/* Login Form Section */}
      <div className="flex flex-col items-start justify-center px-4 sm:px-8 lg:px-12 xl:px-32 ">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-semibold text-center">
            Create an account
          </h1>
          <p className="text-sm text-center mt-2 mb-8">
            Create an account to start your journey with us.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="staffium@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="re-password">Re-enter Password</Label>
              <Input
                id="re-password"
                type="password"
                placeholder="re-password"
                value={formData.rePassword}
                onChange={(e) =>
                  setFormData({ ...formData, rePassword: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create
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
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default Register;
