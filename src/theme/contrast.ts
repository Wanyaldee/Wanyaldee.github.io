// WCAG 2.x のコントラスト比（https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio）

function channel(value: number): number {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string): number {
  const n = Number.parseInt(hex.replace('#', ''), 16)
  const r = channel((n >> 16) & 0xff)
  const g = channel((n >> 8) & 0xff)
  const b = channel(n & 0xff)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrastRatio(fg: string, bg: string): number {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
  return (hi + 0.05) / (lo + 0.05)
}
