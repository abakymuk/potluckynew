import { describe, it, expect } from 'vitest'

describe('db health route', () => {
  it('returns 200 with tables info', async () => {
    const res = await fetch('http://localhost:3000/api/db/health')
    expect(res.status).toBe(200)

    const data = await res.json()
    expect(data).toEqual({
      ok: true,
      tables: ['organizations', 'profiles', 'memberships'],
    })
  })
})
