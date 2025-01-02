import { CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from '../ui/calendar'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function DatePicker({
  isDisabled,
  date,
  setDate
}: {
  isDisabled: boolean,
  date: Date | undefined,
  setDate: any
}) {
  console.log(date)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(v) => setDate(v)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}