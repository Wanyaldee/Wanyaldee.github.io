import { withoutPending } from '../content/pending.ts'
import type { SkillCategory } from '../content/types.ts'
import { Section } from './Section.tsx'

type Props = { skills: SkillCategory[] }

export function Skills({ skills }: Props) {
  return (
    <Section id="skills" label="Skills" title="技術と、その扱い方">
      <div className="space-y-14">
        {skills.map((category) => (
          <div key={category.name}>
            <h3 className="border-b border-ink/15 pb-3 text-sm font-bold tracking-[0.2em]">
              {category.name}
            </h3>
            <dl className="mt-5 space-y-5 text-sm">
              {category.items
                .filter((i) => withoutPending(i.tech) !== '')
                .map((i) => (
                  <div key={i.tech}>
                    <dt className="font-medium text-orange-text">{i.tech}</dt>
                    <dd className="mt-1 leading-loose text-ink-sub">
                      {i.principle}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  )
}
