import type { Case } from '../content/types.ts'
import { NedoCaseCard } from './NedoCaseCard.tsx'
import { Section } from './Section.tsx'
import { TimelineCaseCard } from './TimelineCaseCard.tsx'

type Props = { cases: Case[] }

function renderCase(item: Case) {
  switch (item.kind) {
    case 'timeline':
      return <TimelineCaseCard item={item} />
    case 'nedo':
      return <NedoCaseCard item={item} />
    default: {
      const unreachable: never = item
      return unreachable
    }
  }
}

export function Cases({ cases }: Props) {
  return (
    <Section id="cases" label="CASES" title="思考プロセスの証明">
      <ol className="space-y-6">
        {cases.map((item) => (
          <li key={item.id}>{renderCase(item)}</li>
        ))}
      </ol>
    </Section>
  )
}
