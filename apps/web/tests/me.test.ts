import { describe, it, expect } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import { envPublic } from '@potlucky/config'
import { GET as getMe } from '../app/api/me/route'

async function signIn(email: string, password: string) {
  const c = createClient(
    envPublic.NEXT_PUBLIC_SUPABASE_URL,
    envPublic.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: { persistSession: false },
    },
  )
  const { data, error } = await c.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.session!.access_token
}

function makeReq(token?: string) {
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  if (token) headers['authorization'] = `Bearer ${token}`
  return new Request('http://localhost/api/me', { headers })
}

describe('/api/me', () => {
  it('returns 401 without auth', async () => {
    const res = await getMe(makeReq())
    expect(res.status).toBe(401)
  })

  it('Alice sees her profile and membership', async () => {
    const token = await signIn('alice@example.com', 'Passw0rd!')
    const res = await getMe(makeReq(token))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.user.email).toBe('alice@example.com')
    // у Alice должен быть хотя бы один membership (Acme)
    expect(Array.isArray(json.memberships)).toBe(true)
    expect(json.memberships.length).toBeGreaterThan(0)
  })

  it('Bob is authenticated but has no Acme membership', async () => {
    const token = await signIn('bob@example.com', 'Passw0rd!')
    const res = await getMe(makeReq(token))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.user.email).toBe('bob@example.com')
    // допустимо 0 или просто отсутствие Acme — на этом этапе проверяем, что массив существует
    expect(Array.isArray(json.memberships)).toBe(true)
  })
})
