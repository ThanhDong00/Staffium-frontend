"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { CheckCheck, FileQuestion, LogOut, Timer } from "lucide-react";
import SelectedFilter from "@/components/management/SelectedFilter";
import { RequestsTable } from "@/components/management/Requests/RequestTable";
import NumberWidget from "@/components/management/NumberWidget";

const filter = ["Pending", "Approved", "Rejected"];

const Requests = () => {
  const [selected, setSelected] = useState("Pending");

  const handleSelectFilterClick = (label: string) => {
    setSelected(label);
  };

  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-lg bg-white px-6 py-3 shadow">
          <div className="flex items-center gap-4">
            <FileQuestion size={24} className="text-blue-500" />
            <p className=" font-semibold">This month requests</p>
          </div>
          <p className=" italic">
            See requests of all time at{" "}
            <Link
              href="/statistics/requests"
              className="text-blue-500 underline"
            >
              Statistics
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
          <NumberWidget title="Pending" Icon={CheckCheck} value="123" />

          <NumberWidget title="Approved" Icon={LogOut} value="123" />

          <NumberWidget title="Rejected" Icon={Timer} value="123" />
        </div>

        <div className="mt-5">
          <SelectedFilter
            datas={filter}
            valueSelected={selected}
            handleClick={handleSelectFilterClick}
          />
        </div>

        <div className="mt-5">
          <RequestsTable typeRequest={selected} />
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
