import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import { ATTENDANCE_TYPES } from "@/constants/enum";

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

// {
//   "_id": "676cd2827e3f215d7ac49b64",
//   "organization_id": "6768e603acc8cf3dc2219395",
//   "staff_id": "676c3d3ef65f6439a745e086",
//   "day": "2024-12-26T09:08:20.000Z",
//   "type": "Work",
//   "check_in": "2024-12-26T03:50:26.274Z",
//   "check_out": null,
//   "__v": 0,
//   "staff": {
//       "_id": "676c3d3ef65f6439a745e086",
//       "organization_id": "6768e603acc8cf3dc2219395",
//       "first_name": "Dong",
//       "last_name": "Pham",
//       "gender": "male",
//       "nationality": "",
//       "birthdate": null,
//       "birthplace": "",
//       "place_of_residence": "",
//       "citizen_id": "",
//       "phone": null,
//       "email": "",
//       "date_of_contract": null,
//       "contract_end_date": null,
//       "createdAt": "2024-12-25T17:13:34.521Z",
//       "updatedAt": "2024-12-25T17:13:34.521Z",
//       "__v": 0,
//       "department": {
//           "_id": "676c165478a6dcd4fde7d2f4",
//           "organization_id": "6768e603acc8cf3dc2219395",
//           "name": "Marketing",
//           "size": 0,
//           "createdAt": "2024-12-25T14:27:32.181Z",
//           "updatedAt": "2024-12-25T14:27:32.181Z",
//           "__v": 0
//       }
//   }
// }

const AttendanceTable = ({
  dataList,
  typeAttendance,
}: {
  dataList: any[];
  typeAttendance: any;
}) => {
  const filterData = dataList?.filter((item: any) => {
    if (typeAttendance === "All") return true;

    switch (typeAttendance) {
      case "Work":
        return item.type === ATTENDANCE_TYPES.WORK;
      case "Late":
        return item.type === ATTENDANCE_TYPES.LATE;
      case "Early":
        return item.type === ATTENDANCE_TYPES.EARLY;
      case "Off":
        return (
          item.type === ATTENDANCE_TYPES.OFF_AUTHORIZED ||
          item.type === ATTENDANCE_TYPES.OFF_UNAUTHORIZED
        );
      default:
        return false;
    }
  });

  return (
    <div className="px-6 py-3 flex flex-col justify-between">
      <p className=" text-center text-2xl font-bold py-3">Attendance</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterData?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{`${item.staff.first_name} ${item.staff.last_name}`}</TableCell>
              <TableCell className="capitalize">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${item.staff.gender === "Female"
                    ? "bg-pink-100 text-pink-700"
                    : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {item.staff.gender}
                </span>
              </TableCell>
              <TableCell>{item.staff.department?.name}</TableCell>
              <TableCell>
                {item.check_in
                  ? format(new Date(item.check_in), "hh:mm a")
                  : "Not yet"}
              </TableCell>
              <TableCell>
                {item.check_out
                  ? format(new Date(item.check_out), "hh:mm a")
                  : "Not yet"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
