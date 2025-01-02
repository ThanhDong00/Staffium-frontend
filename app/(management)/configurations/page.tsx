"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { OrgConfigService } from "@/api/OrgConfigService";

const Configurations = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["org-config"],
    queryFn: async () => {
      const response = await OrgConfigService.getConfig();
      return response;
    },
  });

  console.log("data", data);

  return <div>Configurations</div>;
};

export default Configurations;
