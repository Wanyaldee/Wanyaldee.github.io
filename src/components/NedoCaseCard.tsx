import type { NedoCase } from '../content/types.ts'
import { CaseCard } from './CaseCard.tsx'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { item: NedoCase }

// 公開範囲はチーム名・課題名・役割・リンクのみ（設計書 §4.3 CASE 03）
export function NedoCaseCard({ item }: Props) {
  return (
    <CaseCard
      number={item.number}
      role={item.role}
      title={`NEDO 量子コンピュータ懸賞金チャレンジ（チーム ${item.team}）`}
    >
      <dl className="mt-4 text-sm">
        <dt className="font-bold text-orange-text">懸賞課題</dt>
        <dd className="mt-1 leading-relaxed text-ink-sub">{item.theme}</dd>
      </dl>
      <p className="mt-5 text-sm font-bold">
        <ExternalLink
          link={item.link}
          className="text-orange-text underline-offset-4 hover:underline"
        >
          {item.link.label} →
        </ExternalLink>
      </p>
    </CaseCard>
  )
}
