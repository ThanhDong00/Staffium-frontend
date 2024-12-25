import { calcDate } from '@/utils/calcDate'


const ACCESS_TOKEN_KEY = 'access_token'
const USER_ROLE_KEY = 'role'

const ACCESS_TOKEN_EXPIRES_TIME = 60 * 60 * 24

const LoginSession = {
  set: (token: string) => {
    document.cookie = `${ACCESS_TOKEN_KEY}=${token}; path=/; expires=${calcDate(new Date(), ACCESS_TOKEN_EXPIRES_TIME).toString()}`
  },
  get: () => {
    let match = document.cookie.match(new RegExp('(^| )' + ACCESS_TOKEN_KEY + '=([^;]+)'));
    if (match) return match[2];
    return null
  },
  clear: () => {
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  },
  setRole: (role: string) => {
    document.cookie = `${USER_ROLE_KEY}=${role}; path=/; expires=${calcDate(new Date(), ACCESS_TOKEN_EXPIRES_TIME).toString()}`
  },
  role: () => {
    let match = document.cookie.match(new RegExp('(^| )' + USER_ROLE_KEY + '=([^;]+)'));
    if (match) return match[2];
    return null
  },
}

export default LoginSession