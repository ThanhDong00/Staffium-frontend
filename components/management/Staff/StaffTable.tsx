import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";

const staff = [
  {
    id: "ID0001",
    name: "Emily Smith",
    gender: "Female",
    department: "Human Resources",
    position: "Recruitment Specialist",
  },
  {
    id: "ID0001",
    name: "James Williams",
    gender: "Male",
    department: "IT",
    position: "Software Engineer",
  },
  {
    id: "ID0001",
    name: "Jessica Brown",
    gender: "Female",
    department: "Marketing",
    position: "Campaign Manager",
  },
  {
    id: "ID0001",
    name: "David Miller",
    gender: "Male",
    department: "Accounting",
    position: "Senior Accountant",
  },
  {
    id: "ID0001",
    name: "Sarah Davis",
    gender: "Female",
    department: "Administrative",
    position: "Administrative Assistant",
  },
  {
    id: "ID0001",
    name: "John Wilson",
    gender: "Male",
    department: "Engineering",
    position: "Mechanical Engineer",
  },
  {
    id: "ID0001",
    name: "Ashley Taylor",
    gender: "Female",
    department: "Customer Support",
    position: "Customer Support Representative",
  },
  {
    id: "ID0001",
    name: "Christopher Thomas",
    gender: "Male",
    department: "Sales",
    position: "Sales Representative",
  },
  {
    id: "ID0001",
    name: "Amanda Anderson",
    gender: "Female",
    department: "Legal",
    position: "In-house Counsel",
  },
  {
    id: "ID0001",
    name: "Robert Moore",
    gender: "Male",
    department: "Production",
    position: "Production Manager",
  },
];

const StaffTable = ({ onRowClick }: { onRowClick: any }) => {
  return (
    <div className="bg-white rounded-lg shadow px-6 py-3 flex flex-col justify-between">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((person) => (
            <TableRow
              key={person.id + person.name}
              onClick={() => onRowClick(person.id + person.name)}
            >
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
              <TableCell>{person.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center py-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="mx-2">...</span>
          <Button variant="outline" size="sm">
            67
          </Button>
          <Button variant="outline" size="sm">
            68
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffTable;
