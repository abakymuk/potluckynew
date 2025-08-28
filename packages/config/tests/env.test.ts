import { describe, it, expect } from 'vitest'
import { validateEnv } from '../src/schema'

describe('config/public env', () => {
  it('fails without required NEXT_PUBLIC_*', () => {
    const result = validateEnv({
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: undefined,
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('NEXT_PUBLIC_SUPABASE_URL'))).toBe(
        true,
      )
      expect(
        result.error.issues.some((i) => i.path.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')),
      ).toBe(true)
    }
  })

  it('parses flags booleans', () => {
    const result = validateEnv({
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon_key_1234567890',
      ONLINE_ORDERING_V1: 'true',
      ORDER_QUEUE_V1: '0',
      AI_ADVISOR_V1: 'yes',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.ONLINE_ORDERING_V1).toBe(true)
      expect(result.data.ORDER_QUEUE_V1).toBe(false)
      expect(result.data.AI_ADVISOR_V1).toBe(true)
    }
  })
})
