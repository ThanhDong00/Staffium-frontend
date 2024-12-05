import React from "react";
import Layout from "@/components/Layout";
import MultiFilter from "@/components/management/MultiFilter";
import StaffTable from "@/components/management/Staff/StaffTable";

const Staff = () => {
  return (
    <Layout>
      <div className="p-5 flex flex-col gap-4">
        <MultiFilter />
        <StaffTable />
      </div>
    </Layout>
  );
};

export default Staff;
