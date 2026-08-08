import { expect, test, type Page } from '@playwright/test'

const tradeHallContent = (page: Page) => page.getByTestId('trade-hall-content')
const tradeHallResults = (page: Page) => page.getByTestId('trade-hall-results')
const tradeHallAux = (page: Page) => page.getByTestId('trade-hall-aux-page')
const tradeHallNav = (page: Page) => page.getByTestId('trade-hall-nav')
const filterPanel = (page: Page) => page.getByTestId('trade-hall-filter-panel')
const selectedConditions = (page: Page) => page.getByTestId('trade-hall-selected')

const modeLabels = ['网上竞投', '网上竞投（批量）', '简易竞投', '公开协商', '定价招租', '书面竞投']

const expectComingSoon = async (container: ReturnType<typeof tradeHallResults>) => {
  await expect(container.getByText('敬请期待...', { exact: true })).toBeVisible()
  await expect(container.getByText('Coming soon...', { exact: true })).toBeVisible()
}

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

test('trade hall secondary navigation switches pages and keeps the home entry', async ({ page }) => {
  await page.goto('/trade-hall')

  const navigation = tradeHallNav(page)
  await expect(navigation.locator('button')).toHaveText([
    '交易大厅',
    '会员中心',
    '免责声明',
    '服务协议',
    '交易指南',
  ])

  const hallItem = navigation.getByRole('button', { name: '交易大厅', exact: true })
  await expect(hallItem).toHaveAttribute('aria-current', 'page')
  await expect(hallItem).toHaveCSS('background-color', 'rgb(246, 185, 39)')

  const originalUrl = page.url()
  for (const label of ['会员中心', '免责声明', '服务协议', '交易指南']) {
    const item = navigation.getByRole('button', { name: label, exact: true })
    await item.click()
    await expect(page).toHaveURL(originalUrl)
    await expect(item).toHaveAttribute('aria-current', 'page')
    await expect(item).toHaveCSS('background-color', 'rgb(246, 185, 39)')
    await expect(hallItem).not.toHaveAttribute('aria-current', 'page')
  }

  await hallItem.click()
  await expect(hallItem).toHaveAttribute('aria-current', 'page')
  await expect(tradeHallContent(page)).toBeVisible()

  const platformLink = navigation.getByRole('link', {
    name: '>> 佛山市农村集体“三资”智慧云平台',
    exact: true,
  })
  await expect(platformLink).toBeVisible()
  await platformLink.click()
  await expect(page).toHaveURL('http://127.0.0.1:4173/')
})

test('trade hall auxiliary pages show only the coming soon placeholder', async ({ page }) => {
  await page.goto('/trade-hall')

  for (const label of ['会员中心', '免责声明', '服务协议', '交易指南']) {
    await tradeHallNav(page).getByRole('button', { name: label, exact: true }).click()
    await expect(tradeHallContent(page)).toBeHidden()
    await expect(tradeHallAux(page)).toBeVisible()
    await expectComingSoon(tradeHallAux(page))
    await expect(tradeHallAux(page).getByText('暂无公开数据', { exact: true })).toHaveCount(0)
  }

  await tradeHallNav(page).getByRole('button', { name: '交易大厅', exact: true }).click()
  await expect(tradeHallContent(page)).toBeVisible()
  await expect(tradeHallAux(page)).toBeHidden()
})

test('trade hall bidding process shows eight steps in order with connecting arrows', async ({ page }) => {
  await page.goto('/trade-hall')

  const process = page.getByTestId('trade-hall-process')
  await expect(process.getByRole('heading', { name: '竞投流程', exact: true })).toBeVisible()
  await expect(process.locator('.trade-process__step')).toHaveCount(8)
  await expect(process.locator('.trade-process__arrow')).toHaveCount(7)
  await expect(process.locator('.trade-process__icon').first()).toHaveCSS(
    'background-color',
    'rgb(255, 133, 139)',
  )
  await expect(process.locator('.trade-process__label')).toHaveText([
    '阅读公告',
    '报名获取保证金账户',
    '缴纳交易保证金',
    '资格审核、优先权审核',
    '出价竞投',
    '结果公示',
    '合同签订',
    '交易结束',
  ])
  await expect(process.locator('.trade-process__arrow').first()).toHaveCSS('color', 'rgb(239, 74, 44)')
})

test('trade hall modes show six tabs in order with a static sort control', async ({ page }) => {
  await page.goto('/trade-hall')

  const tabs = page.getByRole('tablist', { name: '交易模式' }).getByRole('tab')
  await expect(tabs).toHaveText(modeLabels)

  await expect(page.getByRole('tab', { name: '网上竞投', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(page.getByRole('tab', { name: '网上竞投', exact: true })).toHaveCSS(
    'background-color',
    'rgb(221, 24, 13)',
  )
  await expect(page.getByRole('tab', { name: '公开协商', exact: true })).toHaveAttribute(
    'aria-selected',
    'false',
  )
  await expect(page.getByRole('tab', { name: '公开协商', exact: true })).toHaveCSS(
    'background-color',
    'rgb(253, 231, 226)',
  )
  await expect(page.getByRole('tab', { name: '公开协商', exact: true })).toHaveCSS(
    'color',
    'rgb(237, 56, 46)',
  )

  const sortControl = page.getByTestId('trade-hall-sort')
  await expect(sortControl).toHaveText('默认排序')
  await expect(sortControl).toHaveAttribute('aria-disabled', 'true')
  await expect(sortControl).toHaveCSS('color', 'rgb(196, 200, 207)')
})

test('all six trade modes are switchable with selected state moving', async ({ page }) => {
  await page.goto('/trade-hall')

  for (const label of modeLabels) {
    const tab = page.getByRole('tab', { name: label, exact: true })
    await tab.click()
    await expect(tab).toHaveAttribute('aria-selected', 'true')
    await expect(tab).toHaveCSS('background-color', 'rgb(221, 24, 13)')
    await expectComingSoon(tradeHallResults(page))
  }
})

test('four public bidding modes share the complete common filter set', async ({ page }) => {
  await page.goto('/trade-hall')

  expect(
    await filterPanel(page)
      .locator('[role="radiogroup"]')
      .evaluateAll((groups) => groups.map((group) => group.getAttribute('aria-label'))),
  ).toEqual(['交易类别', '交易状态', '所属区', '资产类别', '交易底价', '交易时间', '发布日期'])

  const verifyMode = async (label: string) => {
    await page.getByRole('tab', { name: label, exact: true }).click()
    await expect(
      page.getByRole('radiogroup', { name: '所属区' }).locator('[role="radio"]'),
    ).toHaveText(['不限', '禅城区', '南海区', '顺德区', '高明区', '三水区'])
    await expect(
      page.getByRole('radiogroup', { name: '资产类别' }).locator('[role="radio"]'),
    ).toHaveText([
      '不限',
      '耕地',
      '园地',
      '林地',
      '草地',
      '农田水利设施用地 (沟渠)',
      '养殖水面(坑塘水面)',
      '其他农用地',
      '未利用地',
      '“四荒”地',
      '其他土地资产',
      '商铺',
      '厂房',
      '仓库',
      '办公楼',
      '市场',
      '临时建筑',
      '商住楼',
      '其他物业',
      '其他固定资产',
    ])
    await expect(
      page.getByRole('radiogroup', { name: '交易类别' }).locator('[role="radio"]'),
    ).toHaveText(['不限', '出租', '出让', '发包', '其他'])
    await expect(
      page.getByRole('radiogroup', { name: '交易状态' }).locator('[role="radio"]'),
    ).toHaveText([
      '不限',
      '即将报名',
      '正在报名',
      '即将竞投',
      '正在竞投',
      '结束竞投',
      '完成交易',
      '流拍',
      '弃拍',
      '异议',
      '项目终止',
    ])
    await expect(page.getByRole('radiogroup', { name: '协商方式' })).toHaveCount(0)
    await expect(
      page.getByRole('radiogroup', { name: '交易底价' }).locator('[role="radio"]'),
    ).toHaveText(['不限', '0-1999', '2000-4999', '5000-9999', '10000以上', '自定义金额'])
    await expect(
      page.getByRole('radiogroup', { name: '交易时间' }).locator('[role="radio"]'),
    ).toHaveText(['不限', '近一周内', '近两周内', '近一个月内', '自定义日期'])
    await expect(
      page.getByRole('radiogroup', { name: '发布日期' }).locator('[role="radio"]'),
    ).toHaveText(['不限', '近一周内', '近两周内', '近一个月内', '自定义日期'])
  }

  for (const label of ['网上竞投', '网上竞投（批量）', '简易竞投', '书面竞投']) {
    await verifyMode(label)
  }
})

test('public negotiation mode shows negotiation-specific filters', async ({ page }) => {
  await page.goto('/trade-hall')

  await page.getByRole('tab', { name: '公开协商', exact: true }).click()
  await expect(
    page.getByRole('radiogroup', { name: '交易类别' }).locator('[role="radio"]'),
  ).toHaveText(['不限', '出租', '出让', '发包', '入股（合作）', '出租+分成', '其他'])
  await expect(
    page.getByRole('radiogroup', { name: '协商状态' }).locator('[role="radio"]'),
  ).toHaveText([
    '不限',
    '正在报名',
    '即将协商',
    '协商中',
    '结束协商',
    '完成交易',
    '流拍',
    '弃拍',
    '异议',
    '项目终止',
  ])
  await expect(
    page.getByRole('radiogroup', { name: '协商方式' }).locator('[role="radio"]'),
  ).toHaveText(['不限', '遴选', '一对一磋商'])
  await expect(page.getByRole('radiogroup', { name: '交易状态' })).toHaveCount(0)
})

test('priced rental mode shows rental-specific statuses', async ({ page }) => {
  await page.goto('/trade-hall')

  await page.getByRole('tab', { name: '定价招租', exact: true }).click()
  await expect(
    page.getByRole('radiogroup', { name: '交易类别' }).locator('[role="radio"]'),
  ).toHaveText(['不限', '出租', '出让', '发包', '其他'])
  await expect(
    page.getByRole('radiogroup', { name: '交易状态' }).locator('[role="radio"]'),
  ).toHaveText(['不限', '即将报名', '正在报名', '结束招租', '完成交易', '流拍', '弃拍', '项目终止'])
  await expect(page.getByRole('radiogroup', { name: '协商方式' })).toHaveCount(0)
  await expect(page.getByRole('radiogroup', { name: '协商状态' })).toHaveCount(0)
})

test('filter options are single-select and selected conditions stay in sync', async ({ page }) => {
  await page.goto('/trade-hall')

  const district = page.getByRole('radiogroup', { name: '所属区' })
  await expect(district.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  )

  await district.getByRole('radio', { name: '南海区', exact: true }).click()
  await expect(district.getByRole('radio', { name: '南海区', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  )
  await expect(district.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute(
    'aria-checked',
    'false',
  )
  await expect(district.getByRole('radio', { name: '南海区', exact: true })).toHaveCSS(
    'background-color',
    'rgb(239, 57, 47)',
  )

  await district.getByRole('radio', { name: '顺德区', exact: true }).click()
  await expect(district.getByRole('radio', { name: '南海区', exact: true })).toHaveAttribute(
    'aria-checked',
    'false',
  )
  await expect(district.getByRole('radio', { name: '顺德区', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  )
  await expect(selectedConditions(page)).toContainText('所属区：顺德区')

  await page.getByRole('radiogroup', { name: '资产类别' }).getByRole('radio', { name: '耕地', exact: true }).click()
  await page.getByRole('radiogroup', { name: '交易类别' }).getByRole('radio', { name: '出租', exact: true }).click()
  await page.getByRole('radiogroup', { name: '交易状态' }).getByRole('radio', { name: '正在报名', exact: true }).click()
  await expect(selectedConditions(page)).toContainText('资产类别：耕地')
  await expect(selectedConditions(page)).toContainText('交易类别：出租')
  await expect(selectedConditions(page)).toContainText('交易状态：正在报名')

  const tradeTime = page.getByRole('radiogroup', { name: '交易时间' })
  await tradeTime.getByRole('radio', { name: '近一周内', exact: true }).click()
  await expect(selectedConditions(page)).toContainText('交易时间：近一周内')
  await expect(selectedConditions(page)).not.toContainText('交易时间：自定义日期')

  const publishDate = page.getByRole('radiogroup', { name: '发布日期' })
  await publishDate.getByRole('radio', { name: '近两周内', exact: true }).click()
  await expect(selectedConditions(page)).toContainText('发布日期：近两周内')
  await expect(selectedConditions(page)).not.toContainText('发布日期：自定义日期')
})

test('clear restores the default filter state', async ({ page }) => {
  await page.goto('/trade-hall')

  const district = page.getByRole('radiogroup', { name: '所属区' })
  const priceGroup = page.getByRole('radiogroup', { name: '交易底价' })
  await district.getByRole('radio', { name: '南海区', exact: true }).click()
  await page.getByRole('radiogroup', { name: '交易类别' }).getByRole('radio', { name: '出租', exact: true }).click()
  await priceGroup.getByRole('radio', { name: '自定义金额', exact: true }).click()
  await priceGroup.getByLabel('起始金额').fill('100')
  await priceGroup.getByLabel('结束金额').fill('5000')
  await page.getByRole('radiogroup', { name: '交易时间' }).getByRole('radio', { name: '自定义日期', exact: true }).click()
  await page.getByLabel('关键字输入').fill('鱼塘')

  await expect(selectedConditions(page)).toContainText('南海区')
  await filterPanel(page).getByRole('button', { name: '清除', exact: true }).click()

  await expect(district.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute('aria-checked', 'true')
  await expect(district.getByRole('radio', { name: '南海区', exact: true })).toHaveAttribute('aria-checked', 'false')
  await expect(priceGroup.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByLabel('起始金额')).toHaveValue('')
  await expect(page.getByLabel('结束金额')).toHaveValue('')
  await expect(page.getByLabel('关键字输入')).toHaveValue('')
  await expect(selectedConditions(page)).not.toContainText('南海区')
  await expect(selectedConditions(page)).not.toContainText('自定义金额')
  await expect(selectedConditions(page)).not.toContainText('关键字')
})

test('collapse hides the filter rows and expand restores them', async ({ page }) => {
  await page.goto('/trade-hall')

  const body = filterPanel(page).locator('.filter-panel__body')
  await expect(body).toBeVisible()

  await filterPanel(page).getByRole('button', { name: '收起', exact: true }).click()
  await expect(body).toBeHidden()
  await expect(filterPanel(page).getByRole('button', { name: '展开', exact: true })).toBeVisible()

  await filterPanel(page).getByRole('button', { name: '展开', exact: true }).click()
  await expect(body).toBeVisible()
  await expect(filterPanel(page).getByRole('button', { name: '收起', exact: true })).toBeVisible()
})

test('custom amount keeps local state without side effects', async ({ page }) => {
  await page.goto('/trade-hall')
  const originalUrl = page.url()

  const priceGroup = page.getByRole('radiogroup', { name: '交易底价' })
  await priceGroup.getByRole('radio', { name: '自定义金额', exact: true }).click()
  const start = priceGroup.getByLabel('起始金额')
  const end = priceGroup.getByLabel('结束金额')
  await expect(start).toBeVisible()
  await expect(priceGroup.getByText('-', { exact: true })).toBeVisible()
  await start.fill('100')
  await end.fill('5000')
  await priceGroup.getByRole('button', { name: '确定', exact: true }).click()

  await expect(start).toHaveValue('100')
  await expect(end).toHaveValue('5000')
  await expect(selectedConditions(page)).toContainText('交易底价：自定义金额')
  await expect(page).toHaveURL(originalUrl)
  await expectComingSoon(tradeHallResults(page))
})

test('custom trade date and publish date keep local state', async ({ page }) => {
  await page.goto('/trade-hall')
  const originalUrl = page.url()

  const tradeTimeGroup = page.getByRole('radiogroup', { name: '交易时间' })
  await tradeTimeGroup.getByRole('radio', { name: '自定义日期', exact: true }).click()
  const tradeStart = tradeTimeGroup.getByLabel('交易开始日期')
  const tradeEnd = tradeTimeGroup.getByLabel('交易结束日期')
  await expect(tradeStart).toBeVisible()
  await tradeStart.fill('2026-08-01')
  await tradeEnd.fill('2026-08-31')
  await tradeTimeGroup.getByRole('button', { name: '确定', exact: true }).click()
  await expect(tradeStart).toHaveValue('2026-08-01')
  await expect(tradeEnd).toHaveValue('2026-08-31')
  await expect(selectedConditions(page)).toContainText('交易时间：自定义日期')

  const publishGroup = page.getByRole('radiogroup', { name: '发布日期' })
  await publishGroup.getByRole('radio', { name: '自定义日期', exact: true }).click()
  const publishStart = publishGroup.getByLabel('发布开始日期')
  const publishEnd = publishGroup.getByLabel('发布结束日期')
  await publishStart.fill('2026-07-01')
  await publishEnd.fill('2026-07-31')
  await publishGroup.getByRole('button', { name: '确定', exact: true }).click()
  await expect(publishStart).toHaveValue('2026-07-01')
  await expect(publishEnd).toHaveValue('2026-07-31')
  await expect(selectedConditions(page)).toContainText('发布日期：自定义日期')
  await expect(page).toHaveURL(originalUrl)
  await expectComingSoon(tradeHallResults(page))
})

test('keyword input keeps local state', async ({ page }) => {
  await page.goto('/trade-hall')
  const originalUrl = page.url()

  const keywordInput = page.getByLabel('关键字输入')
  await keywordInput.fill('鱼塘')
  await page.getByRole('group', { name: '关键字' }).getByRole('button', { name: '确定', exact: true }).click()

  await expect(keywordInput).toHaveValue('鱼塘')
  await expect(selectedConditions(page)).toContainText('关键字：鱼塘')
  await expect(page).toHaveURL(originalUrl)
  await expectComingSoon(tradeHallResults(page))
})

test('switching modes resets every filter and custom input', async ({ page }) => {
  await page.goto('/trade-hall')

  const district = page.getByRole('radiogroup', { name: '所属区' })
  const priceGroup = page.getByRole('radiogroup', { name: '交易底价' })
  await district.getByRole('radio', { name: '南海区', exact: true }).click()
  await priceGroup.getByRole('radio', { name: '自定义金额', exact: true }).click()
  await priceGroup.getByLabel('起始金额').fill('100')
  await priceGroup.getByLabel('结束金额').fill('200')
  await page.getByLabel('关键字输入').fill('鱼塘')
  await expect(selectedConditions(page)).toContainText('南海区')

  await page.getByRole('tab', { name: '公开协商', exact: true }).click()

  await expect(district.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute('aria-checked', 'true')
  await expect(district.getByRole('radio', { name: '南海区', exact: true })).toHaveAttribute('aria-checked', 'false')
  await expect(priceGroup.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute('aria-checked', 'true')
  await expect(page.getByLabel('起始金额')).toHaveValue('')
  await expect(page.getByLabel('结束金额')).toHaveValue('')
  await expect(page.getByLabel('关键字输入')).toHaveValue('')
  await expect(selectedConditions(page)).not.toContainText('南海区')
  await expect(selectedConditions(page)).not.toContainText('自定义金额')
  await expect(selectedConditions(page)).not.toContainText('关键字')
  await expect(page.getByRole('radiogroup', { name: '协商方式' })).toBeVisible()
  await expectComingSoon(tradeHallResults(page))
})

test('refreshing the page restores the default trade hall state', async ({ page }) => {
  await page.goto('/trade-hall')

  const district = page.getByRole('radiogroup', { name: '所属区' })
  await district.getByRole('radio', { name: '南海区', exact: true }).click()
  await page.getByRole('tab', { name: '公开协商', exact: true }).click()
  await page.getByLabel('关键字输入').fill('鱼塘')
  await tradeHallNav(page).getByRole('button', { name: '会员中心', exact: true }).click()

  await page.reload()

  await expect(
    tradeHallNav(page).getByRole('button', { name: '交易大厅', exact: true }),
  ).toHaveAttribute('aria-current', 'page')
  await expect(page.getByRole('tab', { name: '网上竞投', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  )
  await expect(district.getByRole('radio', { name: '不限', exact: true })).toHaveAttribute(
    'aria-checked',
    'true',
  )
  await expect(district.getByRole('radio', { name: '南海区', exact: true })).toHaveAttribute(
    'aria-checked',
    'false',
  )
  await expect(page.getByLabel('关键字输入')).toHaveValue('')
  await expect(selectedConditions(page)).not.toContainText('南海区')
})

test('results always show coming soon and never real project data', async ({ page }) => {
  await page.goto('/trade-hall')

  for (const label of modeLabels) {
    await page.getByRole('tab', { name: label, exact: true }).click()
    await expectComingSoon(tradeHallResults(page))
  }

  await page.getByRole('radiogroup', { name: '所属区' }).getByRole('radio', { name: '顺德区', exact: true }).click()
  await page.getByRole('radiogroup', { name: '资产类别' }).getByRole('radio', { name: '厂房', exact: true }).click()
  await page.getByRole('radiogroup', { name: '交易底价' }).getByRole('radio', { name: '10000以上', exact: true }).click()
  await page.getByLabel('关键字输入').fill('鱼塘')
  await expectComingSoon(tradeHallResults(page))

  const results = tradeHallResults(page)
  await expect(results.locator('img')).toHaveCount(0)
  await expect(results.locator('a')).toHaveCount(0)
  await expect(results.locator('[class*="pagination" i], .el-pagination')).toHaveCount(0)
  await expect(page.getByText('暂无公开数据', { exact: true })).toHaveCount(0)
  await expect(page.getByText(/共\s*\d+\s*条/)).toHaveCount(0)
})

test('trade platform pages never show QR codes or scan entries', async ({ page }) => {
  await page.goto('/trade-hall')

  for (const label of ['会员中心', '免责声明', '服务协议', '交易指南']) {
    await tradeHallNav(page).getByRole('button', { name: label, exact: true }).click()
    await expect(page.getByText(/二维码|扫码|小程序码/)).toHaveCount(0)
  }

  await tradeHallNav(page).getByRole('button', { name: '交易大厅', exact: true }).click()
  for (const label of modeLabels) {
    await page.getByRole('tab', { name: label, exact: true }).click()
    await expect(page.getByText(/二维码|扫码|小程序码/)).toHaveCount(0)
  }
  await expect(page.locator('img[src*="qr" i], img[src*="code" i]')).toHaveCount(0)
})

test('trade hall interactions never change the URL', async ({ page }) => {
  await page.goto('/trade-hall')
  const originalUrl = page.url()

  await page.getByRole('radiogroup', { name: '所属区' }).getByRole('radio', { name: '南海区', exact: true }).click()
  await page.getByRole('radiogroup', { name: '交易底价' }).getByRole('radio', { name: '自定义金额', exact: true }).click()
  await page.getByLabel('起始金额').fill('100')
  await page.getByRole('radiogroup', { name: '交易时间' }).getByRole('radio', { name: '自定义日期', exact: true }).click()
  await page.getByLabel('关键字输入').fill('鱼塘')
  await page.getByRole('tab', { name: '公开协商', exact: true }).click()
  await filterPanel(page).getByRole('button', { name: '清除', exact: true }).click()
  await tradeHallNav(page).getByRole('button', { name: '会员中心', exact: true }).click()
  await tradeHallNav(page).getByRole('button', { name: '交易大厅', exact: true }).click()

  await expect(page).toHaveURL(originalUrl)
})

test('trade hall never calls reference or business APIs', async ({ page }) => {
  const blockedRequests: string[] = []
  page.on('request', (request) => {
    const url = request.url()
    if (
      !url.startsWith('http://127.0.0.1:4173') ||
      url.includes('3z.fsny.foshan.gov.cn') ||
      url.includes('/api/')
    ) {
      blockedRequests.push(url)
    }
  })

  await page.goto('/trade-hall')
  for (const label of modeLabels) {
    await page.getByRole('tab', { name: label, exact: true }).click()
  }
  await page.getByRole('radiogroup', { name: '所属区' }).getByRole('radio', { name: '顺德区', exact: true }).click()
  await page.getByRole('radiogroup', { name: '交易底价' }).getByRole('radio', { name: '自定义金额', exact: true }).click()
  await page.getByLabel('起始金额').fill('100')
  await page.getByLabel('关键字输入').fill('鱼塘')
  await page
    .getByRole('radiogroup', { name: '交易底价' })
    .getByRole('button', { name: '确定', exact: true })
    .click()
  await tradeHallNav(page).getByRole('button', { name: '免责声明', exact: true }).click()
  await tradeHallNav(page).getByRole('button', { name: '交易大厅', exact: true }).click()

  expect(blockedRequests).toEqual([])
})

test('trade hall has no horizontal overflow at desktop widths', async ({ page }) => {
  for (const width of [1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/trade-hall')

    const metrics = await page.evaluate(() => ({
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(metrics.documentScrollWidth, `${width}px document overflow`).toBeLessThanOrEqual(
      metrics.viewportWidth + 1,
    )
    expect(metrics.bodyScrollWidth, `${width}px body overflow`).toBeLessThanOrEqual(
      metrics.viewportWidth + 1,
    )

    for (const testId of [
      'trade-hall-nav',
      'trade-hall-process',
      'trade-hall-modes',
      'trade-hall-filter-panel',
      'trade-hall-results',
    ]) {
      const box = await page.getByTestId(testId).boundingBox()
      expect(box, `${testId} should render at ${width}px`).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1)
    }

    const clippedRows = await page.locator('.filter-group').evaluateAll((rows) =>
      rows
        .map((row) => {
          const element = row as HTMLElement
          return {
            label: element.getAttribute('aria-label') ?? '',
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          }
        })
        .filter((row) => row.scrollWidth > row.clientWidth + 1),
    )
    expect(clippedRows, `${width}px filter rows must not clip`).toEqual([])

    const clippedOptions = await page.locator('.filter-group__option').evaluateAll((options) =>
      options.filter(
        (option) =>
          (option as HTMLElement).scrollWidth > (option as HTMLElement).clientWidth + 1,
      ),
    )
    expect(clippedOptions, `${width}px filter options must stay readable`).toEqual([])

    const overlappingOptions = await page.evaluate(() => {
      const rects = Array.from(
        document.querySelectorAll<HTMLElement>('.filter-group__option'),
      ).map((element) => element.getBoundingClientRect())
      const overlaps: string[] = []
      for (let i = 0; i < rects.length; i += 1) {
        for (let j = i + 1; j < rects.length; j += 1) {
          const a = rects[i]
          const b = rects[j]
          const width = Math.min(a.right, b.right) - Math.max(a.left, b.left)
          const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
          if (width > 0.5 && height > 0.5) {
            overlaps.push(`option ${i} overlaps option ${j}`)
          }
        }
      }
      return overlaps
    })
    expect(overlappingOptions, `${width}px filter options must not overlap`).toEqual([])

    const tabsBox = await page.getByRole('tablist', { name: '交易模式' }).boundingBox()
    const sortBox = await page.getByTestId('trade-hall-sort').boundingBox()
    expect(tabsBox).not.toBeNull()
    expect(sortBox).not.toBeNull()
    expect(tabsBox!.x + tabsBox!.width, `${width}px mode tabs must not overlap sort`).toBeLessThanOrEqual(
      sortBox!.x,
    )

    await tradeHallNav(page).getByRole('button', { name: '会员中心', exact: true }).click()
    const auxMetrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(auxMetrics.scrollWidth, `${width}px auxiliary page overflow`).toBeLessThanOrEqual(
      auxMetrics.viewportWidth + 1,
    )
    await tradeHallNav(page).getByRole('button', { name: '交易大厅', exact: true }).click()

    await expect(
      page.getByRole('heading', { name: '佛山市农村集体“三资”智慧云平台交易系统', exact: true }),
    ).toBeVisible()
  }
})

test('back to top button stays fixed and scrolls smoothly to the top', async ({ page }) => {
  await page.goto('/trade-hall')

  const backTop = page.getByTestId('back-top')
  await expect(backTop).toBeVisible()
  await expect(backTop).toHaveText('顶部')
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior))
    .toBe('smooth')

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(300)

  const viewport = page.viewportSize()
  const box = await backTop.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport!.width + 1)
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height + 1)
  expect(box!.x).toBeGreaterThan(viewport!.width - 160)

  await backTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)

  await tradeHallNav(page).getByRole('button', { name: '会员中心', exact: true }).click()
  await expect(backTop).toBeVisible()
})
