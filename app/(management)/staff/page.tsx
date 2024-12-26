"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MultiFilter from "@/components/management/MultiFilter";
import StaffTable from "@/components/management/Staff/StaffTable";
import { useRouter } from "next/navigation";
import { StaffService } from "@/api/StaffService";
import { StaffResponse } from "@/api/constant/response";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEM_PER_PAGE = 10;

const Staff = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    gender: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["staff", currentPage, filters],
    queryFn: async () => {
      const response = await StaffService.getAllStaff(
        currentPage,
        ITEM_PER_PAGE,
        1,
        filters.search,
        filters.department,
        filters.gender
      );
      setPageSize(response.data.totalPage);
      return response.data;
    },
  });

  const handleTableClick = (id: string) => {
    router.push(`staff/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (error) return <div>Error loading staff data</div>;

  return (
    <Layout>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5 flex flex-col gap-4">
          <MultiFilter filters={filters} onFilterChange={handleFilterChange} />

          <div className="h-[calc(100vh-275px)] overflow-y-auto border bg-white rounded-lg shadow">
            <StaffTable onRowClick={handleTableClick} dataList={data?.items} />
          </div>

          <div className="flex justify-end mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {[...Array(pageSize)].map((_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < pageSize &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === pageSize
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Staff;
