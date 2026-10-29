const ITEMS = [
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'cases', label: 'Cases' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

type Props = { handle: string }

export function Nav({ handle }: Props) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
      <a href="#hero" className="font-bold text-orange-text">
        <span aria-hidden="true">● </span>
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
    </nav>
  )
}
