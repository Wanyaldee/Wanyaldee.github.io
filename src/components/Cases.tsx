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
    <Section id="cases" label="Cases" title="実績と、そのときの判断">
      <ol className="space-y-24">
        {cases.map((item) => (
          <li key={item.id}>{renderCase(item)}</li>
        ))}
      </ol>
    </Section>
  )
}
