import { expect, test, type Page } from '@playwright/test'

const cityOptions = [
  '不限', '广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市',
  '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市',
]

const assetOptions = [
  '不限', '耕地', '园地', '林地', '草地', '农田水利设施用地（沟渠）', '养殖水面(坑塘水面)',
  '其他农用地', '未利用地', '“四荒”地', '其他土地资产', '商铺', '厂房', '仓库', '办公楼',
  '市场', '临时建筑', '商住楼', '其他物业', '其他固定资产',
]

const tradeModeOptions = [
  '不限', '网上竞投', '公开协商', '简易竞投', '网上竞投（批量）', '定价招租', '书面竞投',
]

const announcementOptions = ['交易公告', '结果公示', '成交公告', '终止公告', '失败公告']
const amountOptions = ['不限', '0-1999', '2000-4999', '5000-9999', '10000以上', '自定义金额']
const publishDateOptions = ['不限', '近一周内', '近两周内', '近一个月内', '自定义日期']

const group = (page: Page, label: string) => page.getByRole('radiogroup', { name: label, exact: true })

const expectOptions = async (page: Page, label: string, expected: string[]) => {
  const texts = await group(page, label).getByRole('radio').allTextContents()
  expect(texts.map((text) => text.trim())).toEqual(expected)
}

const expectSelected = async (page: Page, label: string, option: string) => {
  await expect(group(page, label).getByRole('radio', { name: option, exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  )
}

test('transaction dynamics page renders complete filters and screenshot defaults', async ({ page }) => {
  const referenceRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('3z.fsny.foshan.gov.cn')) {
      referenceRequests.push(request.url())
    }
  })

  await page.goto('/transaction-dynamics')

  await expect(page.getByTestId('nav-2')).toHaveAttribute('aria-current', 'page')
  await expect(page.getByTestId('nav-0')).not.toHaveAttribute('aria-current')
  await expect(page.getByLabel('当前位置')).toContainText('当前位置首页/结果公示')
  await expect(page.getByText('已选条件：', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '全部撤销', exact: true })).toBeVisible()

  await expectOptions(page, '市', cityOptions)
  await expectOptions(page, '资产类别', assetOptions)
  await expectOptions(page, '交易模式', tradeModeOptions)
  await expectOptions(page, '公告类型', announcementOptions)

  await expectSelected(page, '市', '不限')
  await expectSelected(page, '资产类别', '不限')
  await expectSelected(page, '交易模式', '不限')
  await expectSelected(page, '公告类型', '交易公告')
  await expect(page.getByTestId('transaction-selected-conditions')).toHaveText('已选条件：')

  const results = page.getByTestId('transaction-dynamics-results')
  await expect(results.getByTestId('coming-soon')).toHaveCount(1)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  expect(referenceRequests).toEqual([])
})

test('filters stay local, keep Guangdong cities complete, and reset to defaults', async ({ page }) => {
  await page.goto('/transaction-dynamics')
  const originalUrl = page.url()
  const panel = page.getByTestId('transaction-filter-panel')
  const conditions = page.getByTestId('transaction-selected-conditions')

  await group(page, '市').getByRole('radio', { name: '深圳市', exact: true }).click()
  await group(page, '资产类别').getByRole('radio', { name: '商铺', exact: true }).click()
  await group(page, '交易模式').getByRole('radio', { name: '公开协商', exact: true }).click()
  await group(page, '公告类型').getByRole('radio', { name: '结果公示', exact: true }).click()

  await expect(panel).toHaveAttribute('data-city', '深圳市')
  await expect(panel).toHaveAttribute('data-asset-category', '商铺')
  await expect(panel).toHaveAttribute('data-trade-mode', '公开协商')
  await expect(panel).toHaveAttribute('data-announcement-type', '结果公示')
  await expect(group(page, '市').getByRole('radio')).toHaveCount(cityOptions.length)
  for (const condition of [
    '市：深圳市', '资产类别：商铺', '交易模式：公开协商', '公告类型：结果公示',
  ]) {
    await expect(conditions.getByText(condition, { exact: true })).toBeVisible()
  }
  await expect(page).toHaveURL(originalUrl)
  await expect(page.getByTestId('transaction-dynamics-results').getByTestId('coming-soon')).toHaveCount(1)

  await page.getByRole('button', { name: '全部撤销', exact: true }).click()
  await expect(panel).toHaveAttribute('data-city', '不限')
  await expect(panel).toHaveAttribute('data-asset-category', '不限')
  await expect(panel).toHaveAttribute('data-trade-mode', '不限')
  await expect(panel).toHaveAttribute('data-announcement-type', '交易公告')
  await expect(conditions).toHaveText('已选条件：')
  await expect(page).toHaveURL(originalUrl)
})

test('more options expands local filters, preserves state, and resets without side effects', async ({ page }) => {
  await page.goto('/transaction-dynamics')
  const requestsAfterReady: string[] = []
  page.on('request', (request) => requestsAfterReady.push(request.url()))

  const panel = page.getByTestId('transaction-filter-panel')
  const moreButton = page.getByRole('button', {
    name: '更多选项(成交金额、发布日期、关键字)',
    exact: true,
  })
  const results = page.getByTestId('transaction-dynamics-results')
  const originalUrl = page.url()

  await expect(moreButton).toHaveAttribute('aria-expanded', 'false')
  await expect(panel.locator('input, select, textarea')).toHaveCount(0)
  await moreButton.click()
  await expect(moreButton).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('transaction-additional-filters')).toBeVisible()
  await expectOptions(page, '成交金额', amountOptions)
  await expectOptions(page, '发布日期', publishDateOptions)
  await expectSelected(page, '成交金额', '不限')
  await expectSelected(page, '发布日期', '不限')
  await expect(page.getByLabel('交易动态关键字')).toBeVisible()

  await page.getByLabel('成交金额下限').fill('1000')
  await page.getByLabel('成交金额上限').fill('5000')
  await group(page, '成交金额').getByRole('button', { name: '确定', exact: true }).click()
  await page.getByLabel('发布开始日期').fill('2026-08-01')
  await page.getByLabel('发布结束日期').fill('2026-08-09')
  await group(page, '发布日期').getByRole('button', { name: '确定', exact: true }).click()
  await page.getByLabel('交易动态关键字').fill('鱼塘')
  await page.getByRole('group', { name: '关键字' }).getByRole('button', { name: '确定' }).click()

  const conditions = page.getByTestId('transaction-selected-conditions')
  await expect(conditions.getByText('成交金额：自定义金额（1000 至 5000）', { exact: true })).toBeVisible()
  await expect(
    conditions.getByText('发布日期：自定义日期（2026-08-01 至 2026-08-09）', { exact: true }),
  ).toBeVisible()
  await expect(conditions.getByText('关键字：鱼塘', { exact: true })).toBeVisible()

  await moreButton.click()
  await expect(moreButton).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByTestId('transaction-additional-filters')).toHaveCount(0)
  await moreButton.click()
  await expect(page.getByLabel('成交金额下限')).toHaveValue('1000')
  await expect(page.getByLabel('发布开始日期')).toHaveValue('2026-08-01')
  await expect(page.getByLabel('交易动态关键字')).toHaveValue('鱼塘')

  await page.getByRole('button', { name: '全部撤销', exact: true }).click()
  await expect(moreButton).toHaveAttribute('aria-expanded', 'true')
  await expectSelected(page, '成交金额', '不限')
  await expectSelected(page, '发布日期', '不限')
  await expect(page.getByLabel('成交金额下限')).toHaveValue('')
  await expect(page.getByLabel('成交金额上限')).toHaveValue('')
  await expect(page.getByLabel('发布开始日期')).toHaveValue('')
  await expect(page.getByLabel('发布结束日期')).toHaveValue('')
  await expect(page.getByLabel('交易动态关键字')).toHaveValue('')
  await expect(conditions).toHaveText('已选条件：')
  await expect(page).toHaveURL(originalUrl)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  await expect(results.locator('article, img, table, .sort, .pagination')).toHaveCount(0)
  await expect(page.getByText('暂无公开数据', { exact: true })).toHaveCount(0)
  expect(requestsAfterReady).toEqual([])
})

test('transaction dynamics layout has no horizontal overflow at desktop widths', async ({ page }) => {
  for (const width of [1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/transaction-dynamics')

    const collapsedPanelBox = await page.getByTestId('transaction-filter-panel').boundingBox()
    const collapsedResultsBox = await page.getByTestId('transaction-dynamics-results').boundingBox()
    expect(collapsedPanelBox).not.toBeNull()
    expect(collapsedResultsBox).not.toBeNull()
    expect(collapsedResultsBox!.y).toBeGreaterThan(collapsedPanelBox!.y + collapsedPanelBox!.height)
    await expect(group(page, '市').getByRole('radio', { name: '云浮市', exact: true })).toBeVisible()
    await expect(
      group(page, '资产类别').getByRole('radio', { name: '其他固定资产', exact: true }),
    ).toBeVisible()

    await page.getByRole('button', {
      name: '更多选项(成交金额、发布日期、关键字)',
      exact: true,
    }).click()
    await expect(page.getByTestId('transaction-additional-filters')).toBeVisible()
    const expandedPanelBox = await page.getByTestId('transaction-filter-panel').boundingBox()
    const expandedResultsBox = await page.getByTestId('transaction-dynamics-results').boundingBox()
    expect(expandedPanelBox).not.toBeNull()
    expect(expandedResultsBox).not.toBeNull()
    expect(expandedPanelBox!.height).toBeGreaterThan(collapsedPanelBox!.height)
    expect(expandedResultsBox!.y).toBeGreaterThan(expandedPanelBox!.y + expandedPanelBox!.height)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)
  }
})

test('transaction dynamics keeps shared back to top and excludes target footer blocks', async ({ page }) => {
  await page.goto('/transaction-dynamics')

  await expect(page.getByText('关于我们', { exact: true })).toHaveCount(0)
  await expect(page.getByText('监督投诉', { exact: true })).toHaveCount(0)
  const backTop = page.getByTestId('back-top')
  await expect(backTop).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300)

  await backTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
})
