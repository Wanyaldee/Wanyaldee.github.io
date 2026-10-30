import { withoutPending } from '../content/pending.ts'
import type { Vision as VisionContent } from '../content/types.ts'
import { Section } from './Section.tsx'

type Props = { vision: VisionContent }

export function Vision({ vision }: Props) {
  const body = vision.body.map(withoutPending).filter((s) => s !== '')
  return (
    <Section id="contact" label="Vision" title="これから">
      {body.map((p) => (
        <p key={p} className="mt-6 leading-loose text-ink-sub first:mt-0">
          {p}
        </p>
      ))}
      <div className="mt-12">
        <a href="#hero" className="arrow-link">
          <span>連絡先はページ上部へ</span>
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </Section>
  )
}
