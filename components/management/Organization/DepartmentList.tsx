import { DepartmentResponse } from '@/api/constant/response'
import { Button } from '@/components/ui/button'
import { set } from 'date-fns'
import { EditIcon, SaveIcon } from 'lucide-react'
import React from 'react'

interface DepartmentListProps {
  deptList: DepartmentResponse[]
}
export default function DepartmentList({ deptList }: DepartmentListProps) {
  const DepartmentCard = ({ dept }: { dept: DepartmentResponse }) => {
    const [isEdit, setIsEdit] = React.useState(false)
    const field = (name: string, value: string) => (
      <div className='flex flex-col gap-2 '>
        <h4 className='text-sm font-semibold'>{name}</h4>
        <p className='text-lg text-primary'>{value}</p>
      </div>
    )
    return (
      <div className='grow flex flex-row justify-between p-4 rounded-lg border border-slate-300'>
        <div className='grid grid-cols-2 grow'>
          {field('Name', dept.name)}
          {field('Size', dept.size.toString())}
        </div>
        <Button
          className='w-16'
          variant={isEdit ? 'default' : 'outline'}
          onClick={() => setIsEdit(!isEdit)}
        >
          {
            !isEdit ? <EditIcon /> : <SaveIcon />
          }
        </Button>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-2 py-2'>
      {deptList.map((dept) => (
        <DepartmentCard dept={dept} key={dept._id} />
      ))}
    </div>
  )
}
