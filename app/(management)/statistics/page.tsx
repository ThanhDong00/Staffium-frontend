"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCheck, LogOut, Timer } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatisticsTable } from "@/components/management/Statistics/StatisticTable";
import StatisticsFilters from "@/components/management/Statistics/StatisticsFilters";

const buttons = ["Attendance", "Requests"];

const Statistics = () => {
  const [activeTab, setActiveTab] = useState("attendance");

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <div className="p-5">
        {/* <div className="flex gap-4 bg-white w-fit px-5 py-3 rounded-lg">
          {buttons.map((button) => (
            <Button
              key={button}
              onClick={() => handleClick(button.toLowerCase())}
              className={`${
                activeTab === button.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } hover:text-white`}
            >
              {button}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
          <div className=" col-span-4 grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className=" flex items-center justify-between">
                <p className="text-center font-semibold">Working hours</p>
                <CheckCheck />
              </div>
              <p className="text-start text-3xl font-semibold">123</p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className=" flex items-center justify-between">
                <p className="text-center font-semibold">Overtime hours</p>
                <LogOut />
              </div>
              <p className="text-start text-3xl font-semibold">123</p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className=" flex items-center justify-between">
                <p className="text-center font-semibold">Day off</p>
                <Timer />
              </div>
              <p className="text-start text-3xl font-semibold">2</p>
            </div>

            <div className=" col-span-4">
              <StatisticsTable />
            </div>
          </div>
          <div className="col-span-"> test</div>
        </div> */}

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              StatisticsMetrics
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="flex flex-col lg:flex-row gap-6 p-6">
                <div className="flex-1">
                  <StatisticsTable />
                </div>
                <div className="w-full lg:w-72">StatisticsFilters</div>
              </div>
            </div> */}
            <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
              <div className=" col-span-4 grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className=" flex items-center justify-between">
                    <p className="text-center font-semibold">Working hours</p>
                    <CheckCheck />
                  </div>
                  <p className="text-start text-3xl font-semibold">123</p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className=" flex items-center justify-between">
                    <p className="text-center font-semibold">Overtime hours</p>
                    <LogOut />
                  </div>
                  <p className="text-start text-3xl font-semibold">123</p>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className=" flex items-center justify-between">
                    <p className="text-center font-semibold">Day off</p>
                    <Timer />
                  </div>
                  <p className="text-start text-3xl font-semibold">2</p>
                </div>

                <div className=" col-span-4">
                  <StatisticsTable />
                </div>
              </div>
              <div className="w-full col-span-2">
                <StatisticsFilters />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <div className="text-center py-12 text-muted-foreground">
              Requests statistics coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Statistics;
