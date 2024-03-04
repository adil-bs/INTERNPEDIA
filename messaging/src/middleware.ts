import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export  function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const user = cookies().get('ChatApp_email')
  const isInAuthPage = pathname === '/auths'

  const protectedRoutes = ['/dashboard']
  const isInProtectedRoutes = protectedRoutes.some(routes => pathname.startsWith(routes)) 

  if (isInAuthPage) {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard/chat/globalchat', req.url))
    }

    return NextResponse.next()

  }

  if (!user && isInProtectedRoutes) {
    return NextResponse.redirect(new URL('/auths', req.url))
  }

  if (pathname === '/' || pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/chat/globalchat', req.url))
  }
}
