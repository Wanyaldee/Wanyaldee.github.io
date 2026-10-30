import { useEffect, useRef } from 'react'
import { scrollProgress } from './scroll.ts'

// スクロール量を CSS 変数 --scroll（0〜1）として要素に書き込む。
// 再レンダーを起こさないよう state ではなく style を直接更新する。
// 動きを減らす設定の利用者には適用しない。
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const update = () => {
      frame = 0
      const p = scrollProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      )
      el.style.setProperty('--scroll', p.toFixed(4))
    }
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return ref
}
