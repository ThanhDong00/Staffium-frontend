"use client";

import React, { useState } from "react";
import Image from "next/image";
import sideBackground from "../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
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
          <h1 className="text-4xl font-semibold mb-8 text-center">Log in</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="staffium@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't remember your password?{" "}
              <Link
                href="/resetpassword"
                className="text-primary hover:underline"
              >
                Reset password
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Create one
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

export default Login;
