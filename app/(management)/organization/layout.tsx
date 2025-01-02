'use client'
import { DepartmentService } from "@/api/DepartmentService";
import { OrgService } from "@/api/OrgService";
import Layout from "@/components/Layout";
import CreateDeptPopover from "@/components/management/Organization/CreateDeptPopover";
import DepartmentList from "@/components/management/Organization/DepartmentList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Building2, CopyIcon, EyeIcon, PlusIcon } from "lucide-react";
import React, { Suspense, useEffect } from "react";

export default function OrganizationLayout({
  children,
  dept,
  pos
}: {
  children: React.ReactNode,
  dept: React.ReactNode,
  pos: React.ReactNode
}) {
  const [invitation, setInvitation] = React.useState<string>('')
  const [showCode, setShowCode] = React.useState<boolean>(false)

  const invitationQuery = useQuery({
    queryKey: ['invitation'],
    queryFn: () => OrgService.getInvitation(),
  })

  useEffect(() => {
    if (invitationQuery.data)
      setInvitation(invitationQuery.data.data.code)
  }, [invitationQuery])
  return (
    <div className="p-5 flex flex-col gap-5 h-full">
      <div className="flex justify-between items-center rounded-lg bg-white p-5 shadow">
        <div className="flex items-center gap-4">
          <Building2 size={24} className="text-primary" />
          <p className="font-semibold">Organization</p>
        </div>
      </div>
      <div className="grow grid grid-cols-12 gap-4 ">
        <div className="flex flex-row col-span-9 gap-4 items-stretch">
          {dept}
          {pos}
        </div>
        <div className="rounded-lg bg-white shadow p-5 col-span-3 sticky flex flex-col gap-4">
          <div className="flex flex-row w-full justify-center text-sm text-gray-700 font-semibold">
            Invitation code
          </div>
          <div className="flex flex-row justify-center p-5 rounded-xl bg-slate-100 text-primary text-xl tracking-widest font-bold">
            {invitationQuery.isPending ? 'Loading' : showCode ? invitation : '********'}
          </div>
          <Button
            variant='outline'
            onClick={() => setShowCode(!showCode)}
          >
            <EyeIcon />
            Show
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              navigator.clipboard.writeText(invitationQuery.data?.data.code)
              toast({
                variant: "default",
                title: "Copied to clipboard",
              });
            }}
          >
            <CopyIcon />
            Copy
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

