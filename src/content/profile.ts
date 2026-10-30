import type { Profile } from './types.ts'

export const profile: Profile = {
  nameJa: '岡田 昊也',
  nameKana: 'おかだ こうや',
  nameEn: 'Koya Okada',
  nickname: 'わにゃ',
  handle: 'Wanyaldee',
  eyebrow: 'TECHNICAL LEADER / INFRASTRUCTURE',
  catchcopy: '現場の痛みを背負い、共通の目標を掲げて挑戦を支える技術リーダー',
  catchcopyEmphasis: '技術リーダー',
  statement:
    'インフラの安定稼働と工学原理への探求を軸に、約700人規模のコミュニティ基盤の運用、研究室での基盤運用支援、NEDO懸賞金活用型プログラムでの実装を担っています。「人を責めず仕組みを直す」「リーダーが矢面に立ち挑戦を後押しする」を信念にしています。',
  // 16歳の誕生日に ᴸⁱʸ さんに描いていただいたイラスト（GitHub のアイコンと同じ）
  avatar: {
    src: '/avatar_all.jpg',
    alt: 'わにゃ（Wanyaldee）のイラスト（ᴸⁱʸ さん作）',
    credit: {
      label: 'アイコンイラスト: ᴸⁱʸ さん（@zZ5lALiyp）',
      href: 'https://x.com/zZ5lALiyp',
    },
  },
  affiliations: [
    {
      ja: '香川高専 電気情報工学科',
      en: 'National Institute of Technology, Kagawa College, Department of Electrical and Computer Engineering',
    },
    {
      ja: '日本量子コンピューティング協会（JQCA）大阪支部所属',
      en: 'Japan Quantum Computing Association, Osaka Branch Member',
    },
  ],
  contacts: [
    { label: 'Mail', href: 'mailto:gooya.3322@gmail.com' },
    { label: 'Mail（JQCA）', href: 'mailto:k-okada@jqca.org' },
    { label: 'GitHub', href: 'https://github.com/Wanyaldee' },
    { label: 'X', href: 'https://x.com/Gooya3322' },
    { label: 'Instagram', href: 'https://www.instagram.com/gooya3322' },
  ],
}
