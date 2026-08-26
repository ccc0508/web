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

export interface GuangdongCityMarker {
  name: string
  coordinates: [number, number]
}

/** 广东省 21 个地级市中心点（纬度, 经度） */
export const guangdongCityMarkers: GuangdongCityMarker[] = [
  { name: '广州市', coordinates: [23.55, 113.25] },
  { name: '深圳市', coordinates: [22.3, 114.15] },
  { name: '珠海市', coordinates: [21.95, 113.55] },
  { name: '汕头市', coordinates: [23.2, 116.85] },
  { name: '佛山市', coordinates: [23.12, 112.75] },
  { name: '韶关市', coordinates: [24.8104, 113.5972] },
  { name: '河源市', coordinates: [23.7437, 114.7007] },
  { name: '梅州市', coordinates: [24.2991, 116.1226] },
  { name: '惠州市', coordinates: [23.05, 114.55] },
  { name: '汕尾市', coordinates: [22.55, 115.25] },
  { name: '东莞市', coordinates: [23.35, 113.82] },
  { name: '中山市', coordinates: [22.48, 113.35] },
  { name: '江门市', coordinates: [22.25, 112.82] },
  { name: '阳江市', coordinates: [21.8579, 111.9822] },
  { name: '湛江市', coordinates: [21.2707, 110.3594] },
  { name: '茂名市', coordinates: [21.663, 110.9255] },
  { name: '肇庆市', coordinates: [23.45, 112.3] },
  { name: '清远市', coordinates: [24.0, 113.0] },
  { name: '潮州市', coordinates: [23.9, 116.85] },
  { name: '揭阳市', coordinates: [23.55, 116.15] },
  { name: '云浮市', coordinates: [22.8, 111.9] },
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
export const guangdongMapZoom = 7.5

/** 地图允许的最大缩放级别 */
export const projectMapMaxZoom = 18

/** 高德底图稳定提供的原生瓦片层级；更高层级由 Leaflet 平滑放大 */
export const projectMapMaxNativeZoom = 17
