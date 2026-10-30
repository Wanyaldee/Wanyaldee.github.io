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
      <dl className="mt-8 space-y-6">
        {steps.map(([label, text]) => (
          <div key={label} className="sm:grid sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="font-display text-lg text-orange-text italic">
              {label}
            </dt>
            <dd className="mt-1 text-sm leading-loose text-ink-sub sm:mt-0.5">
              {text}
            </dd>
          </div>
        ))}
      </dl>
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
