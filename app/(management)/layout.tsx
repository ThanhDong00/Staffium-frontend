'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Layout from "@/components/Layout";
import { useGlobalContext } from "../provider";
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/hooks/useUser';
import { Input } from '@/components/ui/input';
import Image from "next/image";
import logo from "../../public/Logo-full.png";
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { OrgService } from '@/api/OrgService';
import { UserService } from '@/api/UserService';
import { toast } from '@/hooks/use-toast';
import Spinner from '@/components/Feedback/Spinner';

// const user = {
//   name: 'Khair'
// }
export default function ManagamentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { progress, triggerProgress } = useGlobalContext();
  const [isTrigger, setIsTrigger] = useState<boolean>(false)
  const handleTrigger = (state: boolean) => {
    setIsTrigger(state)
    setTimeout(() => triggerProgress(), 500)
  }
  const [code, setCode] = useState<string>('')
  const userHook = useUser()


  const userMutation = useMutation({
    mutationFn: () => UserService.getMe(),
    onSuccess: (res) => {
      if (res.status === 200) {
        userHook.setDisplayName(res.data.display_name)
        if (res.data.organization_id) {
          userHook.setOrg(res.data.organization_id._id)
        }

      }
    }
  })

  const joinOrgMutation = useMutation({
    mutationFn: (code: string) => UserService.joinOrg(code),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: 'default',
          title: `Join successfully`
        })
        userMutation.mutate()
      }
      else {
        toast({
          variant: 'destructive',
          title: `Failed to join`
        })
      }
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to join`
      })
    }
  })
  return (
    <>
      {isTrigger && <Progress value={progress} className="w-full fixed top-0 z-50" />}
      {/* <div><Spinner /></div> */}
      {(userHook.getOrg() !== null && userHook.getOrg() !== undefined) ?
        <Layout trigger={handleTrigger}>
          {children}
        </Layout>
        :
        <div className='w-full h-screen flex flex-col gap-4 justify-center items-center'>
          <Image className="fixed top-12" src={logo} alt="Logo" height={32} />
          <h1 className='text-2xl font-semibold'>Join an organization</h1>
          <div className='w-1/4 flex flex-col gap-4'>
            <div className='flex flex-col gap-2 items-center'>
              <h2 className='text-md font-normal'>Enter invitation code</h2>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <Button className='w-full' onClick={() => joinOrgMutation.mutate(code)}>Join</Button>
          </div>
        </div>
      }


    </>

  )
}
