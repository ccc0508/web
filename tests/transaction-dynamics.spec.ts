import { expect, test, type Page } from '@playwright/test'

const districtOptions = ['不限', '禅城区', '南海区', '顺德区', '高明区', '三水区']

const townOptions = [
  '不限', '石湾镇街道', '张槎街道', '祖庙街道', '南庄镇', '桂城街道', '九江镇', '西樵镇',
  '丹灶镇', '狮山镇', '大沥镇', '里水镇', '大良街道', '伦教街道', '陈村镇', '北滘镇',
  '乐从镇', '勒流街道', '龙江镇', '杏坛镇', '均安镇', '容桂街道', '荷城街道', '杨和镇',
  '明城镇', '更合镇', '西南街道', '大塘镇', '乐平镇', '白坭镇', '芦苞镇', '云东海街道',
  '南山镇',
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

  await expectOptions(page, '区', districtOptions)
  await expectOptions(page, '镇街', townOptions)
  await expectOptions(page, '资产类别', assetOptions)
  await expectOptions(page, '交易模式', tradeModeOptions)
  await expectOptions(page, '公告类型', announcementOptions)

  await expectSelected(page, '区', '不限')
  await expectSelected(page, '镇街', '不限')
  await expectSelected(page, '资产类别', '不限')
  await expectSelected(page, '交易模式', '不限')
  await expectSelected(page, '公告类型', '交易公告')
  await expect(page.getByTestId('transaction-selected-conditions')).toHaveText('已选条件：')

  const results = page.getByTestId('transaction-dynamics-results')
  await expect(results.getByTestId('coming-soon')).toHaveCount(1)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  expect(referenceRequests).toEqual([])
})

test('filters stay local, keep towns complete, and reset to screenshot defaults', async ({ page }) => {
  await page.goto('/transaction-dynamics')
  const originalUrl = page.url()
  const panel = page.getByTestId('transaction-filter-panel')
  const conditions = page.getByTestId('transaction-selected-conditions')

  await group(page, '区').getByRole('radio', { name: '南海区', exact: true }).click()
  await group(page, '镇街').getByRole('radio', { name: '桂城街道', exact: true }).click()
  await group(page, '资产类别').getByRole('radio', { name: '商铺', exact: true }).click()
  await group(page, '交易模式').getByRole('radio', { name: '公开协商', exact: true }).click()
  await group(page, '公告类型').getByRole('radio', { name: '结果公示', exact: true }).click()

  await expect(panel).toHaveAttribute('data-district', '南海区')
  await expect(panel).toHaveAttribute('data-town', '桂城街道')
  await expect(panel).toHaveAttribute('data-asset-category', '商铺')
  await expect(panel).toHaveAttribute('data-trade-mode', '公开协商')
  await expect(panel).toHaveAttribute('data-announcement-type', '结果公示')
  await expect(group(page, '镇街').getByRole('radio')).toHaveCount(townOptions.length)
  for (const condition of [
    '区：南海区', '镇街：桂城街道', '资产类别：商铺', '交易模式：公开协商', '公告类型：结果公示',
  ]) {
    await expect(conditions.getByText(condition, { exact: true })).toBeVisible()
  }
  await expect(page).toHaveURL(originalUrl)
  await expect(page.getByTestId('transaction-dynamics-results').getByTestId('coming-soon')).toHaveCount(1)

  await page.getByRole('button', { name: '全部撤销', exact: true }).click()
  await expect(panel).toHaveAttribute('data-district', '不限')
  await expect(panel).toHaveAttribute('data-town', '不限')
  await expect(panel).toHaveAttribute('data-asset-category', '不限')
  await expect(panel).toHaveAttribute('data-trade-mode', '不限')
  await expect(panel).toHaveAttribute('data-announcement-type', '交易公告')
  await expect(conditions).toHaveText('已选条件：')
  await expect(page).toHaveURL(originalUrl)
})

test('more options stays collapsed and all interactions leave the result unchanged', async ({ page }) => {
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
  await expect(moreButton).toHaveAttribute('aria-expanded', 'false')
  await expect(panel.locator('input, select, textarea')).toHaveCount(0)
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

    const panelBox = await page.getByTestId('transaction-filter-panel').boundingBox()
    const resultsBox = await page.getByTestId('transaction-dynamics-results').boundingBox()
    expect(panelBox).not.toBeNull()
    expect(resultsBox).not.toBeNull()
    expect(resultsBox!.y).toBeGreaterThan(panelBox!.y + panelBox!.height)
    await expect(group(page, '镇街').getByRole('radio', { name: '南山镇', exact: true })).toBeVisible()
    await expect(
      group(page, '资产类别').getByRole('radio', { name: '其他固定资产', exact: true }),
    ).toBeVisible()

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
