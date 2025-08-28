import { describe, it, expect } from 'vitest'
import { GET } from '../app/api/ping/route'

describe('/api/ping', () => {
  it('returns ok', async () => {
    const res = await GET(new Request('http://localhost/api/ping'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toEqual({ ok: true })
  })
  it('captures error on fail=1', async () => {
    const res = await GET(new Request('http://localhost/api/ping?fail=1'))
    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toBe('ping_failed')
    // eventId может быть undefined в тесте, важно лишь что 500 и структура
  })
})
