import { expect, test } from '@playwright/test'

// public/avatar_all.jpg（810x1280）のうち、GitHub のアイコンに使っている範囲
const IMAGE = { width: 810, height: 1280 }
const ICON = { x: 30, y: 493, size: 748 }

// 2カラムをやめる幅（lg 未満）では、絵の一部しか出ないことがある
const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 600, height: 800 },
  { width: 900, height: 800 },
  { width: 800, height: 360 },
]

// 画面の大きさはテストの中で変えるので、1回だけ実行する
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile')
})

for (const viewport of VIEWPORTS) {
  test(`${viewport.width}x${viewport.height} では、アイコンと同じ範囲（本人）を主に映す`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    const layout = await page
      .locator('[data-visual] img[src="/avatar_all.jpg"]')
      .evaluate((img: HTMLImageElement) => {
        const style = getComputedStyle(img)
        return {
          width: img.offsetWidth,
          height: img.offsetHeight,
          objectPosition: style.objectPosition.split(' '),
          scale: parseFloat(style.scale) || 1,
        }
      })

    // object-fit: cover で描かれる絵の大きさと位置
    const ratio = Math.max(
      layout.width / IMAGE.width,
      layout.height / IMAGE.height,
    )
    const offset = (value: string, box: number, image: number) =>
      value.endsWith('%')
        ? ((box - image * ratio) * parseFloat(value)) / 100
        : parseFloat(value)
    const axes = [
      {
        box: layout.width,
        start: offset(layout.objectPosition[0], layout.width, IMAGE.width),
        from: ICON.x,
      },
      {
        box: layout.height,
        start: offset(layout.objectPosition[1], layout.height, IMAGE.height),
        from: ICON.y,
      },
    ]

    for (const { box, start, from } of axes) {
      // 拡大（scale）は面の中心を基準にかかる
      const toScreen = (v: number) =>
        box / 2 + layout.scale * (start + v * ratio - box / 2)
      const head = toScreen(from)
      const tail = toScreen(from + ICON.size)
      if (tail - head <= box) {
        // 収まるなら、範囲の全体を映す
        expect(head).toBeGreaterThanOrEqual(0)
        expect(tail).toBeLessThanOrEqual(box)
      } else {
        // 収まらないなら、範囲の中心を面の中心に置く
        expect(Math.abs((head + tail) / 2 - box / 2)).toBeLessThan(2)
      }
    }
  })
}

for (const viewport of VIEWPORTS) {
  test(`${viewport.width}x${viewport.height} では、縦書きの一文が面からはみ出さず、クレジットと重ならない`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    const catchcopy = page.locator('[data-visual] .vertical')
    if (!(await catchcopy.isVisible())) return
    const text = await catchcopy.boundingBox()
    const panel = await page.locator('[data-visual]').boundingBox()
    const credit = await page
      .locator('[data-visual] a[href="https://x.com/zZ5lALiyp"]')
      .boundingBox()
    if (!text || !panel || !credit) throw new Error('box not found')

    expect(text.y + text.height).toBeLessThanOrEqual(panel.y + panel.height)
    const overlaps =
      text.x < credit.x + credit.width &&
      credit.x < text.x + text.width &&
      text.y < credit.y + credit.height &&
      credit.y < text.y + text.height
    expect(overlaps).toBe(false)
  })
}
