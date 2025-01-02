
import { DatePicker } from '@/components/DatePicker/DatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { OFF_TYPES } from '@/constants/enum'
import { PlusIcon } from 'lucide-react'
import React from 'react'

export default function CreateRequestPopover({
  mutationFn
}: {
  mutationFn: Function
}) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [createForm, setCreateForm] = React.useState<{ [key: string]: any }>({
    day_off: undefined,
    duration: 0,
    type: '',
    proof: null
  })
  return (
    <Popover open={open}>
      <PopoverTrigger onClick={() => setOpen(!open)} asChild>
        <Button>
          <PlusIcon />
          Create new
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" onInteractOutside={() => setOpen(false)}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-green-600">Create new request</h4>
          </div>
          <div className="grid gap-2">
            <div>
              <Label htmlFor='birthdate'>Day off</Label>
              <DatePicker
                isDisabled={false}
                date={createForm['day_off'] ? new Date(createForm['day_off'].toString()) : undefined}
                setDate={(v: any) => setCreateForm((prev) => ({
                  ...prev,
                  ['day_off']: v,
                }))}
              />
            </div>
            <div>
              <Label htmlFor='Duration'>Duration (number of days)</Label>
              <Input
                type='number'
                value={createForm['duration']}
                onChange={(e) => setCreateForm((prev) => ({
                  ...prev,
                  ['duration']: e.target.value
                }))}
              />
            </div>
            <div>
              <Label htmlFor='Type'>Type</Label>
              <Select
                value={createForm['type']}
                onValueChange={(v: any) => setCreateForm((prev) => ({
                  ...prev,
                  ['type']: v,
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select type`} />
                </SelectTrigger>
                <SelectContent >
                  {Object.values(OFF_TYPES).map((i, index) => (
                    <SelectItem key={index} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => {
            setOpen(false)
            mutationFn(createForm)
          }} className="w-full">
            <PlusIcon />
            Create
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
