import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const attendance = [
  {
    date: "01-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "02-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "03-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "04-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "05-10",
    checkIn: "Day off",
    checkOut: "Day off",
    overtime: "Day off",
  },
  {
    date: "06-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "07-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "08-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "09-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
  {
    date: "10-10",
    checkIn: "07:12 AM",
    checkOut: "05:30 PM",
    overtime: "1 hour",
  },
];

const StaffDetailsAttendanceTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Check-in</TableHead>
          <TableHead>Check-out</TableHead>
          <TableHead>Overtime</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendance.map((day) => (
          <TableRow key={day.date}>
            <TableCell>{day.date}</TableCell>
            <TableCell
              className={day.checkIn === "Day off" ? "text-blue-600" : ""}
            >
              {day.checkIn}
            </TableCell>
            <TableCell
              className={day.checkOut === "Day off" ? "text-blue-600" : ""}
            >
              {day.checkOut}
            </TableCell>
            <TableCell
              className={day.overtime === "Day off" ? "text-blue-600" : ""}
            >
              {day.overtime}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StaffDetailsAttendanceTable;
