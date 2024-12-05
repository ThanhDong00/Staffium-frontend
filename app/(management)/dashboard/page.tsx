import React from "react";
import Layout from "@/components/Layout";

const DashBoard = () => {
  return (
    <Layout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-lg bg-white px-6 py-3">
          <p className=" font-semibold">Welcome, Admin!</p>
          <p className=" italic">
            Every accomplishment starts with the decision to try
          </p>
        </div>

        <div>
          <div className="grid grid-cols-4 gap-4 mt-5">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-center font-semibold">Today</p>
              <p className="text-center text-3xl font-semibold">...</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
