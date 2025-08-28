export const runtime = 'edge'

import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } },
    )

    // Простая проверка аутентификации
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), { 
        status: 401,
        headers: { 'content-type': 'application/json' }
      })
    }

    // RLS вернёт только собственные строки
    const [{ data: profile, error: pErr }, { data: memberships, error: mErr }] = await Promise.all([
      supabase.from('profiles').select('id, auth_user_id, full_name').maybeSingle(),
      supabase.from('memberships').select('org_id, role'),
    ])

    if (pErr || mErr) {
      return new Response(JSON.stringify({ error: pErr?.message || mErr?.message }), { status: 500 })
    }

    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email },
        profile,
        memberships: memberships ?? [],
      }),
      { headers: { 'content-type': 'application/json' } },
    )
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'content-type': 'application/json' }
    })
  }
}
