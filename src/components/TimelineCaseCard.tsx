import { isPending } from '../content/pending.ts'
import type { TimelineCase } from '../content/types.ts'
import { CaseCard } from './CaseCard.tsx'
import { ExternalLink } from './ExternalLink.tsx'

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
    <CaseCard number={item.number} role={item.role} title={item.title}>
      <ol className="mt-5 space-y-4 border-l-[3px] border-orange pl-4">
        {steps.map(([label, text]) => (
          <li key={label}>
            <p className="text-sm font-bold text-orange-text">
              <span aria-hidden="true">● </span>
              {label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-sub">{text}</p>
          </li>
        ))}
      </ol>
      {item.bridge && (
        <p className="mt-4 rounded-lg bg-surface px-4 py-3 text-sm">
          {item.bridge}
        </p>
      )}
      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
        {links.map((link) => (
          <li key={link.href}>
            <ExternalLink
              link={link}
              className="text-orange-text underline-offset-4 hover:underline"
            >
              {link.label} →
            </ExternalLink>
          </li>
        ))}
      </ul>
    </CaseCard>
  )
}
