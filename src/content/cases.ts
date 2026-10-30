import type { Case } from './types.ts'

const AWAJI_AGENT_REPO =
  'https://github.com/Awaji-Empire-Technical-Department/Awaji-Empire-Agent'

export const cases: Case[] = [
  {
    kind: 'timeline',
    id: 'awaji-agent',
    number: '01',
    role: 'プロジェクトリード / インフラ設計・運用',
    title: 'Awaji-Empire-Agent（700人規模コミュニティ基盤）',
    background:
      'ゆっくり実況者の社畜天狗さんの Discord コミュニティ「淡路帝国」が、わたしの活動の始まりです。その基盤を運用する中で、イベント直前に、外部ドメイン事業者の重大インシデントの兆候を察知しました。',
    decision:
      'チームと「イベントの安全な完遂」という目的を再共有し、合意を取ったうえで Cloudflare Registrar への移管を即断しました。',
    reflection:
      '最初は独力で抱え込もうとしました。目的の共有を先にすべきでした。',
    result:
      'ダウンタイムを最小に抑えて完遂し、利用者から「ありがとう」の声をいただきました。',
    links: [
      { label: 'GitHub リポジトリ', href: AWAJI_AGENT_REPO },
      // 設計意図が伝わるコミット（ユーザー選定）
      {
        label: 'ADR-030: レジストラの Cloudflare 移管',
        href: `${AWAJI_AGENT_REPO}/commit/e94bb1e`,
      },
      {
        label: '格納型XSS修正・署名鍵の必須化',
        href: `${AWAJI_AGENT_REPO}/commit/b6a966d`,
      },
      {
        label: 'Docker Compose で開発環境を再現',
        href: `${AWAJI_AGENT_REPO}/commit/df9fff7`,
      },
      {
        label: '社畜天狗さんの YouTube チャンネル',
        href: 'https://www.youtube.com/@Shachiku_Tengu',
      },
    ],
  },
  {
    kind: 'timeline',
    id: 'offevent-lp',
    number: '02',
    role: 'LP制作担当',
    title: '淡路帝国オフイベント（2027.3.6 ラピスホール神戸）告知LP',
    background:
      '社畜天狗さんが主催する着席160〜200名規模のオフイベントで、告知LPと並行して、当日運営システムも計画していました。',
    decision:
      '運営システムの設計方針で相方と意見が衝突しました。運営側から、当日に使いこなせるか、スタッフの訓練が必要になる、という理由で不要と判断され、思い切って使わないと決めました。',
    reflection:
      '作る前に「誰が使うのか」「誰のために必要なのか」「何が求められているのか」を聞き取れていませんでした。',
    result:
      '開発前にビジョンと需要を聞き取り、仲間と共有してから手を動かす姿勢を身につけました。LPは公開・運用中です。',
    bridge:
      'CASE 01 の「目的の再共有」と同じく、作る前に目標をそろえることの大切さを学びました。',
    // リポジトリは非公開なので GitHub へはリンクしない
    links: [
      { label: 'イベントLP', href: 'https://event.awajiempire.net/' },
      {
        label: '社畜天狗さんの YouTube チャンネル',
        href: 'https://www.youtube.com/@Shachiku_Tengu',
      },
    ],
  },
  {
    kind: 'nedo',
    id: 'nedo',
    number: '03',
    program: 'NEDO懸賞金活用型プログラム Season 2',
    team: 'チャイルドリーム',
    theme:
      '量子コンピュータによる双方向型動的教育教材・学習方針（能力測定のためのテスト問題含む）の機械生成',
    role: '生成AI・図生成エンジンなど、問題作成に関わる実装を担当',
    history:
      'Season 1 にも参加しましたが、受賞はしませんでした。その挑戦が Season 2 につながり、書類審査を通過しました。',
    links: [
      {
        label: 'Season 2 書類審査通過者一覧（NEDO）',
        href: 'https://qc-challenge.nedo.go.jp/season_2/docs/list_of_screened_applicants_20260831.pdf',
      },
      {
        label: 'Season 2 の概要（NEDO）',
        href: 'https://qc-challenge.nedo.go.jp/season_2/',
      },
      {
        label: 'Season 1 の概要（NEDO）',
        href: 'https://qc-challenge.nedo.go.jp/season_1/',
      },
    ],
  },
]
