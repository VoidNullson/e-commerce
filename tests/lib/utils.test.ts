import { expect, test } from 'vitest'
import { currency } from '@/lib/utils'

test('currency formatter', () => {
  expect(currency(12.5)).toBe('$12.50')
  expect(currency('12.5')).toBe('$12.50')
  expect(currency(100)).toBe('$100.00')
  expect(currency(0)).toBe('$0.00')
})
