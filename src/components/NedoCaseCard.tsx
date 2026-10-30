import type { NedoCase } from '../content/types.ts'
import { ArrowLink } from './ArrowLink.tsx'
import { CaseHeader } from './CaseHeader.tsx'

type Props = { item: NedoCase }

// 公開範囲はチーム名・課題名・役割・リンクと、本人の参加歴のみ
export function NedoCaseCard({ item }: Props) {
  return (
    <article>
      <CaseHeader
        number={item.number}
        role={item.role}
        title={`${item.program}（チーム ${item.team}）`}
      />
      <dl className="mt-8 text-sm">
        <dt className="font-display text-lg text-orange-text italic">Theme</dt>
        <dd className="mt-1 leading-loose text-ink-sub">{item.theme}</dd>
      </dl>
      <p className="mt-8 text-sm leading-loose">{item.history}</p>
      <ul className="mt-8 space-y-1">
        {item.links.map((link) => (
          <li key={link.href}>
            <ArrowLink link={link} />
          </li>
        ))}
      </ul>
      {/* NEDO の活動から広がったこと */}
      <div className="mt-12 space-y-10">
        {item.connections.map((connection) => (
          <section
            key={connection.id}
            aria-labelledby={`${connection.id}-title`}
          >
            <h4
              id={`${connection.id}-title`}
              className="font-display text-lg text-orange-text italic"
            >
              Next — {connection.title}
            </h4>
            <p className="mt-2 text-sm leading-loose text-ink-sub">
              {connection.body}
            </p>
            <ul className="mt-6 space-y-1">
              {connection.links.map((link) => (
                <li key={link.href}>
                  <ArrowLink link={link} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  )
}
