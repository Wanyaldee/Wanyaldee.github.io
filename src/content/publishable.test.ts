import { expect, it } from 'vite-plus/test'
import { content } from './index.ts'
import { findPendingContent } from './pending.ts'

// 公開前ゲート。未確定の文言が残っていれば落ちる（deploy ジョブで実行）
it('未確定の文言（PENDING）が残っていない', () => {
  expect(findPendingContent(content)).toEqual([])
})
