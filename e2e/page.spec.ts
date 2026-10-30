import { expect, test } from '@playwright/test'

test('主要セクションと名前が表示され、横にはみ出さない', async ({ page }) => {
  await page.goto('/')

  for (const id of [
    'hero',
    'about',
    'philosophy',
    'cases',
    'skills',
    'contact',
  ]) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
  await expect(page.locator('#hero').getByText('岡田 昊也')).toBeVisible()

  // メールソフトのない PC でも読めて、コピーできるようにアドレスを表示する
  for (const address of ['gooya.3322@gmail.com', 'k-okada@jqca.org']) {
    await expect(page.getByText(address).first()).toBeVisible()
  }

  // 連絡先はヘッダー（ファーストビュー）に置き、プロフィール欄には置かない
  const header = page.locator('#hero')
  await expect(
    header.locator('a[href="https://github.com/Wanyaldee"]'),
  ).toBeVisible()
  const mail = 'a[href="mailto:gooya.3322@gmail.com"]'
  await expect(header.locator(mail).first()).toBeVisible()
  await expect(page.locator(`#about ${mail}`)).toHaveCount(0)

  // 「ありがとう」の一文は横書きで主役として置く
  const lead = page.locator('#about [data-lead]')
  await expect(lead).toContainText('ありがとう')
  await expect(lead).toHaveCSS('writing-mode', 'horizontal-tb')

  // アイコン（ビジュアル面）とクレジット
  const visual = page.locator('[data-visual] img[src="/avatar_all.jpg"]')
  await expect(visual).toBeVisible()
  // 丸型ではなく全体像を見せる
  await expect(visual).not.toHaveClass(/rounded-full/)
  // 絵の近くにも作者クレジットを置く
  await expect(
    page.locator('[data-visual] a[href="https://x.com/zZ5lALiyp"]'),
  ).toBeVisible()
  await expect(
    page.locator('footer a[href="https://x.com/zZ5lALiyp"]'),
  ).toBeVisible()

  // 装飾の縦線（左罫線）は使わない
  const leftBorders = await page.evaluate(() =>
    [...document.querySelectorAll('main *')]
      .filter((el) => parseFloat(getComputedStyle(el).borderLeftWidth) > 0)
      .map((el) => el.outerHTML.slice(0, 80)),
  )
  expect(leftBorders).toEqual([])

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
