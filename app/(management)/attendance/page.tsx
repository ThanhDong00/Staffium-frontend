"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import MultiFilter from "@/components/management/MultiFilter";
import { CalendarX2, LogOut, Timer, CheckCheck, ScanFace } from "lucide-react";
import AttendanceTable from "@/components/management/Attendance/AttendanceTable";
import SelectedFilter from "@/components/management/SelectedFilter";
import NumberWidget from "@/components/management/NumberWidget";
import { AttendanceService } from "@/api/AttendanceService";
import { useQuery } from "@tanstack/react-query";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const filter = ["All", "Check in", "Check out", "Late", "Off", "OT"];

const ITEM_PER_PAGE = 10;

interface Totals {
  totalCheckin: number;
  totalCheckout: number;
}

const Attendance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    gender: "",
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["attendance", currentPage, filters],
    queryFn: async () => {
      const response = await AttendanceService.getAllTodayAttendance(
        currentPage,
        ITEM_PER_PAGE,
        1,
        1,
        filters.search,
        filters.department,
        filters.gender
      );
      setPageSize(response.data.totalPage);
      return response.data;
    },
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

  const totals = useMemo(() => {
    return data?.items.reduce(
      (acc: Totals, curr: any) => ({
        totalCheckin: acc.totalCheckin + (curr.check_in ? 1 : 0),
        totalCheckout: acc.totalCheckout + (curr.check_out ? 1 : 0),
      }),
      { totalCheckin: 0, totalCheckout: 0 }
    );
  }, [data?.items]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) return <div>Error loading staff data</div>;

  return (
    <div className="p-5">
      <div className="flex justify-between items-center rounded-lg bg-white px-6 py-3 shadow">
        <div className="flex items-center gap-4">
          <ScanFace size={24} className="text-blue-500" />
          <p className=" font-semibold">Today attendance</p>
        </div>
        <p className=" italic">
          See attendance list in orther days / orther ranges ... at{" "}
          <Link
            href="/statistics/attendance"
            className="text-blue-500 underline"
          >
            Statistics
          </Link>
        </p>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
        <NumberWidget
          title="Check-in"
          Icon={CheckCheck}
          value={totals?.totalCheckin ?? 0}
        />

        <NumberWidget
          title="Check-out"
          Icon={LogOut}
          value={totals?.totalCheckout ?? 0}
        />

        {/* <NumberWidget title="Late" Icon={Timer} value="123" />

          <NumberWidget title="Off" Icon={CalendarX2} value="123" /> */}
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

      <div className="mt-5 h-[calc(100vh-275px)] overflow-y-auto border bg-white rounded-lg shadow">
        <AttendanceTable dataList={data?.items} />
      </div>

      <div className="flex justify-end mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {[...Array(pageSize)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < pageSize && handlePageChange(currentPage + 1)
                }
                className={
                  currentPage === pageSize
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Attendance;
