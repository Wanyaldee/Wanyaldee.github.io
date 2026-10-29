import type { ReactNode } from 'react'
import type { Link } from '../content/types.ts'

type Props = { link: Link; className?: string; children?: ReactNode }

// https:// は新しいタブ（rel で opener を切る）、mailto: は同じタブで開く
export function ExternalLink({ link, className, children }: Props) {
  const isWeb = link.href.startsWith('https://')
  return (
    <a
      href={link.href}
      className={className}
      {...(isWeb ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children ?? link.label}
    </a>
  )
}
