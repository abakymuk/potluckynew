import { describe, it, expect } from 'vitest'
import type { BrandId } from './index'

describe('types', () => {
  it('should define BrandId type', () => {
    // This is a type-only test, just checking that the type is defined
    const testBrandId: BrandId = 'test' as BrandId
    expect(typeof testBrandId).toBe('string')
  })
})
