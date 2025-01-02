'use client'
import { DepartmentService } from '@/api/DepartmentService'
import CreateDeptPopover from '@/components/management/Organization/CreateDeptPopover'
import DepartmentList from '@/components/management/Organization/DepartmentList'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

export default function DepartmentPage() {
  const deptQuery = useQuery({
    queryKey: ['depts'],
    queryFn: () => DepartmentService.getAllDept(),
  })
  const addDepartment = useMutation({
    mutationFn: (data: string) => DepartmentService.createNewDept(data),
    onSuccess: (res) => {
      toast({
        variant: 'default',
        title: `Successfully created department ${res.data.name}`,
      })
      deptQuery.refetch()
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: `Failed to create department with Error: ${error.message}`,
      })
    }
  })
  const updateDepartment = useMutation({
    mutationFn: ({ id, name }: { id: string, name: string }) => DepartmentService.updateDept(id, name),
    onSuccess: (res) => {
      toast({
        variant: 'default',
        title: `Successfully updated department ${res.data.name}`,
      })
      deptQuery.refetch()
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to update department with Error: ${err}`,
      })
    }
  })
  const deleteDepartment = useMutation({
    mutationFn: (id: string) => DepartmentService.deleteDept(id),
    onSuccess: (res) => {
      toast({
        variant: 'default',
        title: `Successfully delete department`,
      })
      deptQuery.refetch()
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to delete department with Error: ${err}`,
      })
    }
  })
  return (
    <div className="bg-white shadow p-5 rounded-lg grow overflow-y-auto flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-800 py-2 border-b-2 border-gray-300">
          Department
        </p>
        <CreateDeptPopover mutationFn={addDepartment.mutate} />
      </div>
      {deptQuery.isPending ?
        <Skeleton className="h-[125px] w-[250px] rounded-xl"></Skeleton>
        :
        <div className='overflow-y-auto h-[calc(100vh-300px)]'>
          <DepartmentList deptList={deptQuery.data.data} updateFn={updateDepartment.mutate} deleteFn={deleteDepartment.mutate} />
        </div>

      }
    </div>
  )
}
