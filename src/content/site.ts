import type { SiteText } from './types.ts'

// 一覧ページのパス。GitHub Pages では末尾のスラッシュまで書く
export const REPOSITORIES_PATH = '/repositories/'

export const site: SiteText = {
  repositoriesPage: {
    label: 'Repositories',
    title: 'つくってきたもの__PENDING__',
    lead: '主にわたしが書いていて、OSS ライセンスで公開しているリポジトリです。新しく始めた順に並べています。__PENDING__',
    back: 'トップへ戻る',
    details: '詳しく見る',
    github: 'GitHub',
    forkSuffix: ' のフォーク',
    relatedCase: 'トップの実績で詳しく読む',
  },
}
