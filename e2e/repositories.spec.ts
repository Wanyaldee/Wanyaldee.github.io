import { expect, test } from '@playwright/test'

const REPOSITORY_COUNT = 7

test('/repositories/ を直接開くと一覧ページが出る', async ({ page }) => {
  const res = await page.goto('/repositories/')
  expect(res?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('[data-repository]')).toHaveCount(REPOSITORY_COUNT)
  await expect(
    page.getByRole('link', { name: /トップへ戻る/ }),
  ).toHaveAttribute('href', '/')
})

test('再読み込みしても一覧ページのまま', async ({ page }) => {
  await page.goto('/repositories/')
  await page.reload()
  await expect(page.locator('[data-repository]')).toHaveCount(REPOSITORY_COUNT)
})
