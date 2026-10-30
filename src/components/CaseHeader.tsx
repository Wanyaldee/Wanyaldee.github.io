type Props = { number: string; role: string; title: string }

export function CaseHeader({ number, role, title }: Props) {
  return (
    <header>
      <p className="font-display text-xl text-orange-text">Case {number}</p>
      <h3 className="mt-2 text-xl leading-relaxed font-bold tracking-wider">
        {title}
      </h3>
      <p className="mt-2 text-xs tracking-widest text-ink-muted">{role}</p>
    </header>
  )
}
