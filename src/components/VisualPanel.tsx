import type { Profile } from '../content/types.ts'

type Props = { profile: Profile }

// PC では右半分に固定、スマホではページ先頭に置くビジュアル面
export function VisualPanel({ profile }: Props) {
  const lines = profile.catchcopy.split('、')
  return (
    <aside
      data-visual
      className="relative flex min-h-[88svh] items-center justify-center overflow-hidden bg-orange lg:fixed lg:top-0 lg:right-0 lg:h-svh lg:min-h-0 lg:w-1/2"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(255,247,236,0.55),transparent)]"
      />
      <p className="vertical absolute top-8 right-6 text-sm font-medium text-ink sm:right-10 sm:text-base">
        {lines.map((line, i) => (
          <span key={line} className="block">
            {line}
            {i < lines.length - 1 && '、'}
          </span>
        ))}
      </p>
      <img
        src={profile.avatar.src}
        alt={profile.avatar.alt}
        width={460}
        height={460}
        className="relative size-52 rounded-full border-4 border-cream shadow-[0_20px_60px_-20px_rgba(59,36,22,0.45)] sm:size-72"
      />
      <div className="absolute bottom-8 left-6 text-ink sm:left-10 lg:hidden">
        <p className="font-display text-4xl font-medium tracking-wide">
          {profile.nameEn}
        </p>
        <p className="mt-1 text-xs tracking-[0.3em]">
          {profile.nameJa} ・ {profile.nickname}
        </p>
      </div>
    </aside>
  )
}
