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

test('各リポジトリは概要が見え、詳細は閉じていて、開ける', async ({ page }) => {
  await page.goto('/repositories/')
  const first = page.locator('[data-repository]').first()
  await expect(first.locator('[data-overview]')).toBeVisible()
  await expect(first.locator('[data-details-body]')).toBeHidden()

  // 閉じたままでも GitHub へのリンクは押せる
  const github = first.getByRole('link', { name: /GitHub/ })
  await expect(github).toBeVisible()
  await expect(github).toHaveAttribute(
    'href',
    'https://github.com/Wanyaldee/Wanyaldee.github.io',
  )
  await expect(github).toHaveAttribute('target', '_blank')

  // キーボードで開ける
  await first.getByText('詳しく見る').focus()
  await page.keyboard.press('Enter')
  const body = first.locator('[data-details-body]')
  await expect(body).toBeVisible()
  for (const label of ['Why', 'Thought', 'Now']) {
    await expect(body).toContainText(label)
  }
})

test('citadel には Zed のフォークであることが出る', async ({ page }) => {
  await page.goto('/repositories/')
  const citadel = page.locator('[data-repository="Wanyaldee/citadel"]')
  await expect(citadel).toContainText('Zed のフォーク')
  await expect(
    citadel.locator('a[href="https://github.com/zed-industries/zed"]'),
  ).toBeVisible()
})

test('Awaji-Empire-Agent からトップの実績へ戻れる', async ({ page }) => {
  await page.goto('/repositories/')
  const agent = page.locator(
    '[data-repository="Awaji-Empire-Technical-Department/Awaji-Empire-Agent"]',
  )
  const link = agent.locator('a[href="/#cases"]')
  await expect(link).toBeVisible()
  await expect(link).not.toHaveAttribute('target', '_blank')
})

test('一覧ページは横にはみ出さず、左罫線を使わない', async ({ page }) => {
  await page.goto('/repositories/')
  // 詳細もすべて開いた状態で確かめる
  for (const summary of await page.locator('summary').all()) {
    await summary.click()
  }
  const fitsWidth = await page.evaluate(
    () =>
      document.documentElement.scrollWidth <=
      document.documentElement.clientWidth,
  )
  expect(fitsWidth).toBe(true)
  const leftBorders = await page.evaluate(() =>
    [...document.querySelectorAll('main *')]
      .filter((el) => parseFloat(getComputedStyle(el).borderLeftWidth) > 0)
      .map((el) => el.outerHTML.slice(0, 80)),
  )
  expect(leftBorders).toEqual([])
})

for (const path of ['/', '/repositories/']) {
  test(`${path} のフッターに、ライセンスと適用範囲、絵のクレジットがある`, async ({
    page,
  }) => {
    await page.goto(path)
    const footer = page.locator('footer')
    await expect(
      footer.locator(
        'a[href="https://github.com/Wanyaldee/Wanyaldee.github.io/blob/main/LICENSE"]',
      ),
    ).toBeVisible()
    await expect(footer).toContainText('MIT')
    await expect(footer).toContainText('文章')
    await expect(footer).toContainText('イラスト')
    await expect(
      footer.locator('a[href="https://x.com/zZ5lALiyp"]'),
    ).toBeVisible()
  })
}

test('quantum-visualizer は公開ページへ新しいタブで移れる', async ({
  page,
}) => {
  await page.goto('/repositories/')
  const link = page.locator(
    '[data-repository="Wanyaldee/quantum-visualizer"] a[href="https://wanyaldee.github.io/quantum-visualizer/"]',
  )
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
})

test('リポジトリを公開していない成果物として、オフイベントLPへ移れる', async ({
  page,
}) => {
  await page.goto('/repositories/')
  const lp = page.locator('[data-work="offevent-lp"]')
  const link = lp.locator('a[href="https://event.awajiempire.net/"]')
  await expect(link).toBeVisible()
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(lp.locator('a[href*="github.com"]')).toHaveCount(0)
  // リポジトリの一覧（7件）には混ぜない
  await expect(page.locator('[data-repository]')).toHaveCount(REPOSITORY_COUNT)
})

test('Awaji-Empire-Agent とオフイベントLPから、社畜天狗さんのチャンネルへ移れる', async ({
  page,
}) => {
  await page.goto('/repositories/')
  for (const item of [
    '[data-repository="Awaji-Empire-Technical-Department/Awaji-Empire-Agent"]',
    '[data-work="offevent-lp"]',
  ]) {
    const link = page.locator(
      `${item} a[href="https://www.youtube.com/@Shachiku_Tengu"]`,
    )
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('target', '_blank')
  }
})
