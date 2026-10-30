import { withoutPending } from '../content/pending.ts'
import type { Profile, SiteText } from '../content/types.ts'
import { ExternalLink } from './ExternalLink.tsx'

type Props = { profile: Profile; license: SiteText['license'] }

// トップと一覧ページで共通のフッター。絵のクレジットとライセンスの適用範囲を出す
export function SiteFooter({ profile, license }: Props) {
  return (
    <footer className="space-y-2 border-t border-ink/15 py-10 text-xs tracking-widest text-ink-muted">
      <p>
        <ExternalLink
          link={profile.avatar.credit}
          className="underline-offset-4 hover:underline"
        />
      </p>
      <p className="leading-relaxed">
        {withoutPending(license.code)}
        {withoutPending(license.excluded)}{' '}
        <ExternalLink
          link={{ label: 'LICENSE', href: license.licenseHref }}
          className="underline underline-offset-4 hover:text-orange-text"
        />
      </p>
      <p className="font-display text-sm">
        © {profile.nameEn} ({profile.handle})
      </p>
    </footer>
  )
}
