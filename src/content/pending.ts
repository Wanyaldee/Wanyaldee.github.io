// 未確定の文言の目印。これが残っている間は公開しない（publishable.test.ts）
export const PENDING = '__PENDING__'

export function isPending(value: string): boolean {
  return value.includes(PENDING)
}

function walk(value: unknown, path: string): string[] {
  if (typeof value === 'string') return isPending(value) ? [path] : []
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => walk(item, `${path}[${i}]`))
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, v]) =>
      walk(v, path ? `${path}.${key}` : key),
    )
  }
  return []
}

export function findPendingContent(content: object): string[] {
  return walk(content, '')
}
