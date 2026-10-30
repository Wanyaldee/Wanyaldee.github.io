import { About } from './components/About.tsx'
import { Cases } from './components/Cases.tsx'
import { Hero } from './components/Hero.tsx'
import { Philosophy } from './components/Philosophy.tsx'
import { SiteFooter } from './components/SiteFooter.tsx'
import { SiteNav } from './components/SiteNav.tsx'
import { Skills } from './components/Skills.tsx'
import { Vision } from './components/Vision.tsx'
import { VisualPanel } from './components/VisualPanel.tsx'
import { content } from './content/index.ts'

export default function App() {
  const { profile, values, cases, skills, vision, site } = content
  return (
    <>
      <SiteNav repositoriesLabel={site.navLabel} />
      <VisualPanel profile={profile} />
      <div className="lg:w-1/2">
        <div className="mx-auto max-w-xl px-6 sm:px-10">
          <Hero profile={profile} />
          <main>
            <About profile={profile} lead={vision.lead} />
            <Philosophy values={values} />
            <Cases cases={cases} repositoriesLinkLabel={site.casesLinkLabel} />
            <Skills skills={skills} />
            <Vision vision={vision} />
          </main>
          <SiteFooter profile={profile} license={site.license} />
        </div>
      </div>
    </>
  )
}
