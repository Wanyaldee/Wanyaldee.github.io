import { content } from '../content/index.ts'
import { withoutPending } from '../content/pending.ts'

// リポジトリ一覧ページ（/repositories/）。トップとちがい、本文だけの1カラム
export function RepositoriesPage() {
  const { repositories, site } = content
  const text = site.repositoriesPage
  return (
    <div className="mx-auto max-w-xl px-6 sm:px-10">
      <header className="pt-8">
        <a href="/" className="text-xs tracking-widest hover:text-orange-text">
          ← {text.back}
        </a>
        <h1 className="mt-16">
          <span className="block font-display text-5xl font-medium tracking-wide sm:text-6xl">
            {text.label}
          </span>
          <span className="mt-2 block text-xs tracking-[0.3em] text-ink-muted">
            {withoutPending(text.title)}
          </span>
        </h1>
        <p className="mt-8 text-sm leading-loose text-ink-sub">
          {withoutPending(text.lead)}
        </p>
      </header>
      <main className="py-12 sm:py-20">
        <ol>
          {repositories.map((repo) => (
            <li key={repo.id} data-repository>
              {repo.id}
            </li>
          ))}
        </ol>
      </main>
    </div>
  )
}
