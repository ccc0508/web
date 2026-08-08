import { expect, test } from '@playwright/test'

test('homepage renders all required static content without reference-site requests', async ({ page }) => {
  const referenceRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('3z.fsny.foshan.gov.cn')) {
      referenceRequests.push(request.url())
    }
  })

  await page.goto('/')

  const welcomeDate = page.getByTestId('welcome-date')
  await expect(welcomeDate).toHaveText(/^\d{4}年\d{1,2}月\d{1,2}日　星期[日一二三四五六]$/)
  await expect(page.locator('.welcome-bar')).not.toContainText('农历')
  await expect(page.getByRole('heading', { name: '佛山市农村集体“三资”智慧云平台' })).toBeVisible()
  await expect(page.getByRole('img', { name: '广东省静态示意地图' })).toBeVisible()
  await expect(page.getByAltText('首页轮播占位图')).toHaveAttribute('src', '/assets/carousel-placeholder.jpg')
  await expect(page.getByText('暂无公开数据', { exact: true })).toHaveCount(5)
  await expect(page.getByText('关于我们', { exact: true })).toHaveCount(0)
  await expect(page.getByText('监督投诉', { exact: true })).toHaveCount(0)
  await expect(page.getByText('便民服务', { exact: true })).toHaveCount(0)
  await expect(page.getByText('二维码占位', { exact: true })).toHaveCount(0)
  await expect(page.getByText('信息公开', { exact: true })).toHaveCount(0)
  await expect(page.getByText('办事指南', { exact: true })).toHaveCount(0)

  await page.getByLabel('搜索关键词').fill('测试关键词')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await page.getByRole('button', { name: '项目地图', exact: true }).click()

  expect(referenceRequests).toEqual([])
  await expect(page).toHaveURL('http://127.0.0.1:4173/')
})

test('implemented main navigation opens local pages while unfinished items remain inert', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('nav-1').click()
  await expect(page).toHaveURL('http://127.0.0.1:4173/comprehensive-info')
  await expect(page.getByTestId('nav-1')).toHaveAttribute('aria-current', 'page')
  await expect(page.getByTestId('nav-0')).not.toHaveAttribute('aria-current')

  await page.getByTestId('nav-0').click()
  await expect(page).toHaveURL('http://127.0.0.1:4173/')
  await expect(page.getByTestId('nav-0')).toHaveAttribute('aria-current', 'page')

  const homepageUrl = page.url()

  for (let index = 2; index <= 8; index += 1) {
    await page.getByTestId(`nav-${index}`).click()
    await expect(page).toHaveURL(homepageUrl)
  }

  await page.getByTestId('nav-9').click()
  await expect(page).toHaveURL('http://127.0.0.1:4173/trade-hall')
})

test('video placeholder shows the exact unavailable message', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('video-play').click()
  await expect(page.locator('.el-message__content')).toHaveText('视频暂未接入')
})

test('information tabs switch locally and remain to the left of the video', async ({ page }) => {
  await page.goto('/')

  const labels = ['工作动态', '通知公告', '行业资讯', '警示曝光', '帮扶协作']
  for (const label of labels) {
    await expect(page.getByRole('tab', { name: label, exact: true })).toBeVisible()
  }

  const informationPanel = page.getByTestId('information-panel')
  await expect(informationPanel).toHaveAttribute('data-active-tab', '工作动态')
  await page.getByRole('tab', { name: '行业资讯', exact: true }).click()
  await expect(informationPanel).toHaveAttribute('data-active-tab', '行业资讯')
  await expect(page.getByRole('img', { name: '行业资讯图片占位' })).toBeVisible()

  const informationBox = await informationPanel.boundingBox()
  const videoBox = await page.getByTestId('video-panel').boundingBox()
  expect(informationBox).not.toBeNull()
  expect(videoBox).not.toBeNull()
  expect(informationBox!.x).toBeLessThan(videoBox!.x)
  expect(Math.abs(informationBox!.y - videoBox!.y)).toBeLessThan(2)
})

test('business sections are full-width sequential rows with local controls', async ({ page }) => {
  await page.goto('/')

  const ids = ['transaction', 'expiring', 'disclosure', 'projects']
  const sections = ids.map((id) => page.getByTestId(`business-${id}`))
  const boxes = await Promise.all(sections.map((section) => section.boundingBox()))

  for (let index = 0; index < sections.length; index += 1) {
    await expect(sections[index].getByText('暂无公开数据', { exact: true })).toHaveCount(1)
    expect(boxes[index]).not.toBeNull()
    if (index > 0) {
      expect(Math.abs(boxes[index]!.x - boxes[0]!.x)).toBeLessThan(2)
      expect(Math.abs(boxes[index]!.width - boxes[0]!.width)).toBeLessThan(2)
      expect(boxes[index]!.y).toBeGreaterThan(boxes[index - 1]!.y + boxes[index - 1]!.height)
    }
  }

  const transaction = sections[0]
  for (const label of ['交易公告', '结果公示', '成交公告', '其他公告']) {
    await expect(transaction.getByRole('tab', { name: label, exact: true })).toBeVisible()
  }
  await transaction.getByRole('tab', { name: '结果公示', exact: true }).click()
  await expect(transaction).toHaveAttribute('data-active-control', '结果公示')

  const expiring = sections[1]
  for (const label of ['一年内到期', '6个月内到期', '3个月内到期', '1个月内到期']) {
    await expect(expiring.getByRole('tab', { name: label, exact: true })).toBeVisible()
  }

  const disclosure = sections[2]
  for (const label of ['禅城区', '南海区', '顺德区', '高明区', '三水区']) {
    await expect(disclosure.getByRole('button', { name: label, exact: true })).toBeVisible()
  }
  await disclosure.getByRole('button', { name: '顺德区', exact: true }).click()
  await expect(disclosure).toHaveAttribute('data-active-control', '顺德区')
})

test('homepage keeps the shared back-to-top control fixed and working', async ({ page }) => {
  await page.goto('/')

  const backTop = page.getByTestId('back-top')
  await expect(backTop).toBeVisible()
  await expect(backTop).toHaveText('顶部')
  await expect(backTop.locator('span')).toBeAttached()

  await page.evaluate(() => window.scrollTo(0, 1000))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)

  await backTop.click()
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2)
})

test('transaction and expiring category carousels move one item and wrap', async ({ page }) => {
  await page.goto('/')

  const transaction = page.getByTestId('business-transaction')
  await expect(transaction).toHaveAttribute('data-category-offset', '0')
  await expect(transaction.getByText('商铺', { exact: true })).toBeVisible()
  await expect(transaction.getByText('商住楼', { exact: true })).toBeVisible()
  await expect(transaction.getByText('其他物业', { exact: true })).toHaveCount(0)

  await transaction.getByTestId('transaction-category-next').click()
  await expect(transaction).toHaveAttribute('data-category-offset', '1')
  await expect(transaction.getByText('商铺', { exact: true })).toHaveCount(0)
  await expect(transaction.getByText('厂房', { exact: true })).toBeVisible()
  await expect(transaction.getByText('其他物业', { exact: true })).toBeVisible()

  await transaction.getByTestId('transaction-category-previous').click()
  await expect(transaction).toHaveAttribute('data-category-offset', '0')
  await expect(transaction.getByText('商铺', { exact: true })).toBeVisible()

  await transaction.getByTestId('transaction-category-previous').click()
  await expect(transaction).toHaveAttribute('data-category-offset', '9')
  await expect(transaction.getByText('耕地', { exact: true })).toBeVisible()
  await expect(transaction.getByText('商铺', { exact: true })).toBeVisible()
  await expect(transaction.getByText('商住楼', { exact: true })).toHaveCount(0)
  await expect(transaction.getByText('暂无公开数据', { exact: true })).toHaveCount(1)

  const expiring = page.getByTestId('business-expiring')
  await expect(expiring).toHaveAttribute('data-category-offset', '0')
  await expect(expiring.getByText('林地', { exact: true })).toBeVisible()
  await expect(expiring.getByText('其他土地资产', { exact: true })).toHaveCount(0)

  await expiring.getByTestId('expiring-category-next').click()
  await expect(expiring).toHaveAttribute('data-category-offset', '1')
  await expect(expiring.getByText('林地', { exact: true })).toHaveCount(0)
  await expect(expiring.getByText('草地', { exact: true })).toBeVisible()
  await expect(expiring.getByText('其他土地资产', { exact: true })).toBeVisible()

  await expiring.getByTestId('expiring-category-previous').click()
  await expect(expiring).toHaveAttribute('data-category-offset', '0')
  await expect(expiring.getByText('林地', { exact: true })).toBeVisible()
  await expect(expiring.getByText('暂无公开数据', { exact: true })).toHaveCount(1)
})
