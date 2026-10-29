import { withoutPending } from '../content/pending.ts'
import type { Profile } from '../content/types.ts'
import { Nav } from './Nav.tsx'

type Props = { profile: Profile }

function Catchcopy({ text, emphasis }: { text: string; emphasis: string }) {
  const head = text.endsWith(emphasis) ? text.slice(0, -emphasis.length) : text
  return (
    <h1 className="mt-2 text-2xl leading-snug font-bold sm:text-4xl">
      {head}
      {head !== text && (
        <span className="inline-block text-orange-text">{emphasis}</span>
      )}
    </h1>
  )
}

export function Hero({ profile }: Props) {
  return (
    <header id="hero" className="pt-6 pb-12">
      <Nav
        handle={profile.handle}
        avatar={profile.avatar}
        contacts={profile.contacts}
      />
      <p className="mt-14 text-xs font-bold tracking-[0.15em] text-orange-text">
        {profile.eyebrow}
      </p>
      <Catchcopy
        text={profile.catchcopy}
        emphasis={profile.catchcopyEmphasis}
      />
      <p className="mt-5 leading-loose text-ink-sub">{profile.statement}</p>

      <div className="mt-8 flex items-center gap-4 rounded-2xl bg-orange px-5 py-4 text-ink">
        <img
          src={profile.avatar.src}
          alt={profile.avatar.alt}
          width={88}
          height={88}
          className="size-16 shrink-0 rounded-full border-2 border-cream sm:size-22"
        />
        <div className="min-w-0">
          <p className="font-bold">
            {profile.nameJa}
            <span className="ml-2 text-sm font-normal">
              {profile.nameKana} / {profile.nameEn} ・ {profile.nickname}（
              {profile.handle}）
            </span>
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {profile.affiliations.map((a) => (
              <li key={a.ja}>
                {a.ja}
                <span className="block text-xs">{withoutPending(a.en)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
