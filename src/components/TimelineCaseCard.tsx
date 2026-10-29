import { isPending } from '../content/pending.ts'
import type { TimelineCase } from '../content/types.ts'
import { ArrowLink } from './ArrowLink.tsx'
import { CaseHeader } from './CaseHeader.tsx'

type Props = { item: TimelineCase }

export function TimelineCaseCard({ item }: Props) {
  const steps = [
    ['Background', item.background],
    ['Decision', item.decision],
    ['Reflection', item.reflection],
    ['Result', item.result],
  ] as const
  const links = item.links.filter((l) => !isPending(l.label))

  return (
    <article>
      <CaseHeader number={item.number} role={item.role} title={item.title} />
      <ol className="mt-8 space-y-6 border-l border-orange pl-6">
        {steps.map(([label, text]) => (
          <li key={label} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.8rem] size-2 rounded-full bg-orange"
            />
            <p className="font-display text-lg text-orange-text italic">
              {label}
            </p>
            <p className="mt-1 text-sm leading-loose text-ink-sub">{text}</p>
          </li>
        ))}
      </ol>
      {item.bridge && (
        <p className="mt-8 text-sm leading-loose">{item.bridge}</p>
      )}
      <ul className="mt-8 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <ArrowLink link={link} />
          </li>
        ))}
      </ul>
    </article>
  )
}
