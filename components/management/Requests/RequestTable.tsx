import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import { RequestResponse } from "@/api/constant/response";

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

// {
//   "_id": "676910ddb701e49855c42240",
//   "organization_id": "6768e603acc8cf3dc2219395",
//   "sender": "676900d84436a8f05ca92171",
//   "status": "REJECTED",
//   "details": {
//       "day_off": "2024-12-27T07:24:45.972Z",
//       "duration": 1,
//       "type": "VACATION",
//       "proof": null
//   },
//   "createdAt": "2024-12-23T07:27:25.412Z",
//   "updatedAt": "2024-12-25T19:31:45.205Z",
//   "__v": 0
// }

interface RequestTableProps {
  dataList: any;
  typeRequest: "Pending" | "Approved" | "Rejected";
  onRowClick: (data: RequestResponse) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-500 rounded-lg w-fit px-4 py-1 font-medium text-white";
    case "REJECTED":
      return "bg-red-500 rounded-lg w-fit px-4 py-1 font-medium text-white";
    default:
      return "bg-blue-500 rounded-lg w-fit px-4 py-1 font-medium text-white";
  }
};

export function RequestsTable({
  dataList,
  typeRequest,
  onRowClick,
}: RequestTableProps) {
  const filteredData = dataList?.filter(
    (request: any) => request.status === typeRequest.toUpperCase()
  );

  return (
    <div className="bg-white rounded-lg shadow px-6 py-3 flex flex-col justify-between">
      <p className=" text-center text-2xl font-bold py-3">
        {typeRequest} list
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Request time</TableHead>
            <TableHead>Staff</TableHead>
            <TableHead>Day off</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((request: any) => (
            <TableRow
              key={request._id}
              onClick={() => onRowClick(request)}
              className="hover:cursor-pointer"
            >
              <TableCell className="text-gray-500">
                {format(new Date(request.createdAt), "PP")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {request.staffDetails.first_name}{" "}
                  {request.staffDetails.last_name}
                </div>
              </TableCell>
              <TableCell className="text-gray-500">
                {format(new Date(request.details.day_off), "PP")}
              </TableCell>
              <TableCell className="text-gray-500">
                {request.details.duration} day(s)
              </TableCell>
              <TableCell className="w-[200px]">
                <div className={getStatusColor(request.status)}>
                  {request.status}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
