import type { ReactNode } from 'react'

type Props = {
  number: string
  role: string
  title: string
  children: ReactNode
}

// Case 共通の外枠（モックアップ case-card.html の timeline 案）
export function CaseCard({ number, role, title, children }: Props) {
  return (
    <article className="rounded-2xl bg-card p-5 shadow-sm sm:p-6">
      <p className="text-xs font-bold tracking-[0.12em] text-orange-text">
        CASE {number} ・ {role}
      </p>
      <h3 className="mt-1 text-lg font-bold">{title}</h3>
      {children}
    </article>
  )
}
