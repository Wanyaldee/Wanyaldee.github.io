import { describe, expect, it } from 'vite-plus/test'
import { scrollProgress } from './scroll.ts'

describe('scrollProgress', () => {
  it('ページ先頭で 0、末尾で 1', () => {
    expect(scrollProgress(0, 5000, 1000)).toBe(0)
    expect(scrollProgress(4000, 5000, 1000)).toBe(1)
  })

  it('途中は比例する', () => {
    expect(scrollProgress(1000, 5000, 1000)).toBe(0.25)
  })

  it('範囲外やスクロールできないページでは 0〜1 に収める', () => {
    expect(scrollProgress(-50, 5000, 1000)).toBe(0)
    expect(scrollProgress(9000, 5000, 1000)).toBe(1)
    expect(scrollProgress(0, 800, 1000)).toBe(0)
  })
})
