import { withoutPending } from '../content/pending.ts'
import { REPOSITORIES_PATH } from '../content/site.ts'
import type { Profile } from '../content/types.ts'
import { ContactList } from './ContactList.tsx'

const SECTIONS = [
  { href: '#about', label: 'わたしについて' },
  { href: '#cases', label: '実績' },
  { href: '#skills', label: '技術' },
  { href: '#contact', label: 'これから' },
] as const

type Props = { profile: Profile; repositoriesLabel: string }

function Catchcopy({ text, emphasis }: { text: string; emphasis: string }) {
  const head = text.endsWith(emphasis) ? text.slice(0, -emphasis.length) : text
  return (
    <h1 className="text-lg leading-loose font-medium tracking-widest sm:text-xl">
      {head}
      {head !== text && (
        <span className="inline-block text-orange-text">{emphasis}</span>
      )}
    </h1>
  )
}

export function Hero({ profile, repositoriesLabel }: Props) {
  const nav = [
    ...SECTIONS,
    { href: REPOSITORIES_PATH, label: withoutPending(repositoriesLabel) },
  ]
  return (
    <header id="hero" className="flex min-h-svh flex-col pt-8">
      <nav className="flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-orange-text">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.contacts[0].href}
          className="rounded-full border border-ink px-5 py-2 transition-colors hover:border-orange-text hover:text-orange-text"
        >
          メールする
        </a>
      </nav>

      <div className="my-auto py-20">
        <p className="text-xs tracking-[0.3em] text-orange-text">
          {profile.eyebrow}
        </p>
        <p className="mt-4 font-display text-6xl leading-none font-medium tracking-wide sm:text-7xl">
          {profile.nameEn}
        </p>
        <p className="mt-3 text-sm tracking-[0.3em] text-ink-sub">
          {profile.nameJa} ・ {profile.nickname}（{profile.handle}）
        </p>
        <div className="mt-12">
          <Catchcopy
            text={profile.catchcopy}
            emphasis={profile.catchcopyEmphasis}
          />
        </div>
        <div className="mt-10">
          <ContactList contacts={profile.contacts} />
        </div>
      </div>
    </header>
  )
}
