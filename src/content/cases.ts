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
    connections: [
      {
        id: 'dcon2027',
        title: 'DCON2027 への出場',
        body: 'もともとは全国高専プログラミングコンテスト（PROCON2026）への出場を目指していましたが、予選で落ちました。そこから事業内容とシステムを見直し、仲間とビジョンを共有し直して、DCON2027（全国高等専門学校ディープラーニングコンテスト）にチーム「香川高専 教育改革委員会」としてエントリーしました。作品「道真の神託」（AI×量子で拓く個別最適学習支援システム）で一次書類審査を通過し、いまは二次審査に向けて作品を磨いています。',
        links: [
          {
            label: 'DCON2027 一次審査通過チーム（No.69）',
            href: 'https://dcon.ai/teams/#1st',
          },
        ],
      },
      {
        id: 'jqca',
        title: 'JQCA への参画',
        body: 'NEDO でのプロジェクトリーダーが日本量子コンピューティング協会（JQCA）の支部員になったことで、こうした団体があることを知りました。量子コンピュータに取り組む楽しさや社会的な意義を広める活動をやってみたいと思い、JQCA に参画して大阪支部に所属しています。日本生成AI協会（JGAIA）にも所属しています。',
        links: [
          {
            label: '日本量子コンピューティング協会（JQCA）',
            href: 'https://www.jqca.org/',
          },
          { label: '日本生成AI協会（JGAIA）', href: 'https://www.jgaia.org/' },
        ],
      },
    ],
  },
]
