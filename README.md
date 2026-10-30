# Wanyaldee.github.io

岡田 昊也（Koya Okada / わにゃ / Wanyaldee）のポートフォリオ。公開先: <https://wanyaldee.github.io/>

- 文言はすべて `src/content/` にある（コンポーネントは描画のみ）

## ライセンス

- コード（仕組み・デザイン）は [MIT License](LICENSE) です。
- 次のものは MIT の対象外です。
  - イラスト（`public/avatar_all.jpg` と、それを使った `public/og.png`）: ᴸⁱʸ さん（https://x.com/zZ5lALiyp）の作品で、著作権は作者にあります。
  - `src/content/` の文章: 著作権は Wanyaldee にあり、すべての権利を留保します。

## Tech stack

Vite+（`vite-plus`）+ React + TypeScript + Tailwind CSS v4。Node 22（`.node-version`）。

## Getting started

```bash
vp env install   # Node 22
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| コマンド                | 内容                                              |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | 開発サーバ                                        |
| `npm run build`         | 型チェック（`tsc -b`）＋本番ビルド                |
| `npm run check`         | `vp check`（整形 + lint + 型チェック）            |
| `npm test`              | 単体テスト（`vp test run`）                       |
| `npm run test:e2e`      | Playwright による表示確認                         |
| `npm run check:publish` | 未確定の文言（`__PENDING__`）が残っていないか検査 |
