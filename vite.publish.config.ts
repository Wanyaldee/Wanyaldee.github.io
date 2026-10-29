import { defineConfig } from 'vite-plus'

// 公開前ゲート専用（npm run check:publish）。通常の test 設定からは除外している
export default defineConfig({
  test: {
    include: ['src/content/publishable.test.ts'],
  },
})
