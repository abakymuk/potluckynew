import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { envPublic } from '@potlucky/config'

export async function middleware(req: NextRequest) {
  // Сформируем новые заголовки запроса, которые полетят дальше в роут-хендлеры
  const requestHeaders = new Headers(req.headers)

  // Добавляем request-id для трейсинга
  const rid = requestHeaders.get('x-request-id') ?? crypto.randomUUID()
  requestHeaders.set('x-request-id', rid)

  // SSR-клиент Supabase (Edge-совместим)
  const supabase = createServerClient(
    envPublic.NEXT_PUBLIC_SUPABASE_URL,
    envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set() {
          /* noop: middleware не устанавливает cookie */
        },
        remove() {
          /* noop */
        },
      },
    },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.id) {
      requestHeaders.set('x-user-id', user.id)
      const orgId = req.cookies.get('org_id')?.value
      if (orgId) requestHeaders.set('x-org-id', orgId)
    }
  } catch {
    // молча продолжаем без заголовков
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

// Исключаем статику из middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
