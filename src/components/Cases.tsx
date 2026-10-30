import { REPOSITORIES_PATH } from '../content/site.ts'
import type { Case } from '../content/types.ts'
import { NedoCaseCard } from './NedoCaseCard.tsx'
import { Section } from './Section.tsx'
import { TimelineCaseCard } from './TimelineCaseCard.tsx'

type Props = { cases: Case[]; repositoriesLinkLabel: string }

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

export function Cases({ cases, repositoriesLinkLabel }: Props) {
  return (
    <Section id="cases" label="Cases" title="実績と、そのときの判断">
      <ol className="space-y-16 sm:space-y-24">
        {cases.map((item) => (
          <li key={item.id}>{renderCase(item)}</li>
        ))}
      </ol>
      <div className="mt-16 sm:mt-24">
        {/* サイト内のページなので同じタブで開く */}
        <a href={REPOSITORIES_PATH} className="arrow-link">
          <span>{repositoriesLinkLabel}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  )
}
