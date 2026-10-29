import { describe, expect, it } from 'vite-plus/test'
import { content } from './index.ts'
import { findPendingContent, PENDING, withoutPending } from './pending.ts'
import type { Case, Content, Link } from './types.ts'

const NEDO_PDF =
  'https://qc-challenge.nedo.go.jp/season_2/docs/list_of_screened_applicants_20260831.pdf'

function allLinks(c: Content): Link[] {
  const caseLinks = c.cases.flatMap((x) =>
    x.kind === 'timeline' ? x.links : [x.link],
  )
  return [...c.profile.contacts, c.profile.avatar.credit, ...caseLinks]
}

function findCase(id: string): Case {
  const found = content.cases.find((c) => c.id === id)
  if (!found) throw new Error(`case ${id} not found`)
  return found
}

describe('profile', () => {
  it('連絡先は仕様の5つと一致する', () => {
    expect(content.profile.contacts.map((l) => l.href)).toEqual([
      'mailto:gooya.3322@gmail.com',
      'mailto:k-okada@jqca.org',
      'https://github.com/Wanyaldee',
      'https://x.com/Gooya3322',
      'https://www.instagram.com/gooya3322',
    ])
  })
})

describe('avatar', () => {
  it('アイコンは ᴸⁱʸ さんの作品としてクレジットされる', () => {
    expect(content.profile.avatar.src).toBe('/avatar_all.jpg')
    expect(content.profile.avatar.credit.href).toBe('https://x.com/zZ5lALiyp')
    expect(content.profile.avatar.credit.label).toContain('ᴸⁱʸ')
  })
})

describe('links', () => {
  it('すべてのリンクは https:// か mailto:', () => {
    for (const link of allLinks(content)) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:)/)
    }
  })
})

describe('cases', () => {
  it('並び順は Awaji → オフイベントLP → NEDO', () => {
    expect(content.cases.map((c) => c.id)).toEqual([
      'awaji-agent',
      'offevent-lp',
      'nedo',
    ])
  })

  it('NEDO はチーム名・課題名・役割・PDFリンク以外を持たない', () => {
    const nedo = findCase('nedo')
    expect(Object.keys(nedo).sort()).toEqual([
      'id',
      'kind',
      'link',
      'number',
      'role',
      'team',
      'theme',
    ])
    expect(nedo.kind === 'nedo' && nedo.link.href).toBe(NEDO_PDF)
  })

  it('CASE 01 は承認済みの3コミットへリンクする', () => {
    const agent = findCase('awaji-agent')
    if (agent.kind !== 'timeline') throw new Error('timeline expected')
    const repo =
      'https://github.com/Awaji-Empire-Technical-Department/Awaji-Empire-Agent'
    expect(agent.links.map((l) => l.href)).toEqual([
      repo,
      `${repo}/commit/e94bb1e`,
      `${repo}/commit/b6a966d`,
      `${repo}/commit/df9fff7`,
    ])
  })

  it('オフイベントLPは非公開リポジトリへリンクせず、公開LPへリンクする', () => {
    const lp = findCase('offevent-lp')
    if (lp.kind !== 'timeline') throw new Error('timeline expected')
    const hrefs = lp.links.map((l) => l.href)
    expect(hrefs.some((h) => h.includes('github.com'))).toBe(false)
    expect(hrefs).toContain('https://event.awajiempire.net/')
  })
})

describe('values', () => {
  it('3つの軸がこの順で並ぶ', () => {
    expect(content.values.map((v) => v.key)).toEqual([
      'principled',
      'north-star',
      'mutual',
    ])
  })
})

describe('findPendingContent', () => {
  it('PENDING を含む文字列のパスを返す', () => {
    const sample = {
      ...content,
      profile: { ...content.profile, affiliations: [] },
      cases: [],
      skills: [{ name: 'x', items: [{ tech: 'a', principle: PENDING }] }],
      vision: { lead: 'ok', body: [PENDING] },
    }
    expect(findPendingContent(sample)).toEqual([
      'skills[0].items[0].principle',
      'vision.body[0]',
    ])
  })

  it('PENDING がなければ空配列', () => {
    const sample = {
      ...content,
      profile: { ...content.profile, affiliations: [] },
      cases: [],
      skills: [],
      vision: { lead: 'ok', body: ['ok'] },
    }
    expect(findPendingContent(sample)).toEqual([])
  })
})

describe('withoutPending', () => {
  it('PENDING とその直前の区切りを取り除く', () => {
    expect(withoutPending(`Kagawa College, ${PENDING}`)).toBe('Kagawa College')
  })

  it('全体が PENDING なら空文字', () => {
    expect(withoutPending(PENDING)).toBe('')
  })

  it('PENDING を含まなければそのまま', () => {
    expect(withoutPending('岡田 昊也')).toBe('岡田 昊也')
  })
})

describe('表記', () => {
  it('「北極星」という比喩を使わない', () => {
    expect(JSON.stringify(content)).not.toContain('北極星')
    expect(JSON.stringify(content)).not.toContain('North Star')
  })
})

describe('文体', () => {
  // 文章（名詞句ではないもの）はすべて です・ます 調で書く
  function prose(c: Content): string[] {
    const timeline = c.cases.flatMap((x) =>
      x.kind === 'timeline'
        ? [x.background, x.decision, x.reflection, x.result, x.bridge ?? '']
        : [],
    )
    return [
      c.profile.statement,
      ...c.values.map((v) => v.body),
      ...timeline,
      ...c.skills.flatMap((s) => s.items.map((i) => i.principle)),
      c.vision.lead,
      ...c.vision.body,
    ].filter((s) => s !== '')
  }

  it('すべての文が丁寧語で終わる', () => {
    const sentences = prose(content)
      .flatMap((p) => p.split('。'))
      .map((s) => s.trim())
      .filter((s) => s !== '')
    const plain = sentences.filter(
      (s) => !/(です|ます|ました|ません|でした|ましょう)」?$/.test(s),
    )
    expect(plain).toEqual([])
  })
})

describe('vision', () => {
  it('「ありがとう」の思いを主役にし、狙いすぎた一文は使わない', () => {
    expect(content.vision.lead).toBe(
      '技術の根っこにあるのは、ありがとうと言ってもらえたうれしさです。',
    )
    expect(JSON.stringify(content)).not.toContain(
      '「やりたいこと」を「できる」',
    )
  })
})
