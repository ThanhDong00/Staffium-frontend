"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MonthPickerProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function MonthPicker({
  selected,
  onSelect,
  className,
}: MonthPickerProps) {
  const [year, setYear] = React.useState(
    selected?.getFullYear() || new Date().getFullYear()
  );
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleMonthSelect = (monthIndex: number) => {
    const date = new Date(year, monthIndex);
    onSelect?.(date);
  };

  const isSelected = (monthIndex: number) => {
    if (!selected) return false;
    return (
      selected.getFullYear() === year && selected.getMonth() === monthIndex
    );
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between px-1">
        <Button variant="ghost" size="icon" onClick={() => setYear(year - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold">{year}</div>
        <Button variant="ghost" size="icon" onClick={() => setYear(year + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <Button
            key={month}
            variant="ghost"
            className={cn(
              "h-9 w-full rounded-md p-0",
              isSelected(index) &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
            onClick={() => handleMonthSelect(index)}
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  );
}
