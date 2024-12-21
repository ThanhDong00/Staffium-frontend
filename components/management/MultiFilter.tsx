"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// interface Filters {
//   search: string;
//   sortBy: string;
//   department: string;
//   gender: string;
// }

const MultiFilter = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "name",
    department: "",
    gender: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    console.log("filters", newFilters);
  };

  return (
    <div className="bg-white px-6 py-3 rounded-lg shadow">
      <div className="flex items-center gap-4 flex-1 justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search..."
            type="search"
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <Select
            defaultValue={filters.sortBy}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="position">Position</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={filters.department}
            onValueChange={(value) => handleFilterChange("department", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={filters.gender}
            onValueChange={(value) => handleFilterChange("gender", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MultiFilter;
