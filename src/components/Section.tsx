import type { ReactNode } from 'react'

type Props = { id: string; label: string; title: string; children: ReactNode }

// 章の見出し: 大きな欧文 + 小さな日本語
export function Section({ id, label, title, children }: Props) {
  return (
    <section
      id={id}
      className="scroll-mt-16 py-12 sm:py-28"
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`} className="mb-8 sm:mb-12">
        <span className="block font-display text-5xl font-medium tracking-wide sm:text-6xl">
          {label}
        </span>
        <span className="mt-2 block text-xs tracking-[0.3em] text-ink-muted">
          {title}
        </span>
      </h2>
      {children}
    </section>
  )
}
