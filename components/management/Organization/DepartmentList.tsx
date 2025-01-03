import { DepartmentResponse } from '@/api/constant/response'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { set } from 'date-fns'
import { EditIcon, SaveIcon, TrashIcon } from 'lucide-react'
import React from 'react'

interface DepartmentListProps {
  deptList: DepartmentResponse[],
  updateFn: Function,
  deleteFn: Function
}
export default function DepartmentList({ deptList, updateFn, deleteFn }: DepartmentListProps) {
  const DepartmentCard = ({ dept }: { dept: DepartmentResponse }) => {
    const [editedName, setEditedName] = React.useState(dept.name)
    const [isEdit, setIsEdit] = React.useState(false)
    const field = (name: string, value: string) => (
      <div className='flex flex-col gap-2 '>
        <h4 className='text-sm font-semibold'>{name}</h4>
        <p className='text-lg text-primary'>{value}</p>
      </div>
    )
    return (
      <div className='grow flex flex-row justify-between gap-2 p-4 rounded-lg border border-slate-300'>
        {isEdit ?
          <Input
            className='grow'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          :
          <div className='grid grid-cols-2 grow'>
            {field('Name', dept.name)}
            {field('Size', dept.size.toString())}
          </div>}
        <div className='flex flex-col gap-2'>
          <Button
            className='w-16'
            variant={isEdit ? 'default' : 'outline'}
            onClick={() => {
              if (isEdit) {
                updateFn({ id: dept._id, name: editedName })
              }
              setIsEdit(!isEdit)
            }}
          >
            {
              !isEdit ? <EditIcon /> : <SaveIcon />
            }
          </Button>
          <Button
            className='w-16'
            variant='destructive'
            onClick={() => deleteFn(dept._id)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div >
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
