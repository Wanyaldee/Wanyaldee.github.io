import { expect, type Page, test } from '@playwright/test'

const ITEMS = [
  'トップ',
  'わたしについて',
  '実績',
  '技術',
  'これから',
  'つくってきたもの',
]

// 見出しが固定のナビやボタンに隠れず、画面に入っていること
async function expectTitleInView(page: Page, id: string) {
  await expect
    .poll(() =>
      page.evaluate(
        (sectionId) =>
          document.querySelector(`#${sectionId}-title`)!.getBoundingClientRect()
            .top,
        id,
      ),
    )
    .toBeGreaterThanOrEqual(56)
  await expect(page.locator(`#${id}-title`)).toBeInViewport()
}

test('「メールする」ボタンは置かない', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('メールする')).toHaveCount(0)
})

test.describe('PC', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop')
  })

  test('スクロールしてもセクションナビが見え、項目へ移れる', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()
    const nav = page.getByRole('navigation', { name: 'セクション' })
    await expect(nav).toBeInViewport()
    for (const label of ITEMS) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
    await expect(
      page.getByRole('button', { name: 'メニューを開く' }),
    ).toBeHidden()

    await nav.getByRole('link', { name: '実績' }).click()
    await expectTitleInView(page, 'cases')
  })

  test('「トップ」で連絡先・SNSの一覧へ移る', async ({ page }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()
    await page
      .getByRole('navigation', { name: 'セクション' })
      .getByRole('link', { name: 'トップ' })
      .click()
    await expect(
      page.locator('#top-contacts a[href="https://github.com/Wanyaldee"]'),
    ).toBeInViewport()
  })
})

test.describe('スマホ', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile')
  })

  test('メニューボタンでセクションナビを開き、選ぶと閉じて移動する', async ({
    page,
  }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()
    await expect(
      page.getByRole('navigation', { name: 'セクション' }),
    ).toBeHidden()

    const open = page.getByRole('button', { name: 'メニューを開く' })
    await expect(open).toBeInViewport()
    await expect(open).toHaveAttribute('aria-expanded', 'false')
    await open.click()

    const menu = page.getByRole('dialog', { name: 'メニュー' })
    await expect(menu).toBeVisible()
    for (const label of ITEMS) {
      await expect(menu.getByRole('link', { name: label })).toBeVisible()
    }

    await menu.getByRole('link', { name: '実績' }).click()
    await expect(menu).toBeHidden()
    await expectTitleInView(page, 'cases')
  })

  test('Esc キーでメニューを閉じられる', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'メニューを開く' }).click()
    const menu = page.getByRole('dialog', { name: 'メニュー' })
    await expect(menu).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
  })

  test('「トップ」で連絡先・SNSの一覧へ移る', async ({ page }) => {
    await page.goto('/')
    await page.locator('#skills').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: 'メニューを開く' }).click()
    await page
      .getByRole('dialog', { name: 'メニュー' })
      .getByRole('link', { name: 'トップ' })
      .click()
    await expect(
      page.locator('#top-contacts a[href="https://github.com/Wanyaldee"]'),
    ).toBeInViewport()
  })
})
