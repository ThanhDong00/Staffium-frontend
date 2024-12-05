"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MonthPicker } from "@/components/management/Statistics/MonthPicker";
import { CalendarIcon } from "lucide-react";

const StatisticsFilters = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Duration</h3>
        <Select defaultValue="month">
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Time</h3>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "MMMM yyyy") : <span>Pick a month</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-3">
            <MonthPicker selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Type</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="check-in" defaultChecked />
            <Label htmlFor="check-in">Check-in</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="check-out" defaultChecked />
            <Label htmlFor="check-out">Check-out</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="off" defaultChecked />
            <Label htmlFor="off">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="overtime" defaultChecked />
            <Label htmlFor="overtime">Overtime</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsFilters;
