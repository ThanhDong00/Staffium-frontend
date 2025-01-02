
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PlusIcon } from 'lucide-react'
import React from 'react'

export default function CreatePosPopover({
  mutationFn
}: {
  mutationFn: Function
}) {
  const [name, setName] = React.useState<string>('')
  const [open, setOpen] = React.useState<boolean>(false)
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
            <h4 className="font-medium leading-none">Create new position</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button onClick={() => {
            setOpen(false)
            mutationFn(name)
          }} className="w-full">
            <PlusIcon />
            Create
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
