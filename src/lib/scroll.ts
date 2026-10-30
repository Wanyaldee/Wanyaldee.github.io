/** ページ全体のスクロール位置を 0（先頭）〜 1（末尾）で返す */
export function scrollProgress(
  scrollY: number,
  documentHeight: number,
  viewportHeight: number,
): number {
  const scrollable = documentHeight - viewportHeight
  if (scrollable <= 0) return 0
  return Math.min(1, Math.max(0, scrollY / scrollable))
}
