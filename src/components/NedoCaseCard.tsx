import type { NedoCase } from '../content/types.ts'
import { ArrowLink } from './ArrowLink.tsx'
import { CaseHeader } from './CaseHeader.tsx'

type Props = { item: NedoCase }

// 公開範囲はチーム名・課題名・役割・リンクのみ
export function NedoCaseCard({ item }: Props) {
  return (
    <article>
      <CaseHeader
        number={item.number}
        role={item.role}
        title={`NEDO 量子コンピュータ懸賞金チャレンジ（チーム ${item.team}）`}
      />
      <dl className="mt-8 text-sm">
        <dt className="font-display text-lg text-orange-text italic">Theme</dt>
        <dd className="mt-1 leading-loose text-ink-sub">{item.theme}</dd>
      </dl>
      <div className="mt-8">
        <ArrowLink link={item.link} />
      </div>
    </article>
  )
}
