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
    id: "ID0001",
    name: "Emily Smith",
    gender: "Female",
    department: "Human Resources",
    checkIn: "07:12 AM",
    checkOut: "Not yet",
  },
  {
    id: "ID0001",
    name: "James Williams",
    gender: "Male",
    department: "IT",
    checkIn: "07:12 AM",
    checkOut: "Not yet",
  },
  {
    id: "ID0001",
    name: "Jessica Brown",
    gender: "Female",
    department: "Marketing",
    checkIn: "07:12 AM",
    checkOut: "Not yet",
  },
  {
    id: "ID0001",
    name: "David Miller",
    gender: "Male",
    department: "Accounting",
    checkIn: "07:12 AM",
    checkOut: "Not yet",
  },
  {
    id: "ID0001",
    name: "Sarah Davis",
    gender: "Female",
    department: "Administrative",
    checkIn: "07:12 AM",
    checkOut: "Not yet",
  },
];

const AttendanceTable = () => {
  return (
    <div className="bg-white rounded-lg shadow px-6 py-3 flex flex-col justify-between">
      <p className=" text-center text-2xl font-bold py-3">Attendance</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((person) => (
            <TableRow key={person.id + person.name}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.name}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    person.gender === "Female"
                      ? "bg-pink-100 text-pink-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {person.gender}
                </span>
              </TableCell>
              <TableCell>{person.department}</TableCell>
              <TableCell>{person.checkIn}</TableCell>
              <TableCell>{person.checkOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
