import type { Link } from '../content/types.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { contacts: Link[] }

const MAILTO = 'mailto:'

// メールはメールソフトがなくても読めてコピーできるよう、アドレスも表示する
export function ContactList({ contacts }: Props) {
  return (
    <ul className="space-y-2 text-sm">
      {contacts.map((link) => (
        <li key={link.href} className="flex gap-3 [overflow-wrap:anywhere]">
          <span className="w-24 shrink-0 text-xs tracking-widest text-ink-muted">
            {link.label}
          </span>
          <ExternalLink
            link={link}
            className="underline-offset-4 hover:text-orange-text hover:underline"
          >
            {link.href.startsWith(MAILTO)
              ? link.href.slice(MAILTO.length)
              : link.href.replace('https://', '')}
          </ExternalLink>
        </li>
      ))}
    </ul>
  )
}
