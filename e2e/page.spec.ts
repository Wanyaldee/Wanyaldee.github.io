import { expect, test } from '@playwright/test'

test('主要セクションと名前が表示され、横にはみ出さない', async ({ page }) => {
  await page.goto('/')

  for (const id of ['hero', 'philosophy', 'cases', 'skills', 'contact']) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
  await expect(page.getByText('岡田 昊也').first()).toBeVisible()

  // メールソフトのない PC でも読めて、コピーできるようにアドレスを表示する
  for (const address of ['gooya.3322@gmail.com', 'k-okada@jqca.org']) {
    await expect(page.getByText(address).first()).toBeVisible()
  }

  // 連絡先はヘッダーにあり、プロフィール帯の直後には置かない
  const header = page.locator('#hero nav')
  await expect(
    header.locator('a[href="https://github.com/Wanyaldee"]'),
  ).toBeVisible()
  const mail = 'a[href="mailto:gooya.3322@gmail.com"]'
  await expect(header.locator(mail)).toHaveCount(1)
  await expect(page.locator(`#hero ${mail}`)).toHaveCount(1)

  // アイコンとクレジット
  await expect(
    page.locator('#hero img[src="/avatar.jpg"]').first(),
  ).toBeVisible()
  await expect(
    page.locator('footer a[href="https://x.com/zZ5lALiyp"]'),
  ).toBeVisible()

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
