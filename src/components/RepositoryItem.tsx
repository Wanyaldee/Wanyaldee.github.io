import { withoutPending } from '../content/pending.ts'
import { repositoryUrl } from '../content/repositories.ts'
import type { Repository, SiteText } from '../content/types.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { repo: Repository; text: SiteText['repositoriesPage'] }

// '2026-10-23' → '2026.10〜'
function startedLabel(date: string): string {
  return `${date.slice(0, 4)}.${date.slice(5, 7)}〜`
}

const DETAILS = [
  ['Why', 'why'],
  ['Thought', 'thought'],
  ['Now', 'now'],
] as const

// 一覧の1件。概要は常に見せ、Why / Thought / Now は開いたときだけ見せる
export function RepositoryItem({ repo, text }: Props) {
  const name = repo.id.split('/')[1]
  return (
    <article data-repository={repo.id} className="border-b border-ink/15 py-10">
      <h2 className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-lg font-bold break-all">{name}</span>
        <span className="rounded-full bg-surface px-3 text-[11px] tracking-widest text-orange-text">
          {withoutPending(repo.status)}
        </span>
      </h2>
      <p className="mt-2 text-[11px] tracking-widest text-ink-muted">
        {repo.language} ・ {repo.license} ・ {startedLabel(repo.startedOn)}
        {repo.forkOf && (
          <>
            {' ・ '}
            <ExternalLink
              link={repo.forkOf}
              className="underline underline-offset-4 hover:text-orange-text"
            />
            {text.forkSuffix}
          </>
        )}
      </p>
      <p data-overview className="mt-4 text-sm leading-loose">
        {withoutPending(repo.overview)}
      </p>
      <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-widest">
        <ExternalLink
          link={{ label: text.github, href: repositoryUrl(repo) }}
          className="underline underline-offset-4 hover:text-orange-text"
        >
          {text.github} →
        </ExternalLink>
        {repo.page && (
          <ExternalLink
            link={repo.page}
            className="underline underline-offset-4 hover:text-orange-text"
          >
            {repo.page.label} →
          </ExternalLink>
        )}
        {repo.relatedLinks?.map((link) => (
          <ExternalLink
            key={link.href}
            link={link}
            className="underline underline-offset-4 hover:text-orange-text"
          >
            {link.label} →
          </ExternalLink>
        ))}
      </p>
      <details className="group mt-4">
        <summary className="inline-block cursor-pointer border-b border-ink/70 pb-1 text-xs tracking-widest hover:border-orange-text hover:text-orange-text">
          {text.details}
          <span aria-hidden="true" className="ml-2 group-open:hidden">
            ＋
          </span>
          <span aria-hidden="true" className="ml-2 hidden group-open:inline">
            －
          </span>
        </summary>
        <dl data-details-body className="mt-4 space-y-4 text-sm">
          {DETAILS.map(([label, key]) => (
            <div key={key}>
              <dt className="font-display text-lg text-orange-text italic">
                {label}
              </dt>
              <dd className="mt-1 leading-loose text-ink-sub">
                {withoutPending(repo[key])}
              </dd>
            </div>
          ))}
        </dl>
      </details>
      {repo.relatedCase && (
        <p className="mt-4 text-xs tracking-widest">
          <a
            href="/#cases"
            className="underline underline-offset-4 hover:text-orange-text"
          >
            {text.relatedCase} →
          </a>
        </p>
      )}
    </article>
  )
}
