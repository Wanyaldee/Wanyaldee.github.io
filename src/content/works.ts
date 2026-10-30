import type { Work } from './types.ts'

// リポジトリ一覧の下に置く、リポジトリを公開していない成果物。
// リポジトリは非公開なので GitHub へはリンクしない（repositories.test.ts で検証）
export const works: Work[] = [
  {
    id: 'offevent-lp',
    name: '淡路帝国オフイベント 告知LP',
    overview:
      '着席160〜200名規模のオフイベント（2027年3月6日、ラピスホール神戸）の告知ページです。公開して運用しています。',
    page: { label: 'イベントLP', href: 'https://event.awajiempire.net/' },
    relatedCase: 'offevent-lp',
  },
]
