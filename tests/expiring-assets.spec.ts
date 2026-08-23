import { expect, test, type Page } from '@playwright/test'

const cityOptions = [
  '不限', '广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市',
  '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市',
]

const deadlineOptions = ['一年内到期', '6个月内到期', '3个月内到期', '1个月内到期']

const assetOptions = [
  '不限', '耕地', '园地', '林地', '草地', '农田水利设施用地（沟渠）', '养殖水面(坑塘水面)',
  '其他农用地', '未利用地', '“四荒”地', '其他土地资产', '商铺', '厂房', '仓库', '办公楼',
  '市场', '临时建筑', '商住楼', '其他物业', '其他固定资产',
]

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

test('expiring assets page renders complete filters and screenshot defaults', async ({ page }) => {
  const referenceRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('3z.fsny.foshan.gov.cn')) {
      referenceRequests.push(request.url())
    }
  })

  await page.goto('/expiring-assets')

  await expect(page.getByTestId('nav-3')).toHaveAttribute('aria-current', 'page')
  await expect(page.getByTestId('nav-0')).not.toHaveAttribute('aria-current')
  await expect(page.getByLabel('当前位置')).toContainText('当前位置首页/临期资产')
  await expect(page.getByText('已选条件：', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: '全部撤销', exact: true })).toBeVisible()

  await expectOptions(page, '市', cityOptions)
  await expectOptions(page, '到期期限', deadlineOptions)
  await expectOptions(page, '资产类别', assetOptions)

  await expectSelected(page, '市', '不限')
  await expectSelected(page, '到期期限', '一年内到期')
  await expectSelected(page, '资产类别', '不限')
  await expect(page.getByTestId('expiring-assets-selected-conditions')).toHaveText('已选条件：')

  const arrowPreviousText = await group(page, '资产类别')
    .locator('.compact-filter-group__tail-arrow')
    .evaluate((arrow) => arrow.previousElementSibling?.textContent?.trim())
  expect(arrowPreviousText).toBe('“四荒”地')

  const results = page.getByTestId('expiring-assets-results')
  await expect(results.getByTestId('coming-soon')).toHaveCount(1)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  expect(referenceRequests).toEqual([])
})

test('expiring asset filters stay local, keep Guangdong cities complete, and reset to defaults', async ({ page }) => {
  await page.goto('/expiring-assets')
  const requestsAfterReady: string[] = []
  page.on('request', (request) => requestsAfterReady.push(request.url()))

  const originalUrl = page.url()
  const panel = page.getByTestId('expiring-assets-filter-panel')
  const conditions = page.getByTestId('expiring-assets-selected-conditions')

  await group(page, '市').getByRole('radio', { name: '珠海市', exact: true }).click()
  await group(page, '到期期限').getByRole('radio', { name: '3个月内到期', exact: true }).click()
  await group(page, '资产类别').getByRole('radio', { name: '商铺', exact: true }).click()

  await expect(panel).toHaveAttribute('data-city', '珠海市')
  await expect(panel).toHaveAttribute('data-expiry-deadline', '3个月内到期')
  await expect(panel).toHaveAttribute('data-asset-category', '商铺')
  await expect(group(page, '市').getByRole('radio')).toHaveCount(cityOptions.length)
  for (const condition of [
    '市：珠海市', '到期期限：3个月内到期', '资产类别：商铺',
  ]) {
    await expect(conditions.getByText(condition, { exact: true })).toBeVisible()
  }
  await expect(page).toHaveURL(originalUrl)
  await expect(page.getByTestId('expiring-assets-results').getByTestId('coming-soon')).toHaveCount(1)

  await page.getByRole('button', { name: '全部撤销', exact: true }).click()
  await expect(panel).toHaveAttribute('data-city', '不限')
  await expect(panel).toHaveAttribute('data-expiry-deadline', '一年内到期')
  await expect(panel).toHaveAttribute('data-asset-category', '不限')
  await expect(conditions).toHaveText('已选条件：')
  await expect(page).toHaveURL(originalUrl)
  expect(requestsAfterReady).toEqual([])
})

test('more options preserves confirmed keyword and resets without side effects', async ({ page }) => {
  await page.goto('/expiring-assets')
  const requestsAfterReady: string[] = []
  page.on('request', (request) => requestsAfterReady.push(request.url()))

  const panel = page.getByTestId('expiring-assets-filter-panel')
  const moreButton = page.getByRole('button', { name: '更多选项(关键字)', exact: true })
  const conditions = page.getByTestId('expiring-assets-selected-conditions')
  const results = page.getByTestId('expiring-assets-results')
  const originalUrl = page.url()

  await expect(moreButton).toHaveAttribute('aria-expanded', 'false')
  await expect(panel.locator('input, select, textarea')).toHaveCount(0)
  await moreButton.click()
  await expect(moreButton).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByTestId('expiring-assets-additional-filters')).toBeVisible()

  await page.getByLabel('临期资产关键字').fill('商铺')
  await page.getByRole('group', { name: '关键字' }).getByRole('button', { name: '确定' }).click()
  await expect(conditions.getByText('关键字：商铺', { exact: true })).toBeVisible()

  await moreButton.click()
  await expect(moreButton).toHaveAttribute('aria-expanded', 'false')
  await expect(page.getByTestId('expiring-assets-additional-filters')).toHaveCount(0)
  await moreButton.click()
  await expect(page.getByLabel('临期资产关键字')).toHaveValue('商铺')
  await expect(conditions.getByText('关键字：商铺', { exact: true })).toBeVisible()

  await page.getByRole('button', { name: '全部撤销', exact: true }).click()
  await expect(moreButton).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByLabel('临期资产关键字')).toHaveValue('')
  await expect(conditions).toHaveText('已选条件：')
  await expect(page).toHaveURL(originalUrl)
  await expect(results.getByText('敬请期待...', { exact: true })).toBeVisible()
  await expect(results.locator('article, img, table, .sort, .pagination')).toHaveCount(0)
  await expect(page.getByText('暂无公开数据', { exact: true })).toHaveCount(0)
  expect(requestsAfterReady).toEqual([])
})

test('expiring assets layout has no horizontal overflow at desktop widths', async ({ page }) => {
  for (const width of [1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/expiring-assets')

    const collapsedPanelBox = await page.getByTestId('expiring-assets-filter-panel').boundingBox()
    const collapsedResultsBox = await page.getByTestId('expiring-assets-results').boundingBox()
    expect(collapsedPanelBox).not.toBeNull()
    expect(collapsedResultsBox).not.toBeNull()
    expect(collapsedResultsBox!.y).toBeGreaterThan(collapsedPanelBox!.y + collapsedPanelBox!.height)
    await expect(group(page, '市').getByRole('radio', { name: '云浮市', exact: true })).toBeVisible()
    await expect(
      group(page, '资产类别').getByRole('radio', { name: '其他固定资产', exact: true }),
    ).toBeVisible()

    const fourWastesBox = await group(page, '资产类别')
      .getByRole('radio', { name: '“四荒”地', exact: true })
      .boundingBox()
    const arrowBox = await group(page, '资产类别').locator('.compact-filter-group__tail-arrow').boundingBox()
    const secondRowBox = await group(page, '资产类别')
      .getByRole('radio', { name: '其他土地资产', exact: true })
      .boundingBox()
    expect(fourWastesBox).not.toBeNull()
    expect(arrowBox).not.toBeNull()
    expect(secondRowBox).not.toBeNull()
    expect(Math.abs(arrowBox!.y - fourWastesBox!.y)).toBeLessThan(14)
    expect(secondRowBox!.y).toBeGreaterThan(fourWastesBox!.y)

    await page.getByRole('button', { name: '更多选项(关键字)', exact: true }).click()
    await expect(page.getByTestId('expiring-assets-additional-filters')).toBeVisible()
    const expandedPanelBox = await page.getByTestId('expiring-assets-filter-panel').boundingBox()
    const expandedResultsBox = await page.getByTestId('expiring-assets-results').boundingBox()
    expect(expandedPanelBox).not.toBeNull()
    expect(expandedResultsBox).not.toBeNull()
    expect(expandedPanelBox!.height).toBeGreaterThan(collapsedPanelBox!.height)
    expect(expandedResultsBox!.y).toBeGreaterThan(expandedPanelBox!.y + expandedPanelBox!.height)

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)
  }
})

test('expiring assets keeps shared back to top and excludes target footer blocks', async ({ page }) => {
  await page.goto('/expiring-assets')

  await expect(page.getByText('关于我们', { exact: true })).toHaveCount(0)
  await expect(page.getByText('监督投诉', { exact: true })).toHaveCount(0)
  const backTop = page.getByTestId('back-top')
  await expect(backTop).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300)

  await backTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
})
