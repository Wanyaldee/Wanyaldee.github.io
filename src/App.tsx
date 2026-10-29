import { Hero } from './components/Hero.tsx'
import { content } from './content/index.ts'

export default function App() {
  return (
    <div className="mx-auto max-w-3xl px-5">
      <Hero profile={content.profile} />
      <main />
    </div>
  )
}
