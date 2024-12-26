"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DepartmentResponse } from "@/api/constant/response";
import { DepartmentService } from "@/api/DepartmentService";

const MultiFilter = ({
  filters,
  onFilterChange,
}: {
  filters: any;
  onFilterChange: any;
}) => {
  const [department, setDepartment] = useState<[DepartmentResponse]>();

  const getAllDepartment = async () => {
    // Fetch all department data
    const data = await DepartmentService.getAllDept();
    setDepartment(data.data);
  };

  useEffect(() => {
    getAllDepartment();
  }, []);

  // const [filters, setFilters] = useState({
  //   search: "",
  //   sortBy: "name",
  //   department: "",
  //   gender: "",
  // });

  // const handleFilterChange = (key: string, value: string) => {
  //   const newFilters = { ...filters, [key]: value };
  //   setFilters(newFilters);
  //   console.log("filters", newFilters);
  // };

  return (
    <div className="bg-white px-6 py-3 rounded-lg shadow">
      <div className="flex items-center gap-4 flex-1 justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            className="pl-9 w-[300px]"
            placeholder="Search..."
            type="search"
            onChange={(e) => onFilterChange("search", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          {/* <span className="text-sm text-gray-500">Sort by:</span>
          <Select
            defaultValue={filters.sortBy}
            onValueChange={(value) => onFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="position">Position</SelectItem>
            </SelectContent>
          </Select> */}

          <Select
            defaultValue={filters.department || "all"}
            onValueChange={(value) =>
              onFilterChange("department", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="all" value="all">
                All Departments
              </SelectItem>
              {department?.map((dept) => (
                <SelectItem key={dept._id} value={dept._id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            defaultValue={filters.gender || "all"}
            onValueChange={(value) =>
              onFilterChange("gender", value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gender</SelectItem>
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
