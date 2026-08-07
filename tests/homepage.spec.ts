import { expect, test } from '@playwright/test'

test('homepage renders all required static content without reference-site requests', async ({ page }) => {
  const referenceRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('3z.fsny.foshan.gov.cn')) {
      referenceRequests.push(request.url())
    }
  })

  await page.goto('/')

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

test('all non-home navigation items are inert', async ({ page }) => {
  await page.goto('/')
  const originalUrl = page.url()

  for (let index = 1; index <= 9; index += 1) {
    await page.getByTestId(`nav-${index}`).click()
    await expect(page).toHaveURL(originalUrl)
  }
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
