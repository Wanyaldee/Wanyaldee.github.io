import { defineConfig, lazyPlugins } from 'vite-plus'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // ユーザーサイト（https://wanyaldee.github.io/）なのでルート配信
  base: '/',
  // トップ（/）とリポジトリ一覧（/repositories/）の2ページ。
  // 一覧を別の HTML にしておくと、Pages で直接開いても 404 にならない
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        repositories: 'repositories/index.html',
      },
    },
  },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 2,
    printWidth: 80,
  },
  lint: {
    plugins: ['react', 'typescript', 'oxc'],
    rules: {
      'react/rules-of-hooks': 'error',
      'react/only-export-components': ['warn', { allowConstantExport: true }],
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
  },
  test: {
    include: ['src/**/*.test.ts'],
    // 公開前ゲートは未確定の文言が残る間は落ちるのが正しいので、通常の test から外す
    exclude: ['src/content/publishable.test.ts'],
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
})
