import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import { USER_ROLES } from '@/constants/enum'
import LoginSession from '@/app/cookie'

const USER_URL = `${BASE_URL}/user`

export const UserService = {
  joinOrg: async (org_id: string): Promise<any> => {
    return await axios.get(`${USER_URL}/join/${org_id}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => {
        return error.response.data
      })
  },
  getMe: async (): Promise<any> => {
    return await axios.get(`${USER_URL}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => {
        return error.response.data
      })
  },
}