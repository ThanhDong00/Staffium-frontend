"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const TimeFilter = () => {
  const [selectedDuration, setSelectedDuration] = useState<string>("month");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Generate array of next 12 months in MM/YYYY format
  const getNextMonths = () => {
    const months = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i);
      const formattedDate = `${String(month.getMonth() + 1).padStart(
        2,
        "0"
      )}/${month.getFullYear()}`;
      months.push(formattedDate);
    }
    return months;
  };

  // Generate array of next 10 years
  const getNextYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      years.push(String(currentYear - i));
    }
    return years;
  };

  const durationOptions = [
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    setSelectedTime(""); // Reset selected time when duration changes
  };

  return (
    <Card className="w-full max-w-md p-5 mb-5">
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold pb-2">Duration</p>
          <Select value={selectedDuration} onValueChange={handleDurationChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((duration) => (
                <SelectItem key={duration.value} value={duration.value}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="font-semibold pb-2">Time</p>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  selectedDuration === "month" ? "Select month" : "Select year"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {selectedDuration === "month"
                ? getNextMonths().map((date) => (
                    <SelectItem key={date} value={date}>
                      {date}
                    </SelectItem>
                  ))
                : getNextYears().map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeFilter;
