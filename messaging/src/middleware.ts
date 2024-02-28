import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export  function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const user = cookies().get('ChatApp_email')
  const isAuthPage = pathname.startsWith('/auths')

  if (isAuthPage) {
    if (user) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()

  }

  if (!user && pathname==='/') {
    return NextResponse.redirect(new URL('/auths', req.url))
  }
}
