import { expect, test } from '@playwright/test'

test('trade hall renders the exact first-screen copy and local-only controls', async ({ page }) => {
  const referenceRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('3z.fsny.foshan.gov.cn')) {
      referenceRequests.push(request.url())
    }
  })

  await page.goto('/trade-hall')

  await expect(page.getByText('欢迎进入佛山市农村集体“三资”智慧云平台', { exact: true })).toBeVisible()
  await expect(page.getByTestId('welcome-date')).toHaveText(
    /^\d{4}年\d{1,2}月\d{1,2}日　星期[日一二三四五六]$/,
  )
  await expect(page.locator('.welcome-bar')).not.toContainText('农历')
  await expect(
    page.getByRole('heading', { name: '佛山市农村集体“三资”智慧云平台交易系统', exact: true }),
  ).toBeVisible()
  await expect(page.getByText('佛山市农村产权流转交易管理服务平台', { exact: true })).toBeVisible()
  await expect(page.getByText('科技赋能未来乡村、数字赋能乡村振兴', { exact: true })).toBeVisible()

  const searchForm = page.getByRole('search', { name: '交易大厅搜索' })
  await expect(searchForm.getByPlaceholder('请输入你要查询的信息')).toBeVisible()
  await expect(searchForm.locator('select')).toHaveCount(0)
  await expect(page.getByText('本站文章', { exact: true })).toHaveCount(0)

  const originalUrl = page.url()
  await searchForm.getByLabel('搜索关键词').fill('测试项目')
  await searchForm.getByRole('button', { name: '搜索', exact: true }).click()
  await expect(page).toHaveURL(originalUrl)
  await searchForm.getByRole('button', { name: '项目地图', exact: true }).click()
  await expect(page).toHaveURL(originalUrl)

  expect(referenceRequests).toEqual([])
})

test('trade hall secondary navigation matches the reference behavior', async ({ page }) => {
  await page.goto('/trade-hall')

  const navigation = page.getByTestId('trade-hall-nav')
  await expect(navigation.locator('button')).toHaveText([
    '交易大厅',
    '会员中心',
    '免责声明',
    '服务协议',
    '交易指南',
  ])

  const activeItem = navigation.getByRole('button', { name: '交易大厅', exact: true })
  await expect(activeItem).toHaveAttribute('aria-current', 'page')
  await expect(activeItem).toHaveCSS('background-color', 'rgb(246, 185, 39)')

  const originalUrl = page.url()
  for (const label of ['会员中心', '免责声明', '服务协议', '交易指南']) {
    await navigation.getByRole('button', { name: label, exact: true }).click()
    await expect(page).toHaveURL(originalUrl)
  }

  const platformLink = navigation.getByRole('link', {
    name: '>> 佛山市农村集体“三资”智慧云平台',
    exact: true,
  })
  await expect(platformLink).toBeVisible()
  await platformLink.click()
  await expect(page).toHaveURL('http://127.0.0.1:4173/')
})

test('trade hall keeps everything below the navigation blank', async ({ page }) => {
  await page.goto('/trade-hall')

  const emptyArea = page.getByTestId('trade-hall-empty')
  await expect(emptyArea).toBeVisible()
  await expect(emptyArea.locator(':scope > *')).toHaveCount(0)

  for (const excludedText of [
    '竞投流程',
    '网上竞投',
    '已选条件',
    '登录/注册',
    '关于我们',
    '监督投诉',
  ]) {
    await expect(page.getByText(excludedText, { exact: true })).toHaveCount(0)
  }
})

test('trade hall first screen fits common desktop viewport widths', async ({ page }) => {
  for (const width of [1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/trade-hall')

    for (const selector of ['.brand-lockup', '.search-panel', '.trade-hall-nav__inner']) {
      const box = await page.locator(selector).boundingBox()
      expect(box, `${selector} should render at ${width}px`).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width)
    }

    const heading = page.getByRole('heading', {
      name: '佛山市农村集体“三资”智慧云平台交易系统',
      exact: true,
    })
    await expect(heading).toBeVisible()
    await expect(heading).toHaveCSS('white-space', 'nowrap')
  }
})
