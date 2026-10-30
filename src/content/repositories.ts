import type { Repository } from './types.ts'

// 文言は各リポジトリの README・ドキュメント・コミット履歴から下書きしたもの。
// 本人の確認が済んでいない文には __PENDING__ を付けている（公開前ゲートで止まる）。
// 並びは新しく始めた順（startedOn の降順。repositories.test.ts で検証）
export const repositories: Repository[] = [
  {
    id: 'Wanyaldee/Wanyaldee.github.io',
    startedOn: '2026-10-29',
    language: 'TypeScript',
    license: 'MIT',
    status: '公開中__PENDING__',
    overview: 'いまご覧になっているポートフォリオサイトです。',
    why: '就職活動で、自分が何者かを1ページで伝えるために作りました。__PENDING__',
    thought:
      '文言をコードから分け、型とテストで載せてよい範囲を決めています。未確定の文言が残っていると公開されない仕組みにしています。',
    now: 'GitHub Pages で公開し、内容を少しずつ直しています。',
  },
  {
    id: 'Wanyaldee/quantum-visualizer',
    startedOn: '2026-10-23',
    language: 'TypeScript',
    license: 'MIT',
    status: '開発中__PENDING__',
    overview:
      '量子コンピュータ（ゲート式・アニーリング）が答えを出すまでの状態の変化を、ブラウザで見られる Web アプリです。',
    why: 'ワークショップの教材と、自分の理解のために作りました。__PENDING__',
    thought:
      '計算はブラウザ内の小さなシミュレータで行い、外部の API やキーなしで動くようにしました。この判断は ADR に残しています。',
    now: 'GitHub Pages で公開しています。最終更新は 2026年10月26日です。',
  },
  {
    id: 'Wanyaldee/blueqat-mcp-playground',
    startedOn: '2026-08-27',
    language: 'Python',
    license: 'MIT',
    status: '更新中__PENDING__',
    overview:
      'blueqat MCP サーバーで量子回路・QAOA・VQE・実機 QPU を試した使用例集です。',
    why: 'MCP 経由で量子計算がどこまでできるかを確かめるために始めました。__PENDING__',
    thought:
      '結果は手で書き換えず、実際に実行したときの run_id を添えて、だれでも検証できるようにしました。',
    now: '使用例は19件あり、quantum-visualizer の題材にも使っています。最終更新は 2026年10月29日です。',
  },
  {
    id: 'Wanyaldee/Easy-Archive',
    startedOn: '2026-08-23',
    language: 'Rust',
    license: 'MIT',
    status: '公開中__PENDING__',
    overview:
      '文字コードを自動で判定し、文字化けせずに ZIP を解凍・圧縮できる Linux 向けの GUI ツールです。',
    why: 'Linux の PC で、自治体や取引先から届く ZIP のファイル名が文字化けし、GUI で正しく開けるツールが見当たらなかったので作りました。',
    thought:
      '対象を ZIP と Ubuntu 系に絞り、解凍だけでなく送り返すための圧縮も最低限そろえました。中核の部分は OS に依存しない作りにしています。',
    now: 'v0.1.2 を .deb パッケージで配布しています。最終更新は 2026年9月16日です。',
  },
  {
    id: 'Wanyaldee/citadel',
    startedOn: '2026-07-23',
    language: 'Rust',
    license: 'Apache-2.0 / GPL-3.0',
    forkOf: { label: 'Zed', href: 'https://github.com/zed-industries/zed' },
    status: '開発を止めています__PENDING__',
    overview:
      'エディタの Zed をフォークし、Arduino（AVR）向けの開発環境に作り直しているものです。',
    why: 'IDE が重いこと、ビルドが通っても実機で止まること、異常終了でマイコンのポートを掴んだままになることを解決したくて始めました。',
    thought:
      'ロジックはすべて Rust に置き、C/C++ には入出力の受け渡しだけを許すという境界を決めました。方針は RFC として4本書いています。',
    now: '試作（シリアルモニター、Citadel への名前の変更）までを作りました。最終更新は 2026年8月14日です。__PENDING__',
  },
  {
    id: 'Wanyaldee/wanyaldee-skills',
    startedOn: '2026-07-04',
    language: 'TypeScript',
    license: 'MIT',
    status: '更新中__PENDING__',
    overview:
      'Claude Code で使う、自分用のスキル（コーディングの規律、ADR の書き方、メモリの扱いなど）をまとめたパッケージです。',
    why: 'AI に任せる開発でも、同じ規律で作業させるために始めました。__PENDING__',
    thought:
      'どのエージェントにも効く4つのスキルは、Claude Code 以外でも読めるよう AGENTS.md の形でも出しています。',
    now: 'v2.12.0 を Claude Code のプラグインとして配布しています。最終更新は 2026年10月23日です。',
  },
  {
    id: 'Awaji-Empire-Technical-Department/Awaji-Empire-Agent',
    startedOn: '2026-01-23',
    language: 'Python',
    license: 'MIT',
    relatedCase: 'awaji-agent',
    status: '運用中__PENDING__',
    overview:
      'Discord サーバー「淡路帝国」の運営を支える Bot とダッシュボードです。',
    why: 'コミュニティの運営を仕組みで支えるために始めました。詳しくはトップページの CASE 01 に書いています。__PENDING__',
    thought: '判断の経緯は CASE 01 に書いています。',
    now: '運用を続けています。最終更新は 2026年10月28日です。',
  },
]

/** GitHub のリポジトリページの URL */
export function repositoryUrl(repo: Repository): string {
  return `https://github.com/${repo.id}`
}
