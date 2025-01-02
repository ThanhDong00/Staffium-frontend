'use client'
import { DepartmentService } from "@/api/DepartmentService";
import { OrgService } from "@/api/OrgService";
import Layout from "@/components/Layout";
import DepartmentList from "@/components/management/Organization/DepartmentList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Building2, CopyIcon } from "lucide-react";
import React, { Suspense } from "react";

const Organization = () => {

  const deptQuery = useQuery({
    queryKey: ['depts'],
    queryFn: () => DepartmentService.getAllDept(),
  })
  const invitationQuery = useQuery({
    queryKey: ['invitation'],
    queryFn: () => OrgService.getInvitation(),
  })
  return (
    <div className="p-5">
      <div className="flex justify-between items-center rounded-lg bg-white p-5 shadow">
        <div className="flex items-center gap-4">
          <Building2 size={24} className="text-primary" />
          <p className="font-semibold">Organization</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        <div className="flex flex-col rounded-lg bg-white shadow p-5 col-span-9 overflow-y-auto relative [&::-webkit-scrollbar]:hidden">
          <div className="">
            <div className="text-lg text-gray-800 py-2 border-b-2 border-gray-300">
              Department
            </div>
            {deptQuery.isPending ?
              <Skeleton className="h-[125px] w-[250px] rounded-xl"></Skeleton>
              :
              <DepartmentList deptList={deptQuery.data.data} />

            }
          </div>
        </div>

        <div className="rounded-lg bg-white shadow p-5 col-span-3 sticky flex flex-col gap-4">
          <div className="flex flex-row w-full justify-center text-sm text-gray-700 font-semibold">
            Invitation code
          </div>
          <div className="flex flex-row justify-center p-5 rounded-xl bg-slate-100 text-primary text-xl tracking-widest font-bold">
            {invitationQuery.isPending ? 'Loading' : invitationQuery.data.data.code}
          </div>
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
    </div>
  );
};

export default Organization;
