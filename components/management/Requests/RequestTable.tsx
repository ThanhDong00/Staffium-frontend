import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import logo from "../../../public/logo.png";

const requests = [
  {
    requestTime: "08-09-2024",
    staff: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    dayOff: "08-10-2024",
    duration: "1 day",
  },
  {
    requestTime: "08-09-2024",
    staff: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    dayOff: "08-10-2024",
    duration: "1 day",
  },
  {
    requestTime: "08-09-2024",
    staff: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    dayOff: "08-10-2024",
    duration: "1 day",
  },
  {
    requestTime: "08-09-2024",
    staff: {
      name: "John Doe",
      avatar: "/placeholder.svg",
    },
    dayOff: "08-10-2024",
    duration: "1 day",
  },
];

export function RequestsTable() {
  return (
    <div className="bg-white rounded-lg shadow px-6 py-3 flex flex-col justify-between">
      <p className=" text-center text-2xl font-bold py-3">Waiting list</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Request time</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead>Day off</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request, index) => (
            <TableRow key={index}>
              <TableCell className="text-gray-500">
                {request.requestTime}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={logo}
                    alt={request.staff.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{request.staff.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-500">{request.dayOff}</TableCell>
              <TableCell className="text-gray-500">
                {request.duration}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
