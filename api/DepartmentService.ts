import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import LoginSession from '@/app/cookie'
import { CreateOrgDTO } from './constant/request'

const DEPT_URL = `${BASE_URL}/dept`

export const DepartmentService = {
  getAllDept: async (): Promise<any> => {
    return await axios.get(`${DEPT_URL}/all`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  createNewDept: async (name: string): Promise<any> => {
    return await axios.post(`${DEPT_URL}`,
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

  updateDept: async (id: string, name: string): Promise<any> => {
    return await axios.put(`${DEPT_URL}/${id}`,
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

  deleteDept: async (id: string): Promise<any> => {
    return await axios.delete(`${DEPT_URL}/${id}`,
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