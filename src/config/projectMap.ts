/**
 * 项目地图页面 - 静态配置数据
 *
 * 所有数据均为本地静态值，不接入后台接口。
 * 筛选选项后续可按原网站整理补充。
 */

/** 广东省 21 个地级市 */
export const guangdongCities: string[] = [
  '广州市',
  '深圳市',
  '珠海市',
  '汕头市',
  '佛山市',
  '韶关市',
  '河源市',
  '梅州市',
  '惠州市',
  '汕尾市',
  '东莞市',
  '中山市',
  '江门市',
  '阳江市',
  '湛江市',
  '茂名市',
  '肇庆市',
  '清远市',
  '潮州市',
  '揭阳市',
  '云浮市',
]

/** 资产类型选项 */
export const assetTypeOptions: string[] = [
  '商铺',
  '厂房',
  '仓库',
  '办公楼',
  '市场',
  '临时建筑',
  '商住楼',
  '其他物业',
  '其他固定资产',
  '耕地',
  '林地',
  '草地',
  '养殖水面',
  '其他农用地',
]

/** 交易模式选项 */
export const transactionModeOptions: string[] = [
  '公开招标',
  '竞价',
  '拍卖',
  '协议转让',
  '网络竞价',
]

/** 交易类别选项 */
export const transactionCategoryOptions: string[] = [
  '出租',
  '转让',
  '转包',
  '入股',
  '抵押',
]

/** 交易底价选项 */
export const basePriceOptions: string[] = [
  '0 - 1万元',
  '1 - 5万元',
  '5 - 10万元',
  '10 - 50万元',
  '50 - 100万元',
  '100万元以上',
]

/** 广东省地图中心坐标（纬度, 经度） */
export const guangdongMapCenter: [number, number] = [23.13, 113.26]

/** 广东省地图默认缩放级别 */
export const guangdongMapZoom = 7

/** 地图允许的最大缩放级别 */
export const projectMapMaxZoom = 18

/** 高德底图稳定提供的原生瓦片层级；更高层级由 Leaflet 平滑放大 */
export const projectMapMaxNativeZoom = 17
