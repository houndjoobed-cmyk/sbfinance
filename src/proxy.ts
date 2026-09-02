import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://zympcihvfsxdlxuvaqtc.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bXBjaWh2ZnN4ZGx4dXZhcXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg2NjgsImV4cCI6MjEwMjcyNDY2OH0.auKCHnM-kLlKuKxA55b45aUpo-0Kc42EXYxAxetEN5E";

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/sbf-gestion/login')
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/sbf-gestion')

  if (isDashboardRoute && !isAuthRoute && !user) {
    const loginUrl = new URL('/sbf-gestion/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && user) {
    const dashboardUrl = new URL('/sbf-gestion', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/sbf-gestion/:path*',
  ],
}
