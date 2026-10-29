import { withoutPending } from '../content/pending.ts'
import type { Link, Vision as VisionContent } from '../content/types.ts'
import { ContactList } from './ContactList.tsx'
import { Section } from './Section.tsx'

type Props = { vision: VisionContent; contacts: Link[] }

export function Vision({ vision, contacts }: Props) {
  const body = vision.body.map(withoutPending).filter((s) => s !== '')
  return (
    <Section id="contact" label="CAREER VISION" title="これから">
      <p className="text-xl leading-snug font-bold sm:text-2xl">
        {vision.lead}
      </p>
      {body.map((p) => (
        <p key={p} className="mt-4 leading-loose text-ink-sub">
          {p}
        </p>
      ))}
      <div className="panel mt-8 p-5">
        <p className="mb-3 text-xs font-bold tracking-[0.15em] text-orange-text">
          CONTACT
        </p>
        <ContactList contacts={contacts} />
      </div>
    </Section>
  )
}
