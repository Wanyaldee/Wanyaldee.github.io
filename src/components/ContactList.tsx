import type { Link } from '../content/types.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { contacts: Link[] }

export function ContactList({ contacts }: Props) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
      {contacts.map((link) => (
        <li key={link.href}>
          <ExternalLink
            link={link}
            className="text-orange-text underline-offset-4 hover:underline"
          />
        </li>
      ))}
    </ul>
  )
}
