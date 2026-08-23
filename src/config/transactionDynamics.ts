export interface TransactionDynamicsFilterState {
  city: string
  assetCategory: string
  tradeMode: string
  announcementType: string
  amount: string
  customAmountStart: string
  customAmountEnd: string
  publishDate: string
  customPublishDateStart: string
  customPublishDateEnd: string
  keyword: string
  confirmedKeyword: string
}

export const transactionAssetCategoryOptions = [
  '不限',
  '耕地',
  '园地',
  '林地',
  '草地',
  '农田水利设施用地（沟渠）',
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
] as const

export const transactionTradeModeOptions = [
  '不限',
  '网上竞投',
  '公开协商',
  '简易竞投',
  '网上竞投（批量）',
  '定价招租',
  '书面竞投',
] as const

export const transactionAnnouncementOptions = [
  '交易公告',
  '结果公示',
  '成交公告',
  '终止公告',
  '失败公告',
] as const

export const transactionAmountOptions = [
  '不限',
  '0-1999',
  '2000-4999',
  '5000-9999',
  '10000以上',
  '自定义金额',
] as const

export const transactionPublishDateOptions = [
  '不限',
  '近一周内',
  '近两周内',
  '近一个月内',
  '自定义日期',
] as const

export const createDefaultTransactionDynamicsState = (): TransactionDynamicsFilterState => ({
  city: '不限',
  assetCategory: '不限',
  tradeMode: '不限',
  announcementType: '交易公告',
  amount: '不限',
  customAmountStart: '',
  customAmountEnd: '',
  publishDate: '不限',
  customPublishDateStart: '',
  customPublishDateEnd: '',
  keyword: '',
  confirmedKeyword: '',
})
