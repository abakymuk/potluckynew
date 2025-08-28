export const runtime = 'edge'

import { createClient } from '@supabase/supabase-js'
import { envPublic } from '@potlucky/config'

export async function GET() {
  const supabase = createClient(
    envPublic.NEXT_PUBLIC_SUPABASE_URL,
    envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } },
  )

  // Проверяем доступность таблиц через lightweight запросы
  const tables = ['organizations', 'profiles', 'memberships']
  const checks: string[] = []
  for (const t of tables) {
    const { error } = await supabase.from(t).select('id').limit(1)
    if (!error) checks.push(t)
  }

  const ok = checks.length === tables.length
  return new Response(JSON.stringify({ ok, tables: checks }), {
    status: ok ? 200 : 500,
    headers: { 'content-type': 'application/json' },
  })
}
