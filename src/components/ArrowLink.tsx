import type { Link } from '../content/types.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { link: Link }

export function ArrowLink({ link }: Props) {
  return (
    <ExternalLink link={link} className="arrow-link">
      <span>{link.label}</span>
      <span aria-hidden="true">→</span>
    </ExternalLink>
  )
}
