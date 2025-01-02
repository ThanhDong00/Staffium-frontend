'use client'
import { CreateRequestForm } from '@/api/constant/request';
import { RequestResponse } from '@/api/constant/response';
import { RequestService } from '@/api/RequestService';
import { StaffService } from '@/api/StaffService';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import CreateDeptPopover from '@/components/management/Organization/CreateDeptPopover';
import { RequestsTable } from '@/components/management/Requests/RequestTable';
import SelectedFilter from '@/components/management/SelectedFilter';
import CreateRequestPopover from '@/components/Personal/Request/CreateRequestPopover';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OFF_TYPES } from '@/constants/enum';
import { toast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react'

const filter = ["Pending", "Approved", "Rejected"];

export default function MyRequestPage() {
  const [selected, setSelected] = useState<"Pending" | "Approved" | "Rejected">(
    "Pending"
  )
  const [open, setOpen] = useState(false)
  const [createForm, setCreateForm] = useState<{ [key: string]: any }>({
    day_off: undefined,
    duration: 0,
    type: '',
    proof: null
  })

  const myRequestsQuery = useQuery({
    queryKey: ['my-requests'],
    queryFn: async () => {
      const response = await RequestService.getAllMyRequest();
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
  })
  const createRequestMutation = useMutation({
    mutationFn: (payload: CreateRequestForm) => RequestService.createRequest(payload),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: 'default',
          title: `Request created successfully`
        })
        myRequestsQuery.refetch()
      } else {
        toast({
          variant: 'destructive',
          title: `Failed to create request`
        })
      }
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to create request with error ${err}`
      })
    }
  })
  return (
    <>
      <div className="p-5 flex flex-col gap-5 items-center">
        <div className='self-stretch flex flex-row justify-start'>
          <CreateRequestPopover mutationFn={(data: any) => {
            createRequestMutation.mutate({
              day_off: data.day_off,
              duration: data.duration,
              type: data.type,
              proof: null
            } as CreateRequestForm)
          }} />
        </div>

        <div className="mt-5">
          <SelectedFilter
            datas={filter}
            valueSelected={selected}
            handleClick={(l: any) => setSelected(l)}
          />
        </div>
        <div className="mt-5 w-full">
          <RequestsTable
            typeRequest={selected}
            dataList={myRequestsQuery.isFetched ? myRequestsQuery.data : []}
            onRowClick={() => { }}
          />
        </div>
      </div>
    </>
  )
}
