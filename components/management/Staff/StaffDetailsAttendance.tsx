import React from "react";
import NumberWidget from "@/components/management/NumberWidget";
import { CheckCheck, LogOut, Timer } from "lucide-react";
import StaffDetailsAttendanceTable from "./StaffDetailsAttendanceTable";
import StaffDetailsAttendanceFilter from "./StaffDetailsAttendanceFilter";

const StaffDetailsAttendance = ({ id }: { id: string }) => {
  return (
    // <div className="bg-white p-5 rounded-lg shadow">
    //   <div>StaffDetailsAttendance + {id}</div>
    // </div>
    <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
      <div className=" col-span-4 grid grid-cols-4 gap-4">
        <NumberWidget title="Working hours" Icon={CheckCheck} value="123" />
        <NumberWidget title="Overtime hours" Icon={LogOut} value="123" />
        <NumberWidget title="Day off" Icon={Timer} value="2" />

        <div className=" col-span-4">
          <StaffDetailsAttendanceTable />
        </div>
      </div>
      <div className="w-full col-span-2">
        <StaffDetailsAttendanceFilter />
      </div>
    </div>
  );
};

export default StaffDetailsAttendance;
