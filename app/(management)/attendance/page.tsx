"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import MultiFilter from "@/components/management/MultiFilter";
import { CalendarX2, LogOut, Timer, CheckCheck, ScanFace } from "lucide-react";
import AttendanceTable from "@/components/management/Attendance/AttendanceTable";
import SelectedFilter from "@/components/management/SelectedFilter";
import NumberWidget from "@/components/management/NumberWidget";
import { AttendanceService } from "@/api/AttendanceService";

const filter = ["All", "Check in", "Check out", "Late", "Off", "OT"];

const ITEM_PER_PAGE = 10;

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    gender: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filter changes
    console.log(filters);
  };

  const [selected, setSelected] = useState("All");
  const handleSelectFilterClick = (label: string) => {
    setSelected(label);
  };

  const fetchAttendanceList = async (page: number) => {
    // Fetch all staff data
    const data = await AttendanceService.getAllTodayAttendance(
      page,
      ITEM_PER_PAGE,
      1,
      1,
      filters.search,
      filters.department,
      filters.gender
    );
    setAttendanceList(data.data.items);
    setPageSize(data.data.totalPage);
  };

  useEffect(() => {
    fetchAttendanceList(currentPage);
  }, [currentPage, filters]);

  console.log(attendanceList);

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
          <NumberWidget title="Check-in" Icon={CheckCheck} value="123" />

          <NumberWidget title="Check-out" Icon={LogOut} value="123" />

          <NumberWidget title="Late" Icon={Timer} value="123" />

          <NumberWidget title="Off" Icon={CalendarX2} value="123" />
        </div>

        <div className="mt-5">
          <SelectedFilter
            datas={filter}
            valueSelected={selected}
            handleClick={handleSelectFilterClick}
          />
        </div>

        <div className="mt-5">
          <MultiFilter filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div className="mt-5">
          <AttendanceTable />
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
