import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { CheckCheck, FileQuestion, LogOut, Timer } from "lucide-react";
import SelectedFilter from "@/components/management/SelectedFilter";
import { RequestsTable } from "@/components/management/Requests/RequestTable";

const filter = ["All", "Pending", "Approved", "Rejected"];

const Requests = () => {
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
            <Link href="/statistics" className="text-blue-500 underline">
              Statistics
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Pending</p>
              <CheckCheck />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Approved</p>
              <LogOut />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className=" flex items-center justify-between">
              <p className="text-center font-semibold">Rejected</p>
              <Timer />
            </div>
            <p className="text-start text-3xl font-semibold">123</p>
          </div>
        </div>

        <div className="mt-5">
          <SelectedFilter datas={filter} />
        </div>

        <div className="mt-5">
          <RequestsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
