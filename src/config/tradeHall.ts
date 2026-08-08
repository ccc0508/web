export type TradeHallPage = 'trade-hall' | 'member' | 'disclaimer' | 'agreement' | 'guide'

export type TradeModeId =
  | 'online-bid'
  | 'online-bid-batch'
  | 'simple-bid'
  | 'public-negotiation'
  | 'priced-rental'
  | 'written-bid'

export interface TradeMode {
  id: TradeModeId
  label: string
  transactionTypes: string[]
  statusLabel: string
  statuses: string[]
  negotiationMethods?: string[]
}

export interface TradeFilterState {
  district: string
  assetCategory: string
  transactionType: string
  status: string
  negotiationMethod: string
  price: string
  customPriceStart: string
  customPriceEnd: string
  tradeTime: string
  customTradeTimeStart: string
  customTradeTimeEnd: string
  publishDate: string
  customPublishDateStart: string
  customPublishDateEnd: string
  keyword: string
}

export const districtOptions = ['不限', '禅城区', '南海区', '顺德区', '高明区', '三水区']

export const assetCategoryOptions = [
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
]

export const priceOptions = ['不限', '0-1999', '2000-4999', '5000-9999', '10000以上', '自定义金额']

export const timeOptions = ['不限', '近一周内', '近两周内', '近一个月内', '自定义日期']

const publicTransactionTypes = ['不限', '出租', '出让', '发包', '其他']

const publicStatuses = [
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
]

const publicMode = (id: TradeModeId, label: string): TradeMode => ({
  id,
  label,
  transactionTypes: publicTransactionTypes,
  statusLabel: '交易状态',
  statuses: publicStatuses,
})

export const tradeModes: TradeMode[] = [
  publicMode('online-bid', '网上竞投'),
  publicMode('online-bid-batch', '网上竞投（批量）'),
  publicMode('simple-bid', '简易竞投'),
  {
    id: 'public-negotiation',
    label: '公开协商',
    transactionTypes: ['不限', '出租', '出让', '发包', '入股（合作）', '出租+分成', '其他'],
    statusLabel: '协商状态',
    statuses: [
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
    ],
    negotiationMethods: ['不限', '遴选', '一对一磋商'],
  },
  {
    id: 'priced-rental',
    label: '定价招租',
    transactionTypes: publicTransactionTypes,
    statusLabel: '交易状态',
    statuses: ['不限', '即将报名', '正在报名', '结束招租', '完成交易', '流拍', '弃拍', '项目终止'],
  },
  publicMode('written-bid', '书面竞投'),
]

export const createDefaultFilterState = (): TradeFilterState => ({
  district: '不限',
  assetCategory: '不限',
  transactionType: '不限',
  status: '不限',
  negotiationMethod: '不限',
  price: '不限',
  customPriceStart: '',
  customPriceEnd: '',
  tradeTime: '不限',
  customTradeTimeStart: '',
  customTradeTimeEnd: '',
  publishDate: '不限',
  customPublishDateStart: '',
  customPublishDateEnd: '',
  keyword: '',
})
