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
  changeDisplayName: async (name: string): Promise<any> => {
    return await axios.put(`${USER_URL}/name`,
      { name: name },
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
  changeAvatar: async (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append('file', file)
    return await axios.put(`${USER_URL}/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
      .then(res => res.data)
      .catch(error => {
        return error.response.data
      })
  },
}