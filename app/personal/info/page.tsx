"use client";

import { StaffResponse } from "@/api/constant/response";
import { StaffService } from "@/api/StaffService";
import StaffDetailsAttendance from "@/components/management/Staff/StaffDetailsAttendance";
import StaffDetailsGeneral from "@/components/management/Staff/StaffDetailsGeneral";
import ProfileInfoDetails from "@/components/Profile/ProfileInfoDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

export default function InfoPage({ params }: { params: { staffId: string } }) {
  const staffId = params.staffId;
  const router = useRouter();

  const myRecordQuery = useQuery({
    queryKey: ["my-record"],
    queryFn: async () => {
      const response = await StaffService.getMyRecord();
      return response.data;
    },
  });

  return (
    <>
      <div className="p-5 space-y-5">
        <div className="flex w-full justify-between items-center">
          <div className="bg-white grid grid-cols-2 gap-10 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
              <span className="text-lg text-muted-foreground font-medium">
                {myRecordQuery.data?.first_name + ' ' + myRecordQuery.data?.last_name || "Not provided"}
              </span>
            </div>
            <div className="space-y-1 text-muted-foreground font-medium text-sm">
              <div>Phone: {myRecordQuery.data?.phone || "Not provided"}</div>
              <div>Email: {myRecordQuery.data?.email || "Not provided"}</div>
            </div>
          </div>
        </div>

        {myRecordQuery.data ? (
          <ProfileInfoDetails information={myRecordQuery.data} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

