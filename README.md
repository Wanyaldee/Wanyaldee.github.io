# Wanyaldee.github.io

岡田 昊也（Koya Okada / わにゃ / Wanyaldee）のポートフォリオ。公開先: <https://wanyaldee.github.io/>

- 設計書: `docs/superpowers/specs/2026-10-30-portfolio-design.md`
- 文言はすべて `src/content/` にある（コンポーネントは描画のみ）

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
