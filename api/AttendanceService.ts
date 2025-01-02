import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import LoginSession from '@/app/cookie'
import { StaffResponse } from './constant/response'

const ATTENDANCE_URL = `${BASE_URL}/attendance`

export const AttendanceService = {
  checkin: async (): Promise<any> => {
    return await axios.post(`${ATTENDANCE_URL}/checkin`, null,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },
  checkout: async (): Promise<any> => {
    return await axios.post(`${ATTENDANCE_URL}/checkout`, null,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  getAllTodayAttendance: async (
    page: number = 1,
    limit: number = 10,
    sortByCheckIn: number = 1,
    sortByCheckOut?: number,
    name?: string,
    department?: string,
    gender?: string
  ): Promise<any> => {
    let sortParam = sortByCheckIn && `&sort=type:${sortByCheckIn === 1 ? 'asc' : 'desc'}`
    sortParam = sortByCheckOut ? `&sort=type:${sortByCheckOut === 1 ? 'asc' : 'desc'}` : sortParam
    let filterParam = (name || department || gender) ? '&filter=' : ''
    filterParam += name && `name=ilike=${name};`
    filterParam += department && `department._id=eq=${department};`
    filterParam += gender && `gender=ilike=${gender};`

    console.log(filterParam)

    return await axios.get(`${ATTENDANCE_URL}/today?page=${page}&limit=${limit}${sortParam}${filterParam}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },
  getMyTodayAttendance: async (): Promise<any> => {
    return await axios.get(`${ATTENDANCE_URL}/my/today`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  }
}