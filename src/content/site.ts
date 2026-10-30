import type { SiteText } from './types.ts'

// 一覧ページのパス。GitHub Pages では末尾のスラッシュまで書く
export const REPOSITORIES_PATH = '/repositories/'

export const site: SiteText = {
  repositoriesPage: {
    label: 'Repositories',
    title: 'つくってきたもの',
    lead: '主にわたしが書いていて、OSS ライセンスで公開しているリポジトリです。新しく始めた順に並べています。',
    back: 'トップへ戻る',
    details: '詳しく見る',
    github: 'GitHub',
    forkSuffix: ' のフォーク',
    relatedCase: 'トップの実績で詳しく読む',
    worksTitle: 'リポジトリを公開していない成果物',
    worksLead:
      'OSS ではなく、リポジトリも公開していませんが、成果物として載せています。',
  },
  navLabel: 'つくってきたもの',
  casesLinkLabel: '成果物をまとめたページはこちら',
  license: {
    code: 'このサイトのコードは MIT License です。',
    excluded:
      '文章（© Wanyaldee）とイラスト（© ᴸⁱʸ さん）は MIT の対象外です。',
    licenseHref:
      'https://github.com/Wanyaldee/Wanyaldee.github.io/blob/main/LICENSE',
  },
}
