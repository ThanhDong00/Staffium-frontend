import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import { USER_ROLES } from '@/constants/enum'
import LoginSession from '@/app/cookie'

const FILE_URL = `${BASE_URL}/file`

export const FileService = {
  upload: async (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append('file', file)
    return await axios.post(`${FILE_URL}/upload`,
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
  getImg: async (id: string): Promise<any> => {
    return await axios.get(`${FILE_URL}/avatar/${id}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      }
    )
      .then(res => res)
      .catch(error => {
        return error.response.data
      })
  },
}