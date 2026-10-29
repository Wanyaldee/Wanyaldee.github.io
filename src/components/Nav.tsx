import type { Avatar, Link } from '../content/types.ts'
import { ContactList } from './ContactList.tsx'

const ITEMS = [
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'cases', label: 'Cases' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

type Props = { handle: string; avatar: Avatar; contacts: Link[] }

export function Nav({ handle, avatar, contacts }: Props) {
  return (
    <nav className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
        <a
          href="#hero"
          className="flex items-center gap-2 font-bold text-orange-text"
        >
          <img
            src={avatar.src}
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full"
          />
          {handle}
        </a>
        <ul className="flex gap-3">
          {ITEMS.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ContactList contacts={contacts} />
    </nav>
  )
}
