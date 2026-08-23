export interface ExpiringAssetsFilterState {
  city: string
  expiryDeadline: string
  assetCategory: string
  keyword: string
  confirmedKeyword: string
}

export const expiringAssetsDeadlineOptions = [
  '一年内到期',
  '6个月内到期',
  '3个月内到期',
  '1个月内到期',
] as const

export const expiringAssetsCategoryOptions = [
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

export const createDefaultExpiringAssetsState = (): ExpiringAssetsFilterState => ({
  city: '不限',
  expiryDeadline: '一年内到期',
  assetCategory: '不限',
  keyword: '',
  confirmedKeyword: '',
})
