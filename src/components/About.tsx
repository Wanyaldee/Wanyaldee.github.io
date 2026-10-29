import { withoutPending } from '../content/pending.ts'
import type { Profile } from '../content/types.ts'
import { Section } from './Section.tsx'

type Props = { profile: Profile; lead: string }

export function About({ profile, lead }: Props) {
  return (
    <Section id="about" label="About" title="わたしについて">
      <p
        data-lead
        className="text-xl leading-loose font-medium tracking-wider sm:text-2xl"
      >
        {lead}
      </p>
      <p className="mt-12 leading-loose text-ink-sub">{profile.statement}</p>
      <ul className="mt-10 space-y-4 border-t border-ink/15 pt-8 text-sm leading-relaxed">
        <li>
          <span className="block text-xs tracking-widest text-ink-muted">
            名前
          </span>
          {profile.nameJa}（{profile.nameKana} / {profile.nameEn}）
        </li>
        <li>
          <span className="block text-xs tracking-widest text-ink-muted">
            呼び名
          </span>
          {profile.nickname}（{profile.handle}）
        </li>
        {profile.affiliations.map((a) => (
          <li key={a.ja}>
            <span className="block text-xs tracking-widest text-ink-muted">
              所属
            </span>
            {a.ja}
            <span className="block text-xs text-ink-muted">
              {withoutPending(a.en)}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
