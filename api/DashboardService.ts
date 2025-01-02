import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import LoginSession from '@/app/cookie'
import { StaffResponse } from './constant/response'

const DASH_URL = `${BASE_URL}/dashboard`

export const DashboardService = {
  getDashboard: async (): Promise<any> => {
    return await axios.get(`${DASH_URL}/`,
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