"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MultiFilter from "@/components/management/MultiFilter";
import StaffTable from "@/components/management/Staff/StaffTable";
import { useRouter } from "next/navigation";

const Staff = () => {
  const router = useRouter();
  const [allStaffData, setAllStaffData] = useState();

  const fetchStaffData = async () => {
    // Fetch staff data from the server
    const response = await fetch(
      "https://staffium-server.onrender.com/api/staff/all"
    );
    const data = await response.json();
    setAllStaffData(data);
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleTableClick = (id: string) => {
    // Handle table row click
    console.log("Row clicked", id);
    router.push(`staff/${id}`);
  };

  console.log(allStaffData);

  return (
    <Layout>
      <div className="p-5 flex flex-col gap-4">
        <MultiFilter />
        <StaffTable onRowClick={handleTableClick} />
      </div>
    </Layout>
  );
};

export default Staff;
