import type { Value } from '../content/types.ts'
import { Section } from './Section.tsx'

type Props = { values: Value[] }

export function Philosophy({ values }: Props) {
  return (
    <Section id="philosophy" label="PHILOSOPHY" title="思考の骨子">
      <ol className="grid gap-4 sm:grid-cols-3">
        {values.map((v) => (
          <li key={v.key} className="rounded-2xl bg-card p-5 shadow-sm">
            <p className="text-sm font-bold text-orange-text">{v.titleEn}</p>
            <h3 className="mt-1 font-bold">{v.titleJa}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-sub">
              {v.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
