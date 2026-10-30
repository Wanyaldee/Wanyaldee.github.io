import { withoutPending } from '../content/pending.ts'
import type { SiteText, Work } from '../content/types.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { work: Work; text: SiteText['repositoriesPage'] }

// リポジトリを公開していない成果物の1件。GitHub へのリンクは持たない
export function WorkItem({ work, text }: Props) {
  return (
    <article data-work={work.id} className="border-b border-ink/15 py-10">
      <h3 className="text-lg font-bold">{work.name}</h3>
      <p className="mt-4 text-sm leading-loose">
        {withoutPending(work.overview)}
      </p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-widest">
        <ExternalLink
          link={work.page}
          className="underline underline-offset-4 hover:text-orange-text"
        >
          {work.page.label} →
        </ExternalLink>
        {work.relatedCase && (
          <a
            href="/#cases"
            className="underline underline-offset-4 hover:text-orange-text"
          >
            {text.relatedCase} →
          </a>
        )}
      </p>
    </article>
  )
}
