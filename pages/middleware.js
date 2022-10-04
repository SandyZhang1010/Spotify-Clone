import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware (request) {
  const token = await getToken({ request, secret: process.env.JWT_SECRET })

  const { pathname, origin } = request.nextUrl

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if ((!token) && (pathname !== '/login')) {
    //const url = request.nextUrl.clone()
    //url.pathname = '/login'
    //return NextResponse.next()
    // return NextResponse.redirect(url)

    return NextResponse.redirect(`${origin}/login`)
    // return NextResponse.redirect(new URL('/login', req.url))
  }
  // return NextResponse.next()
}
