import { Cases } from './components/Cases.tsx'
import { Hero } from './components/Hero.tsx'
import { Philosophy } from './components/Philosophy.tsx'
import { Skills } from './components/Skills.tsx'
import { Vision } from './components/Vision.tsx'
import { content } from './content/index.ts'

export default function App() {
  const { profile, values, cases, skills, vision } = content
  return (
    <div className="mx-auto max-w-3xl px-5 pb-16">
      <Hero profile={profile} />
      <main>
        <Philosophy values={values} />
        <Cases cases={cases} />
        <Skills skills={skills} />
        <Vision
          vision={vision}
          origin={profile.origin}
          contacts={profile.contacts}
        />
      </main>
      <footer className="pt-8 text-center text-xs text-ink-muted">
        © {profile.nameEn} ({profile.handle})
      </footer>
    </div>
  )
}
