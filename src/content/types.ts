// href は https:// か mailto: のみ（content.test.ts で検証）
export type Link = { label: string; href: string }

export type Affiliation = { ja: string; en: string }

export type Profile = {
  nameJa: string
  nameKana: string
  nameEn: string
  nickname: string
  handle: string
  eyebrow: string
  catchcopy: string
  /** catchcopy のうち橙で強調する部分（catchcopy の末尾に含まれること） */
  catchcopyEmphasis: string
  statement: string
  /** 原体験の一文。Vision の lead 直前に置く */
  origin: string
  affiliations: Affiliation[]
  contacts: Link[]
}

export type Value = {
  key: string
  titleEn: string
  titleJa: string
  body: string
}

export type TimelineCase = {
  kind: 'timeline'
  id: string
  number: string
  role: string
  title: string
  background: string
  decision: string
  reflection: string
  result: string
  /** 他の Case とのつながりを示す一文 */
  bridge?: string
  links: Link[]
}

// NEDO は公開範囲がチーム名・課題名・役割・リンクに限られるため、型でもそれ以外を持たせない
export type NedoCase = {
  kind: 'nedo'
  id: string
  number: string
  team: string
  theme: string
  role: string
  link: Link
}

export type Case = TimelineCase | NedoCase

export type SkillCategory = {
  name: string
  items: { tech: string; principle: string }[]
}

export type Vision = { lead: string; body: string[] }

export type Content = {
  profile: Profile
  values: Value[]
  cases: Case[]
  skills: SkillCategory[]
  vision: Vision
}
