"use client";

import React, { HTMLInputTypeAttribute, useState } from "react";
import Image from "next/image";
import sideBackground from "../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import { useMutation } from "@tanstack/react-query";
import { SignInForm } from "@/api/constant/request";
import { AuthService } from "@/api/AuthService";
import LoginSession from "@/app/cookie";
import { USER_ROLES } from "@/constants/enum";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../provider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { progress, triggerProgress } = useGlobalContext();
  const { toast } = useToast();
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] =
    useState<HTMLInputTypeAttribute>("password");

  const loginMutation = useMutation({
    mutationFn: (form: SignInForm) => {
      return AuthService.signIn(form);
    },
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: "default",
          title: "Sign up successful!",
          description: "Please make you first login.",
        });
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Fail to sign up!",
          description: `${res.message.message}`,
        });
      }
      switch (LoginSession.role()) {
        case USER_ROLES.HR:
          router.replace("/dashboard");
          break;
        case USER_ROLES.STAFF:
          router.replace("/personal");
          break;
        default:
          break;
      }
    },
    onError: (error) => console.error(error),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    loginMutation.mutate({
      username: loginData.email,
      password: loginData.password,
    } as SignInForm);
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
      {loginMutation.isPending === true && (
        <Progress value={progress} className="w-full" />
      )}

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
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex flex-row gap-2 ">
                <Input
                  id="password"
                  type={showPassword}
                  placeholder="password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                  autoComplete="off"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setShowPassword((prev) => {
                      if (prev === "password") return "text";
                      else return "password";
                    })
                  }
                >
                  Show
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Do not remember your password?{" "}
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
              Do not have an account?{" "}
              <Link href="/whoareyou" className="text-primary hover:underline">
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
          fill
          sizes="(max-width: 768px) 0vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
