import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import MultiFilter from "@/components/management/MultiFilter";
import { CalendarX2, LogOut, Timer, CheckCheck, ScanFace } from "lucide-react";
import AttendanceTable from "@/components/management/Attendance/AttendanceTable";
import SelectedFilter from "@/components/management/SelectedFilter";

const filter = ["All", "Check in", "Check out", "Late", "Off", "OT"];

const Attendance = () => {
  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-lg bg-white px-6 py-3 shadow">
          <div className="flex items-center gap-4">
            <ScanFace size={24} className="text-blue-500" />
            <p className=" font-semibold">Today attendance</p>
          </div>
          <p className=" italic">
            See attendance list in orther days / orther ranges ... at{" "}
            <Link href="/statistics" className="text-blue-500 underline">
              Statistics
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Check-in</p>
              <CheckCheck />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Check-out</p>
              <LogOut />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Late</p>
              <Timer />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Off</p>
              <CalendarX2 />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>
        </div>

        <div className="mt-5">
          <SelectedFilter datas={filter} />
        </div>

        <div className="mt-5">
          <MultiFilter />
        </div>

        <div className="mt-5">
          <AttendanceTable />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
