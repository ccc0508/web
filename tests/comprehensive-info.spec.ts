import { expect, test } from '@playwright/test'

const categoryLabels = [
  '工作动态',
  '通知公告',
  '行业资讯',
  '警示曝光',
  '线索征集',
  '帮扶协作',
  '产业规划',
  '政策法规',
]

test('comprehensive information page renders the required static structure', async ({ page }) => {
  const referenceRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('3z.fsny.foshan.gov.cn')) {
      referenceRequests.push(request.url())
    }
  })

  await page.goto('/comprehensive-info')

  await expect(page.getByRole('heading', { name: '佛山市农村集体“三资”智慧云平台' })).toBeVisible()
  await expect(page.getByTestId('nav-1')).toHaveAttribute('aria-current', 'page')
  await expect(page.getByTestId('nav-0')).not.toHaveAttribute('aria-current')
  await expect(page.getByLabel('当前位置')).toContainText('当前位置首页/综合信息')

  const results = page.getByTestId('comprehensive-info-results')
  await expect(results.getByTestId('coming-soon')).toHaveCount(1)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  await expect(results.getByText('Coming soon...', { exact: true })).toBeVisible()
  await expect(results.locator('article')).toHaveCount(0)
  await expect(results.locator('img')).toHaveCount(0)

  const categoryNavigation = page.getByRole('navigation', { name: '综合信息栏目' })
  const categoryButtons = categoryNavigation.getByRole('button')
  await expect(categoryButtons).toHaveCount(categoryLabels.length)
  for (let index = 0; index < categoryLabels.length; index += 1) {
    await expect(categoryButtons.nth(index)).toHaveText(categoryLabels[index])
  }

  await expect(categoryButtons.nth(0)).toHaveAttribute('aria-current', 'true')
  await expect(page.getByTestId('comprehensive-info-sidebar')).toHaveAttribute(
    'data-active-category',
    '工作动态',
  )
  await expect(page.getByText('关于我们', { exact: true })).toHaveCount(0)
  await expect(page.getByText('监督投诉', { exact: true })).toHaveCount(0)
  expect(referenceRequests).toEqual([])
})

test('category and query controls stay local and never change the placeholder', async ({ page }) => {
  const requestsAfterReady: string[] = []
  await page.goto('/comprehensive-info')
  page.on('request', (request) => requestsAfterReady.push(request.url()))

  const originalUrl = page.url()
  const results = page.getByTestId('comprehensive-info-results')
  const sidebar = page.getByTestId('comprehensive-info-sidebar')

  await page.getByRole('button', { name: '通知公告', exact: true }).click()
  await expect(sidebar).toHaveAttribute('data-active-category', '通知公告')
  await expect(page.getByRole('button', { name: '通知公告', exact: true })).toHaveAttribute(
    'aria-current',
    'true',
  )

  await page.getByLabel('起始时间').fill('2026-08-01')
  await page.getByLabel('截止时间').fill('2026-08-31')
  await page.getByLabel('综合信息关键字').fill('测试信息')
  await page.getByRole('button', { name: '查询', exact: true }).click()

  await expect(page).toHaveURL(originalUrl)
  await expect(page.getByLabel('起始时间')).toHaveValue('2026-08-01')
  await expect(page.getByLabel('截止时间')).toHaveValue('2026-08-31')
  await expect(page.getByLabel('综合信息关键字')).toHaveValue('测试信息')
  await expect(results.getByTestId('coming-soon')).toHaveCount(1)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  await expect(results.locator('article, .article-list, .pagination')).toHaveCount(0)
  expect(requestsAfterReady).toEqual([])
})

test('comprehensive information layout stays ordered without horizontal overflow', async ({ page }) => {
  for (const width of [1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/comprehensive-info')

    const resultsBox = await page.getByTestId('comprehensive-info-results').boundingBox()
    const sidebarBox = await page.getByTestId('comprehensive-info-sidebar').boundingBox()
    expect(resultsBox).not.toBeNull()
    expect(sidebarBox).not.toBeNull()
    expect(resultsBox!.x).toBeLessThan(sidebarBox!.x)
    expect(Math.abs(resultsBox!.y - sidebarBox!.y)).toBeLessThan(2)

    await expect(page.getByRole('button', { name: '政策法规', exact: true })).toBeVisible()
    await expect(page.getByLabel('起始时间')).toBeVisible()
    await expect(page.getByLabel('截止时间')).toBeVisible()
    await expect(page.getByLabel('综合信息关键字')).toBeVisible()
    await expect(page.getByRole('button', { name: '查询', exact: true })).toBeVisible()

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(hasHorizontalOverflow).toBe(false)
  }
})

test('comprehensive information page keeps the shared back-to-top control working', async ({ page }) => {
  await page.goto('/comprehensive-info')

  const backTop = page.getByTestId('back-top')
  await expect(backTop).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300)

  await backTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
})
