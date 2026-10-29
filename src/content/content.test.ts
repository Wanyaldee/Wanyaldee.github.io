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
  return [...c.profile.contacts, ...caseLinks]
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
