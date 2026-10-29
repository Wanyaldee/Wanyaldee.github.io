import type { ReactNode } from 'react'

type Props = { id: string; label: string; title: string; children: ReactNode }

export function Section({ id, label, title, children }: Props) {
  return (
    <section id={id} className="scroll-mt-6 py-12">
      <p className="text-xs font-bold tracking-[0.15em] text-orange-text">
        {label}
      </p>
      <h2 className="mt-1 text-xl font-bold sm:text-2xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
