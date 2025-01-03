"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { CheckCheck, FileQuestion, LogOut, Timer } from "lucide-react";
import SelectedFilter from "@/components/management/SelectedFilter";
import { RequestsTable } from "@/components/management/Requests/RequestTable";
import NumberWidget from "@/components/management/NumberWidget";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestService } from "@/api/RequestService";
import { RequestResponse } from "@/api/constant/response";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { StaffService } from "@/api/StaffService";
import { Progress } from "@/components/ui/progress";
import { useGlobalContext } from "../../provider";
import { useToast } from "@/hooks/use-toast";

const filter = ["Pending", "Approved", "Rejected"];

interface RequestTotals {
  pending: number;
  approved: number;
  rejected: number;
}

const Requests = () => {
  const { toast } = useToast();

  const { progress, triggerProgress } = useGlobalContext();

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await RequestService.getAllThisMonthRequest();
      const requestsWithStaff = await Promise.all(
        response.data.map(async (request: RequestResponse) => {
          const staffResponse = await StaffService.getStaffById(request.sender);
          return {
            ...request,
            staffDetails: staffResponse.data,
          };
        })
      );
      return requestsWithStaff;
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<RequestResponse | null>();

  const handleSelectFilterClick = (label: any) => {
    setSelected(label);
  };

  const totals = useMemo(() => {
    return (
      data?.reduce(
        (acc: RequestTotals, curr: any) => ({
          pending: acc.pending + (curr.status === "PENDING" ? 1 : 0),
          approved: acc.approved + (curr.status === "APPROVED" ? 1 : 0),
          rejected: acc.rejected + (curr.status === "REJECTED" ? 1 : 0),
        }),
        { pending: 0, approved: 0, rejected: 0 }
      ) || { pending: 0, approved: 0, rejected: 0 }
    );
  }, [data]);

  const handleTableRowClick = (dataRequest: RequestResponse) => {
    setSelectedRequest(dataRequest);
    setOpenDialog(true);
    console.log(dataRequest);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500 rounded-lg w-fit px-4 py-1 font-medium text-white";
      case "REJECTED":
        return "bg-red-500 rounded-lg w-fit px-4 py-1 font-medium text-white";
      default:
        return "bg-blue-500 rounded-lg w-fit px-4 py-1 font-medium text-white";
    }
  };

  const rejectMutation = useMutation({
    mutationFn: (id: string) => RequestService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setOpenDialog(false);
      toast({
        title: "Request rejected successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to reject request",
      });
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => RequestService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      setOpenDialog(false);
      toast({
        title: "Request approved successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to approved request",
      });
    },
  });

  // console.log(data);

  return (
    <div>
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

        {isLoading ? (
          // <p>Loading...</p>
          <Progress value={progress} className="w-[100%] mt-5" />
        ) : (
          <>
            <div className="grid grid-cols-6 gap-4 mt-5 bg-white rounded-lg px-6 py-3 shadow">
              <NumberWidget
                title="Pending"
                Icon={CheckCheck}
                value={totals.pending.toString()}
              />

              <NumberWidget
                title="Approved"
                Icon={LogOut}
                value={totals.approved.toString()}
              />

              <NumberWidget
                title="Rejected"
                Icon={Timer}
                value={totals.rejected.toString()}
              />
            </div>

            <div className="mt-5">
              <SelectedFilter
                datas={filter}
                valueSelected={selected}
                handleClick={handleSelectFilterClick}
              />
            </div>

            <div className="mt-5">
              <RequestsTable
                typeRequest={selected}
                dataList={data}
                onRowClick={handleTableRowClick}
              />
            </div>
          </>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        {selectedRequest && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Request time
                </span>
                <span>{format(new Date(selectedRequest.createdAt), "PP")}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">Status</span>
                <div className={getStatusColor(selectedRequest.status)}>
                  {selectedRequest.status}
                </div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">Staff</span>
                <span>
                  {selectedRequest.staffDetails.first_name}{" "}
                  {selectedRequest.staffDetails.last_name}
                </span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">Day off</span>
                <span>
                  {format(new Date(selectedRequest.details.day_off), "PP")}
                </span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span>{selectedRequest.details.duration} day(s)</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">Type</span>
                <span>{selectedRequest.details.type}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="text-sm text-muted-foreground">Proof</span>
                {selectedRequest.details.proof === null ? (
                  "No proof"
                ) : (
                  <a href="#" className="text-blue-500 hover:underline">
                    {selectedRequest.details.proof}
                  </a>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                disabled={
                  selectedRequest.status === "REJECTED" ||
                  rejectMutation.isPending
                }
                onClick={() => rejectMutation.mutate(selectedRequest._id)}
                className="disabled:opacity-50"
              >
                Reject
              </Button>
              <Button
                className="bg-green-500 hover:opacity-90 hover:bg-green-500 disabled:opacity-50"
                disabled={
                  selectedRequest.status === "APPROVED" ||
                  approveMutation.isPending
                }
                onClick={() => approveMutation.mutate(selectedRequest._id)}
              >
                Approve
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Requests;
