import { describe, expect, it } from 'vite-plus/test'
import { content } from './index.ts'
import { findPendingContent, PENDING } from './pending.ts'
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
