import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import type { NextRequest } from 'next/server'
import { envPublic } from '@potlucky/config'

/**
 * Возвращает Supabase-клиент для Edge-хендлеров:
 * 1) Если в запросе есть Authorization: Bearer <token> → используем его (идеально для тестов/e2e).
 * 2) Иначе пытаемся прочитать SSR-cookies (если хендлер принимает NextRequest).
 * 3) Фолбэк — анонимный клиент (дальше RLS отфильтрует доступ).
 */
export function createSupabaseForRequest(req: Request | NextRequest, resHeaders?: Headers) {
  const authHeader = req.headers.get('authorization')
  if (authHeader) {
    return createClient(
      envPublic.NEXT_PUBLIC_SUPABASE_URL,
      envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: authHeader } },
        auth: { persistSession: false },
      },
    )
  }

  // SSR-cookies путь (работает, если хендлер принимает NextRequest + у нас есть доступ к cookies через него)
  // В Edge route handlers чаще используем токен или анонимный клиент; cookies используются, если NextRequest доступен.
  try {
    if (typeof (req as NextRequest).cookies?.get === 'function') {
      const r = createServerClient(
        envPublic.NEXT_PUBLIC_SUPABASE_URL,
        envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
          cookies: {
            get: (name: string) => (req as NextRequest).cookies.get(name)?.value,
            set: (name, value) => {
              // опционально: прокидывать куки обратно в ответ
              resHeaders?.append('set-cookie', `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`)
            },
            remove: (name) => {
              resHeaders?.append('set-cookie', `${name}=; Path=/; Max-Age=0`)
            },
          },
        },
      )
      return r
    }
  } catch {
    // игнор
  }

  // Фолбэк: anon
  return createClient(envPublic.NEXT_PUBLIC_SUPABASE_URL, envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  })
}
