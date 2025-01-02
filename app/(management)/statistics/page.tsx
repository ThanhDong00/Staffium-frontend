import React from "react";
import Layout from "@/components/Layout";
import { CheckCheck, LogOut, Timer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticsTable } from "@/components/management/Statistics/StatisticTable";
import StatisticsFilters from "@/components/management/Statistics/StatisticsFilters";
import NumberWidget from "@/components/management/NumberWidget";

const Statistics = () => {
  return (
    <>
      <div className="p-5">
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          {/* Attendance */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
              <div className=" col-span-4 grid grid-cols-4 gap-4">
                <NumberWidget
                  title="Working hours"
                  Icon={CheckCheck}
                  value="123"
                />
                <NumberWidget
                  title="Overtime hours"
                  Icon={LogOut}
                  value="123"
                />
                <NumberWidget title="Day off" Icon={Timer} value="2" />

                <div className=" col-span-4">
                  <StatisticsTable />
                </div>
              </div>
              <div className="w-full col-span-2">
                <StatisticsFilters />
              </div>
            </div>
          </TabsContent>

          {/* Requests */}
          <TabsContent value="requests">
            <div className="text-center py-12 text-muted-foreground">
              Requests statistics coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Statistics;
