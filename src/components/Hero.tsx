import type { Profile } from '../content/types.ts'
import { ContactList } from './ContactList.tsx'

type Props = { profile: Profile }

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

export function Hero({ profile }: Props) {
  return (
    <header id="hero" className="flex min-h-svh flex-col pt-8 lg:pt-14">
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
        <div id="top-contacts" className="mt-10 scroll-mt-24">
          <ContactList contacts={profile.contacts} />
        </div>
      </div>
    </header>
  )
}
