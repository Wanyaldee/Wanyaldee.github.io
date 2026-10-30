import { describe, expect, it } from 'vite-plus/test'
import repositoriesHtml from '../../repositories/index.html?raw'
import { content } from './index.ts'
import { findPendingContent, PENDING, withoutPending } from './pending.ts'
import { repositoryUrl } from './repositories.ts'

function findRepository(id: string) {
  const found = content.repositories.find((r) => r.id === id)
  if (!found) throw new Error(`repository ${id} not found`)
  return found
}

describe('repositories', () => {
  it('載せるのは条件を満たす7件で、新しく始めた順', () => {
    expect(content.repositories.map((r) => r.id)).toEqual([
      'Wanyaldee/Wanyaldee.github.io',
      'Wanyaldee/quantum-visualizer',
      'Wanyaldee/blueqat-mcp-playground',
      'Wanyaldee/Easy-Archive',
      'Wanyaldee/citadel',
      'Wanyaldee/wanyaldee-skills',
      'Awaji-Empire-Technical-Department/Awaji-Empire-Agent',
    ])
    const dates = content.repositories.map((r) => r.startedOn)
    expect(dates).toEqual([...dates].sort().reverse())
    for (const date of dates) expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('citadel だけが Zed のフォークで、ライセンスは Apache-2.0 / GPL-3.0。ほかは MIT', () => {
    const citadel = findRepository('Wanyaldee/citadel')
    expect(citadel.license).toBe('Apache-2.0 / GPL-3.0')
    expect(citadel.forkOf?.href).toBe('https://github.com/zed-industries/zed')
    const others = content.repositories.filter((r) => r !== citadel)
    for (const repo of others) {
      expect(repo.license).toBe('MIT')
      expect(repo.forkOf).toBeUndefined()
    }
  })

  it('Awaji-Empire-Agent はトップの CASE 01（awaji-agent）を指す', () => {
    const agent = findRepository(
      'Awaji-Empire-Technical-Department/Awaji-Empire-Agent',
    )
    expect(agent.relatedCase).toBe('awaji-agent')
    expect(content.cases.map((c) => c.id)).toContain(agent.relatedCase)
  })

  it('リンク先は https://github.com/<id>', () => {
    expect(repositoryUrl(findRepository('Wanyaldee/Easy-Archive'))).toBe(
      'https://github.com/Wanyaldee/Easy-Archive',
    )
  })

  it('「いま」には、すぐ古くなる最終更新日やバージョン番号を書かない', () => {
    for (const repo of content.repositories) {
      expect(repo.now).not.toMatch(/最終更新|v\d+\.\d+/)
    }
  })

  it('盛った言い回しを使わない', () => {
    const text = JSON.stringify(content.repositories)
    for (const word of [
      '次世代',
      '革新',
      '画期的',
      '圧倒的',
      '最強',
      '爆速',
      '世界初',
    ]) {
      expect(text).not.toContain(word)
    }
  })

  it('PENDING を含む一覧の文言は公開前ゲートで見つかる', () => {
    const sample = {
      ...content,
      repositories: [{ ...content.repositories[0], why: PENDING }],
    }
    expect(findPendingContent(sample)).toContain('repositories[0].why')
  })
})

describe('repositories の事実関係', () => {
  it('blueqat-mcp-playground は実機にジョブを投げていないので、実機を試したとは書かない', () => {
    const repo = findRepository('Wanyaldee/blueqat-mcp-playground')
    expect(repo.overview).not.toMatch(/実機 ?QPU を試した/)
    expect(repo.overview).toContain('ジョブは投げず')
  })

  it('citadel の「いま」は、ビルド・書き込みと境界チェックの試作まで作ったことを書く', () => {
    const now = findRepository('Wanyaldee/citadel').now
    for (const part of [
      'ビルド',
      '書き込み',
      '境界チェック',
      'シリアルモニター',
    ]) {
      expect(now).toContain(part)
    }
  })
})

describe('公開ページ', () => {
  it('quantum-visualizer は公開ページへ直接リンクする', () => {
    const repo = findRepository('Wanyaldee/quantum-visualizer')
    expect(repo.page?.href).toBe(
      'https://wanyaldee.github.io/quantum-visualizer/',
    )
  })
})

describe('一覧ページの HTML の head', () => {
  // HTML は公開前ゲートの外にあるので、content の文言と食い違わないことをここで確かめる。
  // 整形で属性が改行されても比べられるよう、空白をならしてから見る
  const html = repositoriesHtml.replace(/\s+/g, ' ')
  const text = content.site.repositoriesPage

  it('<title> と og:title に見出しが入る', () => {
    const title = withoutPending(text.title)
    expect(html).toContain(`<title>${title} |`)
    expect(html).toContain(`property="og:title" content="${title} |`)
  })

  it('description と og:description は、ページ冒頭の一文と同じ', () => {
    const lead = withoutPending(text.lead)
    expect(html).toContain(`name="description" content="${lead}"`)
    expect(html).toContain(`property="og:description" content="${lead}"`)
  })
})
