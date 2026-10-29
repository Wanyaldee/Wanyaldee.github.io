import { withoutPending } from '../content/pending.ts'
import type { SkillCategory } from '../content/types.ts'
import { Section } from './Section.tsx'

type Props = { skills: SkillCategory[] }

export function Skills({ skills }: Props) {
  return (
    <Section id="skills" label="SKILLS & PRINCIPLES" title="技術と、その扱い方">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((category) => (
          <div
            key={category.name}
            className="panel p-5 transition-colors hover:border-orange"
          >
            <h3 className="font-bold">{category.name}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {category.items
                .filter((i) => withoutPending(i.tech) !== '')
                .map((i) => (
                  <li key={i.tech}>
                    <span className="font-bold text-orange-text">{i.tech}</span>
                    <span className="text-ink-sub"> — {i.principle}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
