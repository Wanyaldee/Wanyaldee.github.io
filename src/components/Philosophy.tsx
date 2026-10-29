import type { Value } from '../content/types.ts'
import { Section } from './Section.tsx'

type Props = { values: Value[] }

export function Philosophy({ values }: Props) {
  return (
    <Section id="philosophy" label="Philosophy" title="思考の骨子">
      <ol className="space-y-12">
        {values.map((v, i) => (
          <li key={v.key} className="grid grid-cols-[3rem_1fr] gap-x-2">
            <span className="font-display text-3xl text-orange-text">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-lg font-bold tracking-widest">{v.titleJa}</h3>
              <p className="mt-1 font-display text-base text-ink-muted italic">
                {v.titleEn}
              </p>
              <p className="mt-4 text-sm leading-loose text-ink-sub">
                {v.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
