import type { Profile } from '../content/types.ts'
import { useScrollProgress } from '../lib/useScrollProgress.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { profile: Profile }

// PC では右半分に固定、スマホではページ先頭に置くビジュアル面。
// PC では、絵はスクロールに合わせて少しずつ上下に動き、全体が見えていく。
// それより狭い画面では、本人（GitHub のアイコンと同じ範囲）を中心に映す。
export function VisualPanel({ profile }: Props) {
  const ref = useScrollProgress<HTMLElement>()
  const lines = profile.catchcopy.split('、')
  return (
    <aside
      ref={ref}
      data-visual
      className="visual-panel relative h-[88svh] overflow-hidden bg-orange [--scroll:0.25] lg:fixed lg:top-0 lg:right-0 lg:h-svh lg:w-1/2"
    >
      <img
        src={profile.avatar.src}
        alt={profile.avatar.alt}
        width={810}
        height={1280}
        className="visual-focus absolute inset-0 size-full scale-105 object-cover lg:[object-position:50%_calc(var(--scroll)*100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-cream/80 to-transparent"
      />
      <p className="visual-catch vertical absolute top-20 right-6 lg:top-8 text-sm font-medium text-ink sm:right-10 sm:text-base">
        {lines.map((line, i) => (
          <span key={line} className="block">
            {line}
            {i < lines.length - 1 && '、'}
          </span>
        ))}
      </p>
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-cream/90 via-cream/60 to-transparent px-6 pt-24 pb-6 sm:px-10">
        <div className="lg:hidden">
          <p className="font-display text-4xl font-medium tracking-wide text-ink">
            {profile.nameEn}
          </p>
          <p className="mt-1 text-xs tracking-[0.3em] text-ink">
            {profile.nameJa} ・ {profile.nickname}
          </p>
        </div>
        <p className="mt-3 text-right text-[11px] tracking-widest text-ink-sub">
          <ExternalLink
            link={profile.avatar.credit}
            className="underline-offset-4 hover:underline"
          >
            Illustration by ᴸⁱʸ
          </ExternalLink>
        </p>
      </div>
    </aside>
  )
}
