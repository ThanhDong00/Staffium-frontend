"use client";

import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import Image from "next/image";
import sideBackground from "../../public/dreamlike-surrealistic-landscape 1.png";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SignUpForm } from "@/api/constant/request";
import { AuthService } from "@/api/AuthService";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useGlobalContext } from "../provider";

const Register = () => {
  const { progress, triggerProgress } = useGlobalContext()

  const searchParams = useSearchParams()
  const role = searchParams.get('role')

  const { toast } = useToast()

  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState<string | null>(null)

  const [showPassword, setShowPassword] = useState<HTMLInputTypeAttribute>('password')
  const [showRePassword, setShowRePassword] = useState<HTMLInputTypeAttribute>('password')

  const signUpMutation = useMutation({
    mutationFn: (form: SignUpForm) => AuthService.signUp(form),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: 'default',
          title: "Sign up successful!",
          description: "Please make you first login.",
        })
        router.push('/login')
      }
      else {
        toast({
          variant: 'destructive',
          title: "Fail to sign up!",
          description: `${res.message.message}`,
        })
      }

    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: "Fail to sign up!",
        description: "Please try again.",
      })
    }
  })

  const verifyForm = () => {
    return formData.password === formData.rePassword
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (verifyForm()) {
      triggerProgress()
      signUpMutation.mutate({
        username: formData.email,
        password: formData.password,
        roles: [role]
      } as SignUpForm)
    }
    else {
      setError("Passwords are not the same!");
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
      {signUpMutation.isPending ?
        <Progress value={progress} className="w-full" />
        :
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
                <div className="flex flex-row gap-2 ">
                  <Input
                    id="password"
                    type={showPassword}
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowPassword(prev => {
                      if (prev === 'password')
                        return 'text'
                      else
                        return 'password'
                    })}>Show</Button>
                </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="re-password">Re-enter Password</Label>
                <div className="flex flex-row gap-2 ">
                  <Input
                    id="re-password"
                    type={showRePassword}
                    placeholder="re-password"
                    value={formData.rePassword}
                    onChange={(e) =>
                      setFormData({ ...formData, rePassword: e.target.value })
                    }
                    required
                  />
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setShowRePassword(prev => {
                      if (prev === 'password')
                        return 'text'
                      else
                        return 'password'
                    })}>Show</Button>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
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
      }

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
