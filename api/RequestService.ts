import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import LoginSession from '@/app/cookie'
import { CreateRequestForm } from './constant/request'

const REQUEST_URL = `${BASE_URL}/request`

export const RequestService = {

  getAllThisMonthRequest: async (): Promise<any> => {
    return await axios.get(`${REQUEST_URL}/all_this_month`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  getAllMyRequest: async (): Promise<any> => {
    return await axios.get(`${REQUEST_URL}/all_of_me`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  createRequest: async (form: CreateRequestForm): Promise<any> => {
    return await axios.post(`${REQUEST_URL}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  updateMyRequest: async (id: string, form: CreateRequestForm): Promise<any> => {
    return await axios.put(`${REQUEST_URL}/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },

  approve: async (id: string): Promise<any> => {
    return await axios.post(`${REQUEST_URL}/approve/${id}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res.data)
      .catch(error => error.response.data)
  },
  reject: async (id: string): Promise<any> => {
    return await axios.post(`${REQUEST_URL}/reject/${id}`,
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