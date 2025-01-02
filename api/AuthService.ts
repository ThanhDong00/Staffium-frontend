import { BASE_URL } from '@/constants/server'
import axios from 'axios'
import { SignInForm, SignUpForm } from './constant/request'
import { USER_ROLES } from '@/constants/enum'
import LoginSession from '@/app/cookie'

const AUTH_URL = `${BASE_URL}/auth`

export const AuthService = {
  signUp: async (form: SignUpForm): Promise<any> => {
    return await axios.post(`${AUTH_URL}/signup`, form)
      .then(res => res.data)
      .catch(error => {
        return error.response.data
      })
  },

  signIn: async (form: SignInForm): Promise<any> => {
    return await axios.post(`${AUTH_URL}/login`, form)
      .then(async (res) => {
        LoginSession.set(res.data.data.access_token)

        const isHR = await AuthService.checkRole(USER_ROLES.HR)
        if (isHR)
          LoginSession.setRole(USER_ROLES.HR)
        else
          LoginSession.setRole(USER_ROLES.STAFF)

        return res.data
      })
      .catch(error => error.response.data)

  },

  logout: async () => {
    return await axios.post(`${AUTH_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${LoginSession.get()}`
      }
    }
    )
      .then(async (res) => {
        await LoginSession.clear()
        localStorage.clear()
        return res.data
      })
      .catch(error => error.response.data)

  },

  check: async (token: string): Promise<any> => {
    return await axios.get(`${AUTH_URL}/check`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => res.data)
      .catch(error => error.response.data)
  },

  checkRole: async (role: string): Promise<boolean | undefined> => {
    return await axios.get(`${AUTH_URL}/check-role/${role}`,
      {
        headers: {
          Authorization: `Bearer ${LoginSession.get()}`,
        }
      })
      .then(() => true)
      .catch(error => {
        return false
      })
  },
}