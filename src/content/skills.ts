import type { SkillCategory } from './types.ts'

// 根拠は公開リポジトリ（citadel, Easy-Archive, Awaji-Empire-Agent, blueqat-mcp-playground,
// quantum-visualizer, wanyaldee-skills）。2026-10-30 にユーザー確認済み
export const skills: SkillCategory[] = [
  {
    name: '低レイヤ・ネットワーク',
    items: [
      {
        tech: 'Rust',
        principle:
          '安全性をコンパイル時に保証できるところでは、実行時の注意に頼りません。',
      },
      {
        tech: 'DNS / レジストラ',
        principle: 'ドメインは、止まると全部止まる単一障害点として扱います。',
      },
      {
        tech: 'AVR / Arduino',
        principle: 'ハードウェアの制約から逆算して考えます。',
      },
    ],
  },
  {
    name: 'コンテナ・運用基盤',
    items: [
      {
        tech: 'Docker Compose',
        principle:
          '本番と同じ構成を手元で再現できることを運用の前提にしています。',
      },
      {
        tech: 'Linux サーバー運用',
        principle:
          'カーネル更新などは先送りせず、手順を ADR に残してから当てます。',
      },
    ],
  },
  {
    name: 'チーム開発・自動化',
    items: [
      {
        tech: 'GitHub Actions',
        principle:
          'CI とデプロイを自動化し、Action は SHA で固定して Dependabot で更新します。',
      },
      {
        tech: 'ADR',
        principle:
          '決めた理由を残し、後から来た人が同じ判断をできるようにします。',
      },
      {
        tech: 'Python / TypeScript',
        principle: 'Discord Bot と Web の両方を書きます。',
      },
    ],
  },
  {
    name: '生成AI・量子',
    items: [
      {
        tech: 'blueqat（QAOA / VQE）',
        principle:
          '量子回路を実際に動かし、「技術のデモ」と「量子の優位性」を区別します。',
      },
      {
        tech: '可視化',
        principle: '量子計算のふるまいを目で見える形にします。',
      },
      {
        tech: 'Claude Code',
        principle:
          'AI に任せる仕事の手順と判断基準を Skill として書き残します。',
      },
    ],
  },
]
