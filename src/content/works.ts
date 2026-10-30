import type { Work } from './types.ts'

// リポジトリ一覧の下に置く、リポジトリを公開していない成果物。
// リポジトリは非公開なので GitHub へはリンクしない（repositories.test.ts で検証）
export const works: Work[] = [
  {
    id: 'offevent-lp',
    name: '淡路帝国オフイベント 告知LP',
    overview:
      'ゆっくり実況者の社畜天狗さんが主催する、着席160〜200名規模のオフイベント（2027年3月6日、ラピスホール神戸）の告知ページです。公開して運用しています。',
    page: { label: 'イベントLP', href: 'https://event.awajiempire.net/' },
    relatedCase: 'offevent-lp',
    relatedLinks: [
      {
        label: '社畜天狗さんの YouTube チャンネル',
        href: 'https://www.youtube.com/@Shachiku_Tengu',
      },
    ],
  },
]
