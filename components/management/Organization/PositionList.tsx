import { PositionResponse } from '@/api/constant/response'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { set } from 'date-fns'
import { EditIcon, SaveIcon, TrashIcon } from 'lucide-react'
import React from 'react'

interface PositionListProps {
  posList: PositionResponse[],
  updateFn: Function,
  deleteFn: Function
}
export default function PositionList({ posList, updateFn, deleteFn }: PositionListProps) {
  const PositionCard = ({ pos }: { pos: PositionResponse }) => {
    const [editedName, setEditedName] = React.useState(pos.name)
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
            {field('Name', pos.name)}
          </div>}
        <div className='flex flex-col gap-2'>
          <Button
            className='w-16'
            variant={isEdit ? 'default' : 'outline'}
            onClick={() => {
              if (isEdit) {
                updateFn({ id: pos._id, name: editedName })
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
            onClick={() => deleteFn(pos._id)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div >
    )
  }
  return (
    <div className='flex flex-col gap-2 py-2'>
      {posList.map((pos) => (
        <PositionCard pos={pos} key={pos._id} />
      ))}
    </div>
  )
}
