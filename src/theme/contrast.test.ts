import { describe, expect, it } from 'vite-plus/test'
import { COLORS } from './colors.ts'
import { contrastRatio } from './contrast.ts'

describe('contrastRatio', () => {
  it('黒と白のコントラスト比は21になる', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1)
  })
})

describe('配色トークンは WCAG AA を満たす', () => {
  it('本文と補助テキストはクリーム地で 4.5 以上', () => {
    expect(contrastRatio(COLORS.ink, COLORS.cream)).toBeGreaterThanOrEqual(4.5)
    expect(contrastRatio(COLORS.inkSub, COLORS.cream)).toBeGreaterThanOrEqual(
      4.5,
    )
    expect(contrastRatio(COLORS.inkMuted, COLORS.cream)).toBeGreaterThanOrEqual(
      4.5,
    )
  })

  // 小さな見出しラベル（11px太字）にも使うので通常テキスト基準の 4.5
  it('橙の文字はクリーム地と白カードで 4.5 以上', () => {
    expect(
      contrastRatio(COLORS.orangeText, COLORS.cream),
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      contrastRatio(COLORS.orangeText, COLORS.card),
    ).toBeGreaterThanOrEqual(4.5)
  })

  // プロフィール帯は明るい橙のまま、文字をこげ茶にする（白文字は 2.31 で不足）
  it('橙ブロック上のこげ茶文字は 4.5 以上', () => {
    expect(contrastRatio(COLORS.ink, COLORS.orange)).toBeGreaterThanOrEqual(4.5)
  })
})
