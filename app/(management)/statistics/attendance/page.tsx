"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { CalendarIcon, ChartColumnBig, FileSpreadsheet } from "lucide-react";
import ChartsToolTip from "@/components/management/Statistics/ChartsToolTip";
import MyAreaChart from "@/components/management/Statistics/AreaChart";
import { Button } from "@/components/ui/button";
import TimeFilter from "@/components/management/Statistics/TimeFilter";

const StatisticAttendance = () => {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-lg bg-white p-5 shadow">
          <div className="flex items-center gap-4">
            <ChartColumnBig size={24} className="text-primary" />
            <p className="font-semibold">Attendance statistic</p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow mt-5 grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
          <div className="col-span-9 overflow-y-auto relative [&::-webkit-scrollbar]:hidden">
            <div>
              <p className="font-medium">Presence rate</p>
              <ChartsToolTip />
            </div>
            <div>
              <p className="my-5 font-medium">Chart</p>
              <MyAreaChart />
            </div>
          </div>

          <div className="col-span-3 sticky">
            <TimeFilter />
            <hr />
            <Button className="w-full mt-5">
              <FileSpreadsheet />
              Export
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticAttendance;
