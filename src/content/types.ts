// href は https:// か mailto: のみ（content.test.ts で検証）
export type Link = { label: string; href: string }

export type Affiliation = { ja: string; en: string }

export type Avatar = {
  src: string
  alt: string
  /** 作者クレジット（フッターに表示） */
  credit: Link
}

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
  avatar: Avatar
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

// NEDO は公開範囲がチーム名・課題名・役割・リンクに限られるため、型でもそれ以外を持たせない。
// history は本人の参加歴（Season 1 から Season 2 への経緯）だけを書く
export type NedoCase = {
  kind: 'nedo'
  id: string
  number: string
  program: string
  team: string
  theme: string
  role: string
  history: string
  links: Link[]
}

export type Case = TimelineCase | NedoCase

// リポジトリ一覧ページ（/repositories/）の1件。載せるのは public・OSS ライセンス付き・本人が主なコミッターのもの
export type Repository = {
  /** 'owner/name' */
  id: string
  /** GitHub のリポジトリ作成日（YYYY-MM-DD） */
  startedOn: string
  language: string
  /** 表示用（'MIT'、'Apache-2.0 / GPL-3.0' など） */
  license: string
  /** フォークなら元のリポジトリ */
  forkOf?: Link
  /** トップの Case と重なるなら、その Case の id */
  relatedCase?: string
  status: string
  overview: string
  why: string
  thought: string
  now: string
}

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
  repositories: Repository[]
  site: SiteText
}

// トップと一覧ページで使う、ページの枠まわりの文言
export type SiteText = {
  repositoriesPage: {
    label: string
    title: string
    lead: string
    back: string
    details: string
  }
}
