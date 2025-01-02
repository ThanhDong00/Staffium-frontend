'use client'
import React from "react";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "@/api/DashboardService";
import Spinner from "@/components/Feedback/Spinner";
import { ATTENDANCE_TYPES } from "@/constants/enum";
import { useUser } from "@/hooks/useUser";

const DashBoard = () => {
  const dashboardQuery = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => DashboardService.getDashboard()
  })
  const countByType = (data: any, type: string) => {
    const count = data.reduce((acc: any, item: any) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {})[type]

    return count | 0
  }

  const DisplayCard = ({ label, value }: { label: string, value: number }) => {
    return (
      <div className=" grow bg-white shadow p-5 rounded-lg overflow-y-auto flex flex-col items-center gap-2">
        <p className="text-lg font-semibold flex flex-row">{label}</p>
        {
          dashboardQuery.isPending ?
            <div><Spinner /></div>
            :
            <p className="flex flex-row justify-center text-3xl font-bold text-primary px-6 py-3 rounded-xl bg-indigo-50">
              {value}
            </p>
        }
      </div>
    )
  }
  return (
    <div className="p-5 flex flex-col gap-5 h-full ">
      <div className="flex justify-between items-center rounded-lg bg-white p-5 shadow">
        <p className=" font-semibold">Welcome!</p>
        <p className=" italic">
          Every accomplishment starts with the decision to try
        </p>
      </div>

      <div className=" grid grid-cols-12 gap-4 ">
        <div className="flex flex-row col-span-3  gap-4 ">
          <DisplayCard
            label="Today attendance"
            value={dashboardQuery.isPending ? 0 :
              countByType(dashboardQuery.data.data.today_attendance, ATTENDANCE_TYPES.LATE) +
              countByType(dashboardQuery.data.data.today_attendance, ATTENDANCE_TYPES.EARLY) +
              countByType(dashboardQuery.data.data.today_attendance, ATTENDANCE_TYPES.WORK)
            }
          />
        </div>
        <div className="flex flex-row col-span-3  gap-4 ">
          <DisplayCard
            label="Today off"
            value={dashboardQuery.isPending ? 0 :
              countByType(dashboardQuery.data.data.today_attendance, ATTENDANCE_TYPES.OFF_AUTHORIZED) +
              countByType(dashboardQuery.data.data.today_attendance, ATTENDANCE_TYPES.OFF_UNAUTHORIZED)
            }
          />
        </div>
        <div className="flex flex-row col-span-3  gap-4 ">
          <DisplayCard
            label="Today request"
            value={dashboardQuery.isPending ? 0 :
              dashboardQuery.data.data.remaining_request.length
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
