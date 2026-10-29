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

      <div className="mt-8 rounded-2xl bg-orange px-6 py-5 text-ink">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar.src}
            alt={profile.avatar.alt}
            width={88}
            height={88}
            className="size-16 shrink-0 rounded-full border-2 border-cream sm:size-22"
          />
          <p className="text-xl font-bold">{profile.nameJa}</p>
        </div>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed marker:text-ink/60">
          <li>
            {profile.nameKana} / {profile.nameEn}
          </li>
          <li>
            {profile.nickname}（{profile.handle}）
          </li>
          {profile.affiliations.map((a) => (
            <li key={a.ja}>
              {a.ja}
              <span className="mt-0.5 block text-xs leading-relaxed">
                {withoutPending(a.en)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
