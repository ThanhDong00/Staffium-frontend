'use client'
import { PositionService } from '@/api/PositionService'
import CreatePosPopover from '@/components/management/Organization/CreatePosPopover'
import PositionList from '@/components/management/Organization/PositionList'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'

export default function PositionPage() {
  const posQuery = useQuery({
    queryKey: ['positions'],
    queryFn: () => PositionService.getAllPos(),
  })
  const addPosition = useMutation({
    mutationFn: (data: string) => PositionService.createNewPos(data),
    onSuccess: (res) => {
      toast({
        variant: 'default',
        title: `Successfully created position ${res.data.name}`,
      })
      posQuery.refetch()
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: `Failed to create position with Error: ${error.message}`,
      })
    }
  })
  const updatePosition = useMutation({
    mutationFn: ({ id, name }: { id: string, name: string }) => PositionService.updatePos(id, name),
    onSuccess: (res) => {
      toast({
        variant: 'default',
        title: `Successfully updated position ${res.data.name}`,
      })
      posQuery.refetch()
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to update position with Error: ${err}`,
      })
    }
  })
  const deletePosition = useMutation({
    mutationFn: (id: string) => PositionService.deletePos(id),
    onSuccess: (res) => {
      toast({
        variant: 'default',
        title: `Successfully delete position`,
      })
      posQuery.refetch()
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: `Failed to delete position with Error: ${err}`,
      })
    }
  })
  return (
    <div className="bg-white shadow p-5 rounded-lg grow overflow-y-auto flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-lg text-gray-800 py-2 border-b-2 border-gray-300">
          Position
        </p>
        <CreatePosPopover mutationFn={addPosition.mutate} />
      </div>
      {posQuery.isPending ?
        <Skeleton className="h-[125px] w-[250px] rounded-xl"></Skeleton>
        :
        <div className='overflow-y-auto h-[calc(100vh-300px)]'>
          <PositionList posList={posQuery.data.data} updateFn={updatePosition.mutate} deleteFn={deletePosition.mutate} />
        </div>

      }
    </div>
  )
}
