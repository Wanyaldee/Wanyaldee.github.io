import type { ReactNode } from 'react'

type Props = { id: string; label: string; title: string; children: ReactNode }

// 章の見出し: 字間の広い英字ラベル + 日本語見出し + 刷毛線
export function Section({ id, label, title, children }: Props) {
  return (
    <section
      id={id}
      className="scroll-mt-6 py-14"
      aria-labelledby={`${id}-title`}
    >
      <div className="mb-7">
        <p className="text-xs tracking-[0.4em] text-orange-text">{label}</p>
        <h2 id={`${id}-title`} className="mt-1 text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
        <div className="brush-rule mt-3 w-24" />
      </div>
      {children}
    </section>
  )
}
