import { NextRequest, NextResponse } from 'next/server'
import { USER_ROLES } from './constants/enum'
import { getCookieByName } from './utils/parseCookie'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { AuthService } from './api/AuthService'

// 1. Specify protected and public routes
// const
const protectedRoutes = [
  '/attendance',
  '/configurations',
  '/dashboard',
  '/organization',
  '/requests',
  '/staff',
  '/statistics',
  '/personal',
  '/account'
]
const publicRoutes = ['/', '/login', '/signup', '/whoareyou', '/resetpassword']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  // console.log(req.cookies)
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix))
  const isPublicRoute = publicRoutes.includes(path)

  const search = req.nextUrl.search.slice(1).split('=')
  if (search[0] === 'user' && search[1] === 'invalid') {
    return NextResponse.next()
  }
  else {
    const token = req.cookies.get('access_token')
    const role = req.cookies.get('role')

    const check = await AuthService.check(token?.value || '')
    if (isProtectedRoute && check.status === 401) {
      return NextResponse.redirect(new URL('/login?user=invalid', req.nextUrl))
    }

    if (isProtectedRoute && !token?.value) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (
      isPublicRoute &&
      token?.value
    ) {
      switch (role?.value) {
        case USER_ROLES.HR:
          return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
        case USER_ROLES.STAFF:
          return NextResponse.redirect(new URL('/personal', req.nextUrl))
        default:
          return NextResponse.next()
      }
    }
  }




  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}