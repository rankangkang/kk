import { describe, expect, it } from 'vitest'
import foo from '../src'

describe('should', () => {
  it('exported', () => {
    foo('test')
    expect(1).toEqual(1)
  })
})
