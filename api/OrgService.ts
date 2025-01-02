import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import { USER_ROLES } from '@/constants/enum'
import LoginSession from '@/app/cookie'
import { CreateOrgDTO } from './constant/request'

const ORG_URL = `${BASE_URL}/org`

export const OrgService = {
  getInvitation: async (): Promise<any> => {
    return await axios.get(`${ORG_URL}/invitation`,
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

  createNewOrg: async (payload: CreateOrgDTO): Promise<any> => {
    return await axios.post(`${ORG_URL}`,
      payload,
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

  getInfo: async (): Promise<any> => {
    return await axios.get(`${ORG_URL}/info`,
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