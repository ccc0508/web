export interface TransactionDynamicsFilterState {
  district: string
  town: string
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

export const transactionDistrictOptions = [
  '不限',
  '禅城区',
  '南海区',
  '顺德区',
  '高明区',
  '三水区',
] as const

export const transactionTownOptions = [
  '不限',
  '石湾镇街道',
  '张槎街道',
  '祖庙街道',
  '南庄镇',
  '桂城街道',
  '九江镇',
  '西樵镇',
  '丹灶镇',
  '狮山镇',
  '大沥镇',
  '里水镇',
  '大良街道',
  '伦教街道',
  '陈村镇',
  '北滘镇',
  '乐从镇',
  '勒流街道',
  '龙江镇',
  '杏坛镇',
  '均安镇',
  '容桂街道',
  '荷城街道',
  '杨和镇',
  '明城镇',
  '更合镇',
  '西南街道',
  '大塘镇',
  '乐平镇',
  '白坭镇',
  '芦苞镇',
  '云东海街道',
  '南山镇',
] as const

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
  district: '不限',
  town: '不限',
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
