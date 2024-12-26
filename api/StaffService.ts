import { BASE_URL } from "@/constants/server";
import axios from "axios";
import LoginSession from "@/app/cookie";
import { StaffResponse } from "./constant/response";

const STAFF_URL = `${BASE_URL}/staff`;

export const StaffService = {
  getMyRecord: async (): Promise<any> => {
    return await axios
      .get(`${STAFF_URL}/my-record`, {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => error.response.data);
  },

  getAllStaff: async (
    page: number = 1,
    limit: number = 10,
    sort?: number,
    name?: string,
    department?: string,
    gender?: string
  ): Promise<any> => {
    let url = `${STAFF_URL}/all?page=${page}&limit=${limit}`;

    if (sort !== undefined) {
      url += `&sort=name:${sort === 1 ? "asc" : "desc"}`;
    }
    // let sortParam = sort && `&sort=name:${sort === 1 ? 'asc' : 'desc'}`

    const filters = [];
    if (name) filters.push(`name=ilike=${name}`);
    if (department) filters.push(`department._id=eq=${department}`);
    if (gender) filters.push(`gender=ilike=${gender}`);

    if (filters.length > 0) {
      url += `&filter=${filters.join(";")}`;
    }

    // let filterParam = (name || department || gender) ? '&filter=' : ''
    // filterParam += name && `name=ilike=${name};`
    // filterParam += department && `department._id=eq=${department};`
    // filterParam += gender && `gender=ilike=${gender};`

    // console.log(filterParam)

    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => error.response.data);
  },

  updateMyRecord: async (payload: Object): Promise<any> => {
    return await axios
      .put(`${STAFF_URL}/my-record`, payload, {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data;
      });
  },

  getStaffById: async (id: string): Promise<any> => {
    return await axios
      .get(`${STAFF_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data;
      });
  },
};
