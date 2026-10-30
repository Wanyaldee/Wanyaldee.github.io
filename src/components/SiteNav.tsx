import { useEffect, useState } from 'react'
import { withoutPending } from '../content/pending.ts'
import { REPOSITORIES_PATH } from '../content/site.ts'

type Props = { repositoriesLabel: string }

type Item = { href: string; label: string; en: string }

// トップは連絡先・SNSの一覧（Hero 内の #top-contacts）へ移る
const SECTIONS: Item[] = [
  { href: '#top-contacts', label: 'トップ', en: 'Top' },
  { href: '#about', label: 'わたしについて', en: 'About' },
  { href: '#cases', label: '実績', en: 'Cases' },
  { href: '#skills', label: '技術', en: 'Skills' },
  { href: '#contact', label: 'これから', en: 'Vision' },
]

// セクションナビ。PC（lg 以上）は本文の上端に固定した帯、
// それより狭い画面は右上のボタンから開く全画面のメニュー（event.awajiempire.net に倣う）
export function SiteNav({ repositoriesLabel }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const items: Item[] = [
    ...SECTIONS,
    {
      href: REPOSITORIES_PATH,
      label: withoutPending(repositoriesLabel),
      en: 'Repositories',
    },
  ]

  // 開いている間は背面をスクロールさせず、Esc で閉じる
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <nav
        aria-label="セクション"
        className="fixed top-0 left-0 z-40 hidden w-1/2 bg-cream/90 backdrop-blur-sm lg:block"
      >
        <ul className="mx-auto flex max-w-xl flex-wrap gap-x-6 gap-y-2 px-10 py-4 text-xs tracking-widest">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-orange-text">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
        aria-controls="site-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed top-4 right-4 z-[60] grid size-11 place-items-center rounded-sm bg-cream/90 text-ink backdrop-blur-sm lg:hidden"
      >
        <span aria-hidden="true" className="text-xl leading-none">
          {isOpen ? '×' : '☰'}
        </span>
      </button>

      {isOpen && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="メニュー"
          className="fixed inset-0 z-50 overflow-y-auto bg-cream lg:hidden"
        >
          <p className="pt-12 text-center text-xs tracking-[0.4em] text-orange-text">
            MENU
          </p>
          <ul className="mt-8 space-y-8 pb-12 text-center">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="inline-block hover:text-orange-text"
                >
                  <span className="block text-2xl font-medium tracking-[0.2em]">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 block font-display text-sm tracking-[0.3em] text-ink-muted"
                  >
                    {item.en}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
