import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const StaffDetailsAttendanceFilter = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium">Time</h3>
        <Select defaultValue="month">
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
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

export default StaffDetailsAttendanceFilter;
