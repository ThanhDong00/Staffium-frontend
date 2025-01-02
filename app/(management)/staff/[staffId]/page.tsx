"use client";

import { StaffResponse } from "@/api/constant/response";
import { StaffService } from "@/api/StaffService";
import Layout from "@/components/Layout";
import StaffDetailsAttendance from "@/components/management/Staff/StaffDetailsAttendance";
import StaffDetailsGeneral from "@/components/management/Staff/StaffDetailsGeneral";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

const StaffDetails = ({ params }: { params: { staffId: string } }) => {
  const staffId = params.staffId;
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["staff", staffId],
    queryFn: async () => {
      const response = await StaffService.getStaffById(staffId);
      return response.data;
    },
  });

  console.log(data);
  if (error) return <div>Error loading staff data</div>;

  return (
    <>
      <div className="p-5 space-y-5">
        {/* <Tabs defaultValue="general" className="space-y-6"> */}
        {/* Header in staff */}
        <div className="flex w-full justify-between items-center">
          {/* Button back to staff */}
          <Button
            className="bg-white text-forground hover:bg-muted-foreground hover:text-white"
            onClick={() => router.push("/staff")}
          >
            <LuArrowLeft className="w-4 h-4" />
          </Button>

          {/* Tabs trigger */}
          {/* <TabsList className="bg-white h-12">
              <TabsTrigger value="general" className="p-2">
                General
              </TabsTrigger>
              <TabsTrigger value="attendance" className="p-2">
                Attendance
              </TabsTrigger>
            </TabsList> */}


          {/* Staff header infor */}
          <div className="bg-white grid grid-cols-2 gap-10 p-4 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={""} />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
              <span className="text-lg text-muted-foreground font-medium">
                {data?.first_name + ' ' + data?.last_name || "Not provided"}
              </span>
            </div>
            <div className="space-y-1 text-muted-foreground font-medium text-sm">
              <div>Phone: {data?.phone || "Not provided"}</div>
              <div>Email: {data?.email || "Not provided"}</div>
            </div>
          </div>
        </div>

        {data ? (
          <StaffDetailsGeneral id={staffId} staffInformation={data} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default StaffDetails;
