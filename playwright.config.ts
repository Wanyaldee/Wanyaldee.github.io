import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
    { name: 'mobile', use: { viewport: { width: 360, height: 740 } } },
  ],
  webServer: {
    command: 'npm run build && vp preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
