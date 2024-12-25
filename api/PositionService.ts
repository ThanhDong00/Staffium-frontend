import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import LoginSession from '@/app/cookie'

const POS_URL = `${BASE_URL}/position`

export const PositionService = {
  getAllPos: async (): Promise<any> => {
    return await axios.get(`${POS_URL}/all`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  createNewPos: async (name: string): Promise<any> => {
    return await axios.post(`${POS_URL}`,
      { name: name },
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  updatePos: async (id: string, name: string): Promise<any> => {
    return await axios.put(`${POS_URL}/${id}`,
      { name: name },
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  deletePos: async (id: string): Promise<any> => {
    return await axios.delete(`${POS_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },
}