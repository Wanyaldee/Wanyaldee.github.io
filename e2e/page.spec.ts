import { expect, test } from '@playwright/test'

test('主要セクションと名前が表示され、横にはみ出さない', async ({ page }) => {
  await page.goto('/')

  for (const id of ['hero', 'philosophy', 'cases', 'skills', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
  await expect(page.getByText('岡田 昊也').first()).toBeVisible()

  const fitsWidth = await page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth,
  )
  expect(fitsWidth).toBe(true)

  for (const a of await page.locator('a[href^="https://"]').all()) {
    await expect(a).toHaveAttribute('target', '_blank')
    await expect(a).toHaveAttribute('rel', 'noopener noreferrer')
  }
  for (const a of await page.locator('a[href^="mailto:"]').all()) {
    await expect(a).not.toHaveAttribute('target', '_blank')
  }

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://wanyaldee.github.io/og.png',
  )
})
