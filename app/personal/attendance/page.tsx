'use client'
import { AttendanceService } from '@/api/AttendanceService';
import Spinner from '@/components/Feedback/Spinner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/useUser';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Pencil, Save } from 'lucide-react';
import React, { useState } from 'react'

export default function AttendancePage() {
  const myAttendance = useQuery({
    queryKey: ['my-attendance'],
    queryFn: () => AttendanceService.getMyTodayAttendance()
  })
  const checkinMutation = useMutation({
    mutationFn: () => AttendanceService.checkin(),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: 'default',
          title: `Checkin successfully`
        })
        myAttendance.refetch()
      }
      else {
        toast({
          variant: 'destructive',
          title: `Failed to checkin ${res.status}`
        })
      }
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to checkin with error ${err}`
      })
    }
  })
  const checkoutMutation = useMutation({
    mutationFn: () => AttendanceService.checkout(),
    onSuccess: (res) => {
      if (res.status === 200) {
        toast({
          variant: 'default',
          title: `Checkout successfully`
        })
        myAttendance.refetch()
      }
      else {
        toast({
          variant: 'destructive',
          title: `Failed to checkout`
        })
      }
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to checkout with error ${err}`
      })
    }
  })
  return (
    <div className="p-5">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-white p-5 shadow">
        <p className='text-2xl px-4 py-2 font-bold text-slate-800 self-stretch'>Today attendance</p>
        {
          myAttendance.isPending ?
            <div><Spinner /></div>
            :
            <div className='flex flex-col gap-4'>
              <p>
                Check in :
                <span className='font-medium text-primary'>
                  {myAttendance.data.data?.check_in ? ' ' + new Date(myAttendance.data.data.check_in).toLocaleTimeString() : ' Not checkin yet'}
                </span>
              </p>
              <p>
                Check out :
                <span className='font-medium text-red-400'>
                  {myAttendance.data.data?.check_out ? ' ' + new Date(myAttendance.data.data.check_out).toLocaleTimeString() : ' Not checkout yet'}
                </span>
              </p>
            </div>
        }
        <div className='flex flex-row gap-8'>
          <Button
            size='lg'
            className='bg-green-500 text-lg'
            disabled={myAttendance.data?.data?.check_in ? true : false}
            onClick={() => checkinMutation.mutate()}
          >
            Check-in
          </Button>
          <Button
            size='lg'
            className='bg-red-500 text-lg'
            disabled={myAttendance.data?.data?.check_out ? true : false}
            onClick={() => checkoutMutation.mutate()}
          >
            Check-out
          </Button>
        </div>
      </div>
    </div>
  )
}
