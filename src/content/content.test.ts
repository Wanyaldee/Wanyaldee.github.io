import { describe, expect, it } from 'vite-plus/test'
import { content } from './index.ts'
import { findPendingContent, PENDING, withoutPending } from './pending.ts'
import type { Case, Content, Link } from './types.ts'

const NEDO_PDF =
  'https://qc-challenge.nedo.go.jp/season_2/docs/list_of_screened_applicants_20260831.pdf'
const NEDO_PROGRAM = 'NEDO懸賞金活用型プログラム'

function allLinks(c: Content): Link[] {
  const caseLinks = c.cases.flatMap((x) => x.links)
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

  it('NEDO はプログラム名・チーム名・課題名・役割・経緯・リンク以外を持たない', () => {
    const nedo = findCase('nedo')
    expect(Object.keys(nedo).sort()).toEqual([
      'history',
      'id',
      'kind',
      'links',
      'number',
      'program',
      'role',
      'team',
      'theme',
    ])
    if (nedo.kind !== 'nedo') throw new Error('nedo expected')
    expect(nedo.links.map((l) => l.href)).toEqual([
      NEDO_PDF,
      'https://qc-challenge.nedo.go.jp/season_2/',
      'https://qc-challenge.nedo.go.jp/season_1/',
    ])
  })

  it('NEDO は「NEDO懸賞金活用型プログラム」の Season 2 と書く', () => {
    const nedo = findCase('nedo')
    if (nedo.kind !== 'nedo') throw new Error('nedo expected')
    expect(nedo.program).toBe(`${NEDO_PROGRAM} Season 2`)
  })

  it('Season 1 で受賞しなかったことと、Season 2 につながったことを書く', () => {
    const nedo = findCase('nedo')
    if (nedo.kind !== 'nedo') throw new Error('nedo expected')
    expect(nedo.history).toContain('Season 1')
    expect(nedo.history).toContain('受賞はしませんでした')
    expect(nedo.history).toContain('Season 2 につながり')
  })

  it('NEDO に触れる文では正式な名称を使う', () => {
    const texts = [
      content.profile.statement,
      ...content.values.map((v) => v.body),
    ]
    for (const text of texts.filter((t) => t.includes('NEDO'))) {
      expect(text).toContain(NEDO_PROGRAM)
    }
    expect(JSON.stringify(content)).not.toMatch(
      /NEDOプロジェクト|懸賞金チャレンジ/,
    )
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
      repositories: [],
      site: {},
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
      repositories: [],
      site: {},
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
        : [x.history],
    )
    const repositories = c.repositories.flatMap((r) => [
      r.overview,
      r.why,
      r.thought,
      r.now,
    ])
    return (
      [
        c.profile.statement,
        ...c.values.map((v) => v.body),
        ...timeline,
        ...c.skills.flatMap((s) => s.items.map((i) => i.principle)),
        c.vision.lead,
        ...c.vision.body,
        ...repositories,
      ]
        // 未確定の印（__PENDING__）は文末の判定から外す
        .map(withoutPending)
        .filter((s) => s !== '')
    )
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

describe('license', () => {
  it('コードは MIT で、LICENSE ファイルへリンクする', () => {
    expect(content.site.license.licenseHref).toBe(
      'https://github.com/Wanyaldee/Wanyaldee.github.io/blob/main/LICENSE',
    )
    expect(content.site.license.code).toContain('MIT')
  })

  it('文章とイラストは対象外であることを書く', () => {
    expect(content.site.license.excluded).toContain('文章')
    expect(content.site.license.excluded).toContain('イラスト')
  })
})
