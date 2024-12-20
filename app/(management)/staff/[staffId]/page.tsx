"use client";

import Layout from "@/components/Layout";
import StaffDetailsAttendance from "@/components/management/Staff/StaffDetailsAttendance";
import StaffDetailsGeneral from "@/components/management/Staff/StaffDetailsGeneral";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";

const StaffDetails = ({ params }: { params: { staffId: string } }) => {
  const staffId = params.staffId;
  const router = useRouter();

  const [staffDetails, setStaffDetails] = useState({
    id: "",
    name: "Khải Khải",
    phone: "0123456789",
    email: "sampleEmail@gmail.com",
    avatar: "https://picsum.photos/200",
  });

  // fetch staff details data
  useEffect(() => {}, []);

  return (
    <Layout>
      <div className="p-5">
        <Tabs defaultValue="general" className="space-y-6">
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
            <TabsList className="bg-white h-12">
              <TabsTrigger value="general" className="p-2">
                General
              </TabsTrigger>
              <TabsTrigger value="attendance" className="p-2">
                Attendance
              </TabsTrigger>
            </TabsList>

            {/* Staff header infor */}
            <div className="bg-white grid grid-cols-2 gap-10 p-4 rounded-lg shadow">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={staffDetails.avatar} />
                  <AvatarFallback>AVT</AvatarFallback>
                </Avatar>
                <span className="text-lg text-muted-foreground font-medium">
                  {staffDetails.name}
                </span>
              </div>
              <div className="space-y-1 text-muted-foreground font-medium text-sm">
                <div>Phone: {staffDetails.phone}</div>
                <div>Email: {staffDetails.email}</div>
              </div>
            </div>
          </div>

          {/* Tabs content */}
          <div>
            <TabsContent value="general">
              <StaffDetailsGeneral id={staffId} />
            </TabsContent>
            <TabsContent value="attendance">
              <StaffDetailsAttendance id={staffId} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StaffDetails;
