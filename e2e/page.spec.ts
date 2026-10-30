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

  // NEDO は正式な名称で書き、Season 1 からの経緯も載せる
  const cases = page.locator('#cases')
  await expect(cases).toContainText('NEDO懸賞金活用型プログラム Season 2')
  await expect(cases).toContainText('Season 1 にも参加しましたが')
  await expect(cases).not.toContainText('懸賞金チャレンジ')

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

test('スマホでは章と章の間を空けすぎない', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile')
  await page.goto('/')

  const gaps = await page.evaluate(() => {
    const sections = [...document.querySelectorAll('main section')]
    return sections.slice(1).map((section, i) => {
      const prev = sections[i].lastElementChild as HTMLElement
      const title = section.querySelector('h2') as HTMLElement
      return (
        title.getBoundingClientRect().top - prev.getBoundingClientRect().bottom
      )
    })
  })
  expect(gaps.length).toBeGreaterThan(0)
  for (const gap of gaps) {
    expect(gap).toBeLessThanOrEqual(112)
  }
})

test('ヘッダーと実績の最後から、リポジトリ一覧へ同じタブで移れる', async ({
  page,
}) => {
  await page.goto('/')
  const navLink = page.locator('#hero nav a[href="/repositories/"]')
  const casesLink = page.locator('#cases a[href="/repositories/"]')
  for (const link of [navLink, casesLink]) {
    await expect(link).toBeVisible()
    await expect(link).not.toHaveAttribute('target', '_blank')
  }
  await navLink.click()
  await expect(page).toHaveURL(/\/repositories\/$/)
  await expect(page.locator('[data-repository]').first()).toBeVisible()
})
