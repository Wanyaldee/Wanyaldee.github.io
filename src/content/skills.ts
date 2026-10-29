import { PENDING } from './pending.ts'
import type { SkillCategory } from './types.ts'

// 中身は公開リポジトリを根拠に下書きし、ユーザー確認後に確定する（Task 7）
export const skills: SkillCategory[] = [
  {
    name: '低レイヤ・ネットワーク',
    items: [{ tech: PENDING, principle: PENDING }],
  },
  {
    name: 'コンテナ・運用基盤',
    items: [{ tech: PENDING, principle: PENDING }],
  },
  {
    name: 'チーム開発・自動化',
    items: [{ tech: PENDING, principle: PENDING }],
  },
  { name: '生成AI・量子', items: [{ tech: PENDING, principle: PENDING }] },
]
