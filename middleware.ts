import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthenticated = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Redirect unauthenticated users from dashboard to sign in
  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  // Redirect authenticated users from auth pages to dashboard
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}

