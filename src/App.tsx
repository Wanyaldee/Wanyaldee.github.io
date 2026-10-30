import { About } from './components/About.tsx'
import { Cases } from './components/Cases.tsx'
import { ExternalLink } from './components/ExternalLink.tsx'
import { Hero } from './components/Hero.tsx'
import { Philosophy } from './components/Philosophy.tsx'
import { Skills } from './components/Skills.tsx'
import { Vision } from './components/Vision.tsx'
import { VisualPanel } from './components/VisualPanel.tsx'
import { content } from './content/index.ts'

export default function App() {
  const { profile, values, cases, skills, vision, site } = content
  return (
    <>
      <VisualPanel profile={profile} />
      <div className="lg:w-1/2">
        <div className="mx-auto max-w-xl px-6 sm:px-10">
          <Hero profile={profile} repositoriesLabel={site.navLabel} />
          <main>
            <About profile={profile} lead={vision.lead} />
            <Philosophy values={values} />
            <Cases cases={cases} repositoriesLinkLabel={site.casesLinkLabel} />
            <Skills skills={skills} />
            <Vision vision={vision} />
          </main>
          <footer className="space-y-2 border-t border-ink/15 py-10 text-xs tracking-widest text-ink-muted">
            <p>
              <ExternalLink
                link={profile.avatar.credit}
                className="underline-offset-4 hover:underline"
              />
            </p>
            <p className="font-display text-sm">
              © {profile.nameEn} ({profile.handle})
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
