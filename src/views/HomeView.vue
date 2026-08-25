<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import BackToTop from '../components/BackToTop.vue'
import BusinessDataSection from '../components/BusinessDataSection.vue'
import InformationTabs from '../components/InformationTabs.vue'
import PrimaryNav from '../components/PrimaryNav.vue'
import SectionHeader from '../components/SectionHeader.vue'
import SiteHeader from '../components/SiteHeader.vue'
import VideoPlaceholder from '../components/VideoPlaceholder.vue'

const carouselSlides = [
  { image: '/assets/carousel/carousel-01.jpg', title: '全省率先！佛山出台若干举措推进乡村运营' },
  { image: '/assets/carousel/carousel-02.jpg', title: '疾风骤雨，南海全域整治拦不住！' },
  { image: '/assets/carousel/carousel-03.jpg', title: '90个！佛山亿元村居再扩容' },
  { image: '/assets/carousel/carousel-04.jpg', title: '紧扣“六活”思路，南海农村改革助力“百千万”，增长看得见' },
  { image: '/assets/carousel/carousel-05.jpg', title: '农村集体“三资”智慧云管理平台入围农业农村大数据应用软件系统征集成果发布名单 获全国推广' },
]

const activeCarouselIndex = ref(0)
let carouselTimer: ReturnType<typeof setInterval> | undefined

const selectCarouselSlide = (index: number) => {
  activeCarouselIndex.value = index
}

onMounted(() => {
  carouselTimer = setInterval(() => {
    activeCarouselIndex.value = (activeCarouselIndex.value + 1) % carouselSlides.length
  }, 5000)
})

onUnmounted(() => {
  if (carouselTimer) clearInterval(carouselTimer)
})

const ruralProjectRecords = {
  交易公告: [
    { name: '关于“西城村新市至大岗道路周边闲置地提升工程”的变更公告', region: '南海区丹灶镇西城社区', date: '2026-08-25' },
    { name: '陈村镇石洲村罗亨篮球场提升改造项目交易公告', region: '顺德区陈村镇石洲村', date: '2026-08-25' },
    { name: '陈村镇石洲村平康北便街入口道路提升项目交易公告', region: '顺德区陈村镇石洲村', date: '2026-08-25' },
    { name: '陈村镇石洲村罗亨东便基池塘边改造提升项目交易公告', region: '顺德区陈村镇石洲村', date: '2026-08-25' },
    { name: '冲口经济社污水设施建设工程招标', region: '南海区里水镇大步社区', date: '2026-08-25' },
  ],
  结果公示: [
    { name: '北大步新村河涌整治提升工程结果公示', region: '南海区里水镇大步社区', date: '2026-08-25' },
    { name: '九江镇璜矶社区高标田道路修复工程公告', region: '南海区九江镇璜矶社区', date: '2026-08-25' },
    { name: '张槎街道下朗村保安管理外包服务（2026年-2027年）结果公告', region: '禅城区张槎街道下朗村', date: '2026-08-25' },
    { name: '佛山市南海区丹灶镇西联社区居民委员会三甲村小组大份东工业厂房项目中标候选人公示', region: '南海区丹灶镇西联社区', date: '2026-08-25' },
    { name: '里水镇白岗社区大文教文体楼项目设计中标公告', region: '南海区里水镇白岗社区', date: '2026-08-21' },
  ],
  成交公告: [
    { name: '体育三街9号物业维修工程(6楼防水补漏）', region: '禅城区祖庙街道永红村', date: '2026-08-25' },
    { name: '南隅村16队文体楼修缮工程成交公告', region: '南海区里水镇得胜村', date: '2026-08-25' },
    { name: '佛山市南海区丹灶镇西联社区居民委员会三甲村小组大份东工业厂房项目结果公告', region: '南海区丹灶镇西联社区', date: '2026-08-25' },
    { name: '东秀社区南边组“原水塘”地块及村内闲置地整治工程（直接发包公告）', region: '南海区大沥镇东秀社区', date: '2026-08-24' },
    { name: '得胜中隅村道路及巷道修复工程项目成交公告', region: '南海区里水镇得胜村', date: '2026-08-24' },
  ],
  其他公告: [
    { name: '勒流社区龙船澳公共空间共建计划项目澄清/修改通知（1）', region: '顺德区勒流街道勒流社区', date: '2026-08-24' },
    { name: '平地社区居委会空调设备采购', region: '南海区大沥镇平地社区', date: '2026-08-19' },
    { name: '兴隆组龙船上落点文化室楼顶护栏和天梯修缮工程验收公告', region: '南海区大沥镇河西社区', date: '2026-08-19' },
    { name: '兴隆综合楼A座首层3号铺砌砖墙、批荡工程验收公告', region: '南海区大沥镇河西社区', date: '2026-08-19' },
    { name: '义基组集体经济组织三旧改造地块清理、围挡修复项目', region: '南海区大沥镇平地社区', date: '2026-08-19' },
  ],
}

const expiringAssetRecords = {
  一年内到期: [
    { category: '市场', region: '禅城区/祖庙街道/永新村', title: '忠义路永新服装市场', owner: '佛山市禅城区祖庙街道永新村集体经济组织', area: '1094.05平方米', address: '佛山市禅城区祖庙街道永新村忠义路永新服装市场', expiryDate: '2027-08-26', image: '/assets/expiring/expiry-01.jpg' },
    { category: '商铺', region: '禅城区/张槎街道/弼唐村', title: '弼唐东二街12号之南11号商铺', owner: '佛山市禅城区张槎街道弼唐村弼兴股份经济合作社', area: '34平方米', address: '佛山市禅城区张槎街道弼唐村弼唐东二街12号之南11号商铺', expiryDate: '2027-08-26', image: '/assets/expiring/expiry-02.jpg' },
    { category: '厂房', region: '禅城区/张槎街道/村尾村', title: '村尾南区联和工业区1号楼首层之三', owner: '佛山市禅城区张槎街道村尾村南区组集体经济组织', area: '177平方米', address: '佛山市禅城区张槎街道村尾南区联和工业区1号楼首层之三厂房', expiryDate: '2027-08-26', image: '/assets/expiring/expiry-03.jpg' },
    { category: '厂房', region: '禅城区/张槎街道/村尾村', title: '村尾南区联和工业区2号楼2楼之二', owner: '佛山市禅城区张槎街道村尾村南区组集体经济组织', area: '1288平方米', address: '佛山市禅城区张槎街道村尾南区联和工业区2号楼2楼之二', expiryDate: '2027-08-26', image: '/assets/expiring/expiry-04.jpg' },
    { category: '商铺', region: '禅城区/祖庙街道/镇安村', title: '镇安村中一九亩工业区2号115商铺', owner: '佛山市禅城区祖庙街道镇安村中一股份经济合作社', area: '30平方米', address: '佛山市禅城区祖庙街道镇安村中一九亩工业区2号115商铺', expiryDate: '2027-08-26', image: '/assets/expiring/expiry-05.jpg' },
    { category: '耕地', region: '南海区/狮山镇/联表社区', title: '联表社区联表东股份经济合作社“朱斗脚”农田6号地', owner: '佛山市南海区狮山镇联表社区联表东股份经济合作社', area: '4.37亩', address: '狮山镇联表村联表东经济社土名“朱斗脚”地段。', expiryDate: '2027-08-25', image: '/assets/expiring/expiry-06.jpg' },
  ],
  '6个月内到期': [
    { category: '仓库', region: '禅城区/南庄镇/东村村', title: '东村工业C区07号-下东东鹤咀塘东面土地仓库', owner: '佛山市禅城区南庄镇东村集团有限公司', area: '6761.78平方米', address: '佛山市禅城区南庄镇迎凤路以北，东村物业仓23座以东', expiryDate: '2027-02-26', image: '/assets/expiring/expiry-07.jpg' },
    { category: '商铺', region: '禅城区/石湾镇街道/沙岗村', title: '沙岗村石塘前士多店10号商铺', owner: '佛山市禅城区石湾镇街道沙岗村沙岗组集体经济组织', area: '20平方米', address: '佛山市禅城区石湾镇街道沙岗村石塘前士多店10号商铺', expiryDate: '2027-02-26', image: '/assets/expiring/expiry-08.jpg' },
    { category: '厂房', region: '高明区/杨和镇/岗水村', title: '独岗南庄围8-1号厂房', owner: '佛山市高明区杨和镇独岗股份经济合作社', area: '5500平方米', address: '佛山市高明区杨和镇独岗工业区南庄围8号', expiryDate: '2027-02-25', image: '/assets/expiring/expiry-09.jpg' },
    { category: '养殖水面（坑塘水面）', region: '高明区/荷城街道/范洲村', title: '坑边村竹仔脚下碑和上碑2号鱼塘', owner: '佛山市高明区荷城街道坑边股份经济合作社', area: '17.9533亩', address: '佛山市高明区荷城街道坑边村西出口路边鱼塘', expiryDate: '2027-02-25', image: '/assets/expiring/expiry-10.jpg' },
    { category: '养殖水面（坑塘水面）', region: '南海区/狮山镇/下柏社区', title: '狮山镇下柏社区下柏经济联合社灯妹塘鱼塘', owner: '广东省佛山市南海区狮山镇下柏社区集体经济组织', area: '3亩', address: '佛山市南海区狮山镇下柏社区下柏经济联合社岑边村东南侧鱼塘之五', expiryDate: '2027-02-25', image: '/assets/expiring/expiry-11.jpg' },
    { category: '养殖水面（坑塘水面）', region: '南海区/狮山镇/下柏社区', title: '狮山镇下柏社区下柏经济联合社岑坚塘鱼塘', owner: '广东省佛山市南海区狮山镇下柏社区集体经济组织', area: '4亩', address: '佛山市南海区狮山镇下柏社区下柏经济联合社岑边村东南侧鱼塘之四', expiryDate: '2027-02-25', image: '/assets/expiring/expiry-12.jpg' },
  ],
  '3个月内到期': [
    { category: '交通运输和水利设施用地', region: '顺德区/容桂街道/南区社区', title: '聚龙片停车位43号', owner: '佛山市顺德区容桂街道南区股份经济合作联合社', area: '0.015亩', address: '容桂街道南区社区聚龙小区', expiryDate: '2026-11-26', image: '/assets/expiring/expiry-13.jpg' },
    { category: '商铺', region: '南海区/大沥镇/平地社区', title: '华村大道(旧纸箱厂)5号铺', owner: '广东省佛山市南海区大沥镇平地社区华村组集体经济组织', area: '72平方米', address: '佛山市南海区大沥镇平地华村大道(旧纸箱厂)', expiryDate: '2026-11-26', image: '/assets/expiring/expiry-14.jpg' },
    { category: '商铺', region: '南海区/大沥镇/平地社区', title: '华村大道(旧纸箱厂)6号铺', owner: '广东省佛山市南海区大沥镇平地社区华村组集体经济组织', area: '72平方米', address: '佛山市南海区大沥镇平地华村大道(旧纸箱厂)', expiryDate: '2026-11-26', image: '/assets/expiring/expiry-15.jpg' },
    { category: '厂房', region: '禅城区/张槎街道/村尾村', title: '村尾顺景工业区1305号之一厂房', owner: '佛山市禅城区张槎街道村尾村中一组集体经济组织', area: '248平方米', address: '广东省佛山市禅城区张槎街道村尾顺景工业区1305号之一厂房', expiryDate: '2026-11-26', image: '/assets/expiring/expiry-16.jpg' },
    { category: '其他物业', region: '南海区/九江镇/河清社区', title: '三村基站（思恩亭侧杂地）', owner: '广东省佛山市南海区九江镇河清社区三村组集体经济组织', area: '50平方米', address: '佛山市南海区九江镇河清社区三村九曲巷140号侧三村基站（思恩亭侧杂地）', expiryDate: '2026-11-25', image: '/assets/expiring/expiry-17.jpg' },
    { category: '交通运输和水利设施用地', region: '顺德区/容桂街道/南区社区', title: '聚龙片停车位45号', owner: '佛山市顺德区容桂街道南区股份经济合作联合社', area: '0.015亩', address: '容桂街道南区社区聚龙小区', expiryDate: '2026-11-25', image: '/assets/expiring/expiry-18.jpg' },
  ],
  '1个月内到期': [
    { category: '商铺', region: '禅城区/石湾镇街道/沙岗村', title: '沙岗村孖山仔6号之1商铺', owner: '佛山市禅城区石湾镇街道沙岗村沙岗组集体经济组织', area: '96平方米', address: '佛山市禅城区石湾镇街道沙岗村孖山仔5-6号仓库', expiryDate: '2026-09-26', image: '/assets/expiring/expiry-19.jpg' },
    { category: '商服用地', region: '顺德区/乐从镇/良教村', title: '良教村乐从大道南良教段地块一', owner: '广东省佛山市顺德区乐从镇良教股份合作经济社', area: '55.44亩', address: '广东省佛山市顺德区乐从镇乐从大道良教路段南侧', expiryDate: '2026-09-26', image: '/assets/expiring/expiry-20.jpg' },
    { category: '商铺', region: '禅城区/石湾镇街道/河宕村', title: '河宕东一村建源路38栋B座1号商铺', owner: '佛山市禅城区石湾镇街道河宕村东一股份经济合作社', area: '77平方米', address: '佛山市禅城区石湾镇街道河宕东一村建源路38栋B座1号', expiryDate: '2026-09-26', image: '/assets/expiring/expiry-21.jpg' },
    { category: '商铺', region: '禅城区/石湾镇街道/沙岗村', title: '沙岗村孖山仔3-4号商铺', owner: '佛山市禅城区石湾镇街道沙岗村沙岗组集体经济组织', area: '384平方米', address: '佛山市禅城区石湾镇街道沙岗村孖山仔3-4号仓库', expiryDate: '2026-09-26', image: '/assets/expiring/expiry-22.jpg' },
    { category: '商铺', region: '禅城区/石湾镇街道/沙岗村', title: '沙岗村孖山仔5号之1商铺', owner: '佛山市禅城区石湾镇街道沙岗村沙岗组集体经济组织', area: '96平方米', address: '佛山市禅城区石湾镇街道沙岗村孖山仔5-6号仓库', expiryDate: '2026-09-26', image: '/assets/expiring/expiry-23.jpg' },
    { category: '商服用地', region: '顺德区/乐从镇/良教村', title: '良教村乐从大道南良教段地块二', owner: '广东省佛山市顺德区乐从镇良教股份合作经济社', area: '59.04亩', address: '广东省佛山市顺德区乐从镇乐从大道良教路段南侧', expiryDate: '2026-09-26', image: '/assets/expiring/expiry-24.jpg' },
  ],
}

const transactionAssetRecords = {
  交易公告: [
    { category: '工矿仓储用地', region: '高明区/荷城街道/南洲村', title: '新庄二社庙门口厂房及地块出租', image: '/assets/transaction/transaction-01.jpg', details: [{ label: '权属单位', value: '佛山市高明区荷城街道南洲村新庄二组集体经济组织' }, { label: '交易底价', value: '90000.00元/宗/季' }, { label: '报名时间', value: '2026-08-26 12:00 - 2026-08-31 12:00' }, { label: '竞投时间', value: '2026-09-01 09:30' }] },
    { category: '商住楼', region: '禅城区/祖庙街道/朝东村', title: '大豆南桂西路30号二楼201、202、203商住楼出租', image: '/assets/transaction/transaction-02.jpg', details: [{ label: '权属单位', value: '佛山市禅城区祖庙街道朝东村大豆组集体经济组织' }, { label: '交易底价', value: '16285.00元/宗/月' }, { label: '报名时间', value: '2026-08-26 12:00 - 2026-08-31 12:00' }, { label: '竞投时间', value: '2026-09-01 10:00' }] },
    { category: '商铺', region: '禅城区/祖庙街道/敦厚村', title: '村内四组物业原五金配件厂侧[45020-3]商铺出租', image: '/assets/transaction/transaction-03.jpg', details: [{ label: '权属单位', value: '佛山市禅城区祖庙街道敦厚村集体经济组织' }, { label: '交易底价', value: '22.00元/平方米/月' }, { label: '报名时间', value: '2026-08-26 12:00 - 2026-08-31 12:00' }, { label: '竞投时间', value: '2026-09-01 10:00' }] },
    { category: '工矿仓储用地', region: '高明区/更合镇/更楼社区', title: '吉岗山塘尾1号地块、临时建筑出租', image: '/assets/transaction/transaction-04.jpg', details: [{ label: '权属单位', value: '佛山市高明区更合镇更楼社区吉岗组集体经济组织' }, { label: '交易底价', value: '15000.00元/宗/年' }, { label: '报名时间', value: '2026-08-26 12:00 - 2027-08-26 12:00' }, { label: '竞投时间', value: '2026-09-03 09:00' }] },
    { category: '仓库', region: '禅城区/石湾镇街道/沙岗村', title: '沙岗村新路146号二楼仓库出租', image: '/assets/transaction/transaction-05.jpg', details: [{ label: '权属单位', value: '佛山市禅城区石湾镇街道沙岗村沙岗组集体经济组织' }, { label: '交易底价', value: '2750.40元/宗/半年' }, { label: '报名时间', value: '2026-08-25 17:30 - 2026-08-28 17:30' }, { label: '竞投时间', value: '2026-08-31 09:15' }] },
    { category: '仓库', region: '禅城区/石湾镇街道/沙岗村', title: '沙岗村厚龙路140号二楼仓库出租', image: '/assets/transaction/transaction-06.jpg', details: [{ label: '权属单位', value: '佛山市禅城区石湾镇街道沙岗村沙岗组集体经济组织' }, { label: '交易底价', value: '2100.00元/宗/半年' }, { label: '报名时间', value: '2026-08-25 17:30 - 2026-08-28 17:30' }, { label: '竞投时间', value: '2026-08-31 09:15' }] },
  ],
  结果公示: [
    { category: '综合楼', region: '南海区/桂城街道/夏东社区', title: '孔溪创展大楼综合楼出租', image: '/assets/transaction/transaction-07.jpg', details: [{ label: '竞得人', value: '佘周兴' }, { label: '成交金额', value: '47000元/宗/月' }, { label: '公示开始', value: '2026-08-26' }, { label: '公示结束', value: '2026-08-28' }] },
    { category: '商铺', region: '南海区/桂城街道/平东社区', title: '玉器大楼C28铺出租', image: '/assets/transaction/transaction-08.jpg', details: [{ label: '竞得人', value: '林声添' }, { label: '成交金额', value: '19000元/宗/月' }, { label: '公示开始', value: '2026-08-26' }, { label: '公示结束', value: '2026-08-28' }] },
    { category: '商铺', region: '南海区/大沥镇/六联社区', title: '北村公路南二段之西庙后7号铺出租', image: '/assets/transaction/transaction-09.jpg', details: [{ label: '竞得人', value: '吕明强' }, { label: '成交金额', value: '3939.18元/宗/月' }, { label: '公示开始', value: '2026-08-26' }, { label: '公示结束', value: '2026-08-28' }] },
    { category: '商铺', region: '南海区/大沥镇/六联社区', title: '北村公路南二段之西庙后10号铺出租', image: '/assets/transaction/transaction-10.jpg', details: [{ label: '竞得人', value: '黄洲发' }, { label: '成交金额', value: '5464.78元/宗/月' }, { label: '公示开始', value: '2026-08-26' }, { label: '公示结束', value: '2026-08-28' }] },
    { category: '商铺', region: '南海区/大沥镇/六联社区', title: '北村公路南二段之西庙后9号铺出租', image: '/assets/transaction/transaction-11.jpg', details: [{ label: '竞得人', value: '王广峰' }, { label: '成交金额', value: '3989.18元/宗/月' }, { label: '公示开始', value: '2026-08-26' }, { label: '公示结束', value: '2026-08-28' }] },
    { category: '商铺', region: '南海区/大沥镇/六联社区', title: '北村公路南二段之西庙后5号铺出租', image: '/assets/transaction/transaction-12.jpg', details: [{ label: '竞得人', value: '肖浩涛' }, { label: '成交金额', value: '7878.24元/宗/月' }, { label: '公示开始', value: '2026-08-26' }, { label: '公示结束', value: '2026-08-28' }] },
  ],
  成交公告: [
    { category: '耕地', region: '禅城区/南庄镇/吉利村', title: '吉利农田区北四号塘（经营权）出租', image: '/assets/transaction/transaction-13.jpg', details: [{ label: '竞得人', value: '陆永良' }, { label: '成交金额', value: '2000元/亩/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '综合楼和仓库', region: '禅城区/南庄镇/吉利村', title: '陶博大道东自编XJD14综合楼和陶博大道东便自编XJD15仓库出租', image: '/assets/transaction/transaction-14.jpg', details: [{ label: '竞得人', value: '黄红英' }, { label: '成交金额', value: '763560元/宗/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '厂房', region: '禅城区/南庄镇/上元村', title: '上元开发区东区11座及露天场所出租', image: '/assets/transaction/transaction-15.jpg', details: [{ label: '竞得人', value: '羅鄧傑' }, { label: '成交金额', value: '15000元/宗/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '商铺', region: '禅城区/南庄镇/紫南村', title: '紫南美食城小食街01号商铺出租', image: '/assets/transaction/transaction-16.jpg', details: [{ label: '竞得人', value: '黄球丽' }, { label: '成交金额', value: '2100元/宗/月' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '商铺', region: '禅城区/南庄镇/紫南村', title: '紫南美食城小食街02号商铺出租', image: '/assets/transaction/transaction-17.jpg', details: [{ label: '竞得人', value: '黄球丽' }, { label: '成交金额', value: '2100元/宗/月' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '商铺', region: '禅城区/南庄镇/紫南村', title: '紫南美食城小食街03号商铺出租', image: '/assets/transaction/transaction-18.jpg', details: [{ label: '竞得人', value: '陈土娣' }, { label: '成交金额', value: '2100元/宗/月' }, { label: '发布时间', value: '2026-08-25' }] },
  ],
  其他公告: [
    { category: '楼房', region: '禅城区/南庄镇/杏头村', title: '苏滘1号楼出租', image: '/assets/transaction/transaction-19.jpg', details: [{ label: '权属单位', value: '佛山市禅城区南庄镇杏头村朝阳组集体经济组织' }, { label: '交易底价', value: '5800元/宗/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '楼房', region: '禅城区/南庄镇/杏头村', title: '苏滘2号楼出租', image: '/assets/transaction/transaction-20.jpg', details: [{ label: '权属单位', value: '佛山市禅城区南庄镇杏头村朝阳组集体经济组织' }, { label: '交易底价', value: '38000元/宗/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '耕地', region: '禅城区/南庄镇/醒群村', title: '醒群格庄村直佳塘鱼塘、基地（经营权）出租', image: '/assets/transaction/transaction-21.jpg', details: [{ label: '权属单位', value: '佛山市禅城区南庄镇醒群村格庄经济合作社' }, { label: '交易底价', value: '1500元/亩/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '耕地', region: '禅城区/南庄镇/醒群村', title: '醒群格庄村1号塘鱼塘、基地（经营权）出租', image: '/assets/transaction/transaction-22.jpg', details: [{ label: '权属单位', value: '佛山市禅城区南庄镇醒群村格庄经济合作社' }, { label: '交易底价', value: '1500元/亩/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '耕地', region: '禅城区/南庄镇/醒群村', title: '醒群格庄村3号塘鱼塘、基地（经营权）出租', image: '/assets/transaction/transaction-23.jpg', details: [{ label: '权属单位', value: '佛山市禅城区南庄镇醒群村格庄经济合作社' }, { label: '交易底价', value: '1500元/亩/年' }, { label: '发布时间', value: '2026-08-25' }] },
    { category: '耕地', region: '禅城区/南庄镇/醒群村', title: '醒群格庄村风车塘鱼塘、基地（经营权）出租', image: '/assets/transaction/transaction-24.jpg', details: [{ label: '权属单位', value: '佛山市禅城区南庄镇醒群村格庄经济合作社' }, { label: '交易底价', value: '2500元/亩/年' }, { label: '发布时间', value: '2026-08-25' }] },
  ],
}

const businessSections = [
  {
    sectionId: 'transaction',
    titleLead: '交易',
    titleRest: '动态',
    tabs: ['交易公告', '结果公示', '成交公告', '其他公告'],
    transactionRecords: transactionAssetRecords,
    categories: [
      { label: '商铺', glyph: '铺', color: '#ff6f4c' },
      { label: '厂房', glyph: '厂', color: '#3bd950' },
      { label: '仓库', glyph: '仓', color: '#ae56e6' },
      { label: '办公楼', glyph: '楼', color: '#22c874' },
      { label: '市场', glyph: '市', color: '#25aae8' },
      { label: '临时建筑', glyph: '建', color: '#ff9e26' },
      { label: '商住楼', glyph: '商', color: '#ffd85a' },
      { label: '其他物业', glyph: '物', color: '#1fcbd3' },
      { label: '其他固定资产', glyph: '资', color: '#ff7251' },
      { label: '耕地', glyph: '地', color: '#ff9d20' },
    ],
  },
  {
    sectionId: 'expiring',
    titleLead: '临期',
    titleRest: '资产',
    tabs: ['一年内到期', '6个月内到期', '3个月内到期', '1个月内到期'],
    assetRecords: expiringAssetRecords,
    categories: [
      { label: '林地', glyph: '林', color: '#ff6d4a' },
      { label: '草地', glyph: '草', color: '#38d64a' },
      { label: '农田水利设施用地（沟渠）', glyph: '农', color: '#b95be7' },
      { label: '养殖水面(坑塘水面)', glyph: '水', color: '#22a7e6' },
      { label: '其他农用地', glyph: '用', color: '#18bd62' },
      { label: '未利用地', glyph: '未', color: '#ff9b21' },
      { label: '“四荒”地', glyph: '荒', color: '#f5ce45' },
      { label: '其他土地资产', glyph: '土', color: '#20cad3' },
    ],
  },
  {
    sectionId: 'disclosure',
    titleLead: '三资',
    titleRest: '公开',
  },
  {
    sectionId: 'projects',
    titleLead: '农村',
    titleRest: '工程和采购',
    tabs: ['交易公告', '结果公示', '成交公告', '其他公告'],
    records: ruralProjectRecords,
  },
]

const websiteLinks = [
  {
    label: '佛山市人民政府',
    url: 'http://www.foshan.gov.cn/',
    theme: 'orange',
  },
  {
    label: '佛山市农业农村局',
    url: 'http://fsny.foshan.gov.cn/',
    theme: 'blue',
  },
  {
    label: '广东省公共资源交易平台',
    url: 'https://ygp.gdzwfw.gov.cn/ggzy-portal/#/440600/index',
    theme: 'green',
  },
  {
    label: '广东省农村产权流转交易管理服务平台',
    url: 'https://cqjy.gdagri.gov.cn/',
    theme: 'orange',
  },
]

</script>

<template>
  <div class="homepage">
    <SiteHeader />
    <PrimaryNav />

    <main class="homepage__main">
      <div class="site-container">
        <section class="showcase" aria-label="首页重点展示">
          <article class="portal-card map-card">
            <SectionHeader eyebrow="Map navigation" title="地图导航" />
            <div class="map-card__canvas" aria-label="广东省静态示意地图" role="img">
              <svg aria-hidden="true" viewBox="0 0 420 305" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mapFill" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stop-color="#f7b3aa" />
                    <stop offset="1" stop-color="#e9756e" />
                  </linearGradient>
                  <filter id="mapShadow" height="140%" width="140%" x="-20%" y="-20%">
                    <feDropShadow dx="0" dy="7" flood-color="#a84743" flood-opacity=".17" stdDeviation="7" />
                  </filter>
                </defs>
                <path
                  d="M66 64 96 48l26 8 20-17 35 13 24-8 27 14 34-5 18 21 31 7 12 24 28 17-4 24-28 12-4 22-29 3-17 17-30-8-18 20-24-14-17 11-26-12-21 14-18-11-17 12-16-20-30-5 4-26-20-17 19-23-11-23 22-12 7-26 23-2Z"
                  fill="url(#mapFill)"
                  filter="url(#mapShadow)"
                  stroke="#cf5b57"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path d="M112 99 150 118l34-18 29 22 40-16 31 30 37-6M95 153l53-35 10 75 54-71 7 89 65-75 14 45M158 193l-19 36m80-18 19 32" fill="none" opacity=".38" stroke="#fff" stroke-width="2" />
                <path d="m213 214 17 4-3 13-15 7-9-9Z" fill="#f8c9c2" stroke="#d96d66" />
                <path d="m178 237 12 11-4 20-10 8-7-13Z" fill="#f0a19a" stroke="#d96d66" />
                <circle cx="217" cy="160" fill="#fff4d5" r="7" stroke="#c91921" stroke-width="3" />
                <circle cx="217" cy="160" fill="#c91921" r="2" />
                <text x="217" y="148" fill="#9d1f25" font-family="Microsoft YaHei, sans-serif" font-size="18" font-weight="700" text-anchor="middle">广东省</text>
                <text x="217" y="182" fill="#a94e49" font-family="Microsoft YaHei, sans-serif" font-size="11" letter-spacing="2" text-anchor="middle">GUANGDONG</text>
              </svg>
              <p>广东省农村集体资产示意导航</p>
            </div>
          </article>

          <article class="portal-card carousel-card" aria-label="首页轮播图">
            <div class="carousel-card__media">
              <Transition name="carousel-fade">
                <img
                  :key="carouselSlides[activeCarouselIndex].image"
                  :alt="carouselSlides[activeCarouselIndex].title"
                  :src="carouselSlides[activeCarouselIndex].image"
                />
              </Transition>
              <div class="carousel-card__shade"></div>
              <div class="carousel-card__caption">
                <span>乡村振兴</span>
                <strong>{{ carouselSlides[activeCarouselIndex].title }}</strong>
              </div>
              <div class="carousel-card__dots" :aria-label="`轮播图第 ${activeCarouselIndex + 1} 张，共 ${carouselSlides.length} 张`">
                <button
                  v-for="(slide, index) in carouselSlides"
                  :key="slide.image"
                  :aria-label="`显示第 ${index + 1} 张轮播图`"
                  :aria-pressed="activeCarouselIndex === index"
                  :class="{ 'is-active': activeCarouselIndex === index }"
                  type="button"
                  @click="selectCarouselSlide(index)"
                ></button>
              </div>
            </div>
          </article>

        </section>

        <section class="feature-row" aria-label="资讯和视频中心">
          <InformationTabs />
          <article class="portal-card video-card" data-testid="video-panel">
            <div class="visually-hidden">视频中心</div>
            <VideoPlaceholder />
          </article>
        </section>

        <section class="business-sections" aria-label="公开数据模块">
          <BusinessDataSection
            v-for="section in businessSections"
            :key="section.sectionId"
            v-bind="section"
          />
        </section>

        <section class="portal-card website-nav" aria-label="网站导航">
          <SectionHeader eyebrow="Website navigation" title="网站导航" />
          <nav class="website-nav__links" aria-label="相关政府网站">
            <a
              v-for="link in websiteLinks"
              :key="link.label"
              :class="['website-nav__link', `website-nav__link--${link.theme}`]"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ link.label }}</span>
              <i aria-hidden="true"></i>
            </a>
          </nav>
        </section>

        <div class="homepage__end" aria-hidden="true">
          <span></span>
          <i></i>
          <span></span>
        </div>
      </div>
    </main>

    <BackToTop />
  </div>
</template>

<style scoped lang="scss">
.homepage {
  min-height: 100vh;

  &__main {
    padding: 25px 0 56px;
    background:
      radial-gradient(circle at 50% 0, rgb(255 255 255 / 70%), transparent 450px),
      var(--page-warm);
  }

  &__end {
    display: flex;
    align-items: center;
    gap: 14px;
    justify-content: center;
    height: 54px;

    span {
      width: 100px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #dfcbc4);

      &:last-child {
        transform: scaleX(-1);
      }
    }

    i {
      width: 7px;
      height: 7px;
      background: #c82127;
      transform: rotate(45deg);
    }
  }
}

.portal-card {
  overflow: hidden;
  background: #fff;
  border: 1px solid #ece5e1;
  box-shadow: var(--section-shadow);
}

.showcase {
  display: grid;
  grid-template-columns: 408px minmax(0, 1fr);
  gap: 17px;
  align-items: stretch;
}

.map-card,
.carousel-card {
  height: 375px;
}

.map-card {
  &__canvas {
    position: relative;
    height: calc(100% - 61px);
    overflow: hidden;
    background:
      linear-gradient(rgb(213 145 138 / 7%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(213 145 138 / 7%) 1px, transparent 1px),
      radial-gradient(circle at 50% 45%, #fff 0, #fff7f4 75%);
    background-size: 30px 30px, 30px 30px, auto;

    &::before,
    &::after {
      position: absolute;
      width: 85px;
      height: 85px;
      content: '';
      border-color: rgb(196 32 39 / 18%);
      border-style: solid;
    }

    &::before {
      top: 14px;
      left: 14px;
      border-width: 1px 0 0 1px;
    }

    &::after {
      right: 14px;
      bottom: 14px;
      border-width: 0 1px 1px 0;
    }

    svg {
      display: block;
      width: 100%;
      height: 278px;
      padding: 8px 20px 0;
    }

    p {
      position: absolute;
      right: 0;
      bottom: 13px;
      left: 0;
      margin: 0;
      color: #9f7670;
      font-size: 12px;
      letter-spacing: 0.18em;
      text-align: center;
    }
  }
}

.carousel-card {
  &__media {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #bbb;

    img {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 43%;
      transition: transform 500ms ease;
    }

    &:hover img {
      transform: scale(1.015);
    }
  }

  &__shade {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgb(35 24 19 / 40%), transparent 58%), linear-gradient(0deg, rgb(25 21 19 / 28%), transparent 45%);
  }

  &__caption {
    position: absolute;
    bottom: 34px;
    left: 34px;
    color: #fff;
    text-shadow: 0 2px 8px rgb(0 0 0 / 45%);

    span {
      display: inline-block;
      padding: 4px 12px;
      margin-bottom: 10px;
      background: #c91921;
      border-radius: 2px;
      font-size: 12px;
      letter-spacing: 0.18em;
    }

    strong {
      display: block;
      font-family: "STKaiti", "KaiTi", serif;
      font-size: 34px;
      letter-spacing: 0.08em;
    }

  }

  &__dots {
    position: absolute;
    right: 25px;
    bottom: 20px;
    display: flex;
    gap: 8px;

    button {
      width: 8px;
      height: 8px;
      padding: 0;
      cursor: pointer;
      background: rgb(255 255 255 / 60%);
      border-radius: 50%;
      transition: width 180ms ease, background 180ms ease;

      &.is-active {
        width: 25px;
        background: #fff;
        border-radius: 5px;
      }
    }
  }
}

.feature-row {
  display: grid;
  grid-template-columns: minmax(0, 58fr) minmax(0, 42fr);
  gap: 20px;
  margin-top: 20px;
}

.video-card {
  height: 380px;
  background: #393736;

  :deep(.video-placeholder) {
    height: 100%;
    aspect-ratio: auto;
  }
}

.business-sections {
  display: block;
}

.website-nav {
  margin-top: 20px;

  &__links {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    padding: 26px 18px 34px;
  }

  &__link {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 0;
    height: 100px;
    overflow: hidden;
    padding: 0 24px;
    color: #fff;
    background: linear-gradient(110deg, #f67918, #ffa932);
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;

    span {
      position: relative;
      z-index: 2;
      white-space: nowrap;
    }

    i,
    &::before,
    &::after {
      position: absolute;
      content: '';
      pointer-events: none;
    }

    &::before {
      top: 26px;
      right: 28px;
      width: 44px;
      height: 44px;
      border: 6px solid rgb(255 255 255 / 12%);
      border-radius: 50%;
    }

    &::after {
      top: 0;
      right: 42px;
      width: 58px;
      height: 100%;
      background: rgb(255 255 255 / 7%);
      transform: skewX(-18deg);
    }

    i {
      right: 14px;
      bottom: -28px;
      width: 76px;
      height: 76px;
      border: 10px solid rgb(255 255 255 / 8%);
      transform: rotate(45deg);
    }

    &--blue {
      background: linear-gradient(110deg, #0876f8, #04a3f4);
    }

    &--green {
      background: linear-gradient(110deg, #3c9b87, #70d5bd);
    }

    &:hover {
      filter: brightness(1.04);
      box-shadow: 0 8px 18px rgb(82 50 35 / 18%);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 3px solid #b9151d;
      outline-offset: 3px;
    }
  }

  .carousel-fade-enter-active,
  .carousel-fade-leave-active {
    transition: opacity 400ms ease;
  }

  .carousel-fade-enter-from,
  .carousel-fade-leave-to {
    opacity: 0;
  }
}

@media (max-width: 1399px) {
  .showcase {
    grid-template-columns: 390px minmax(0, 1fr);
    gap: 14px;
  }

  .map-card,
  .carousel-card {
    height: 360px;
  }

  .map-card__canvas svg {
    height: 266px;
  }

  .website-nav {
    &__links {
      gap: 18px;
    }

    &__link {
      padding-inline: 18px;
      font-size: 16px;
    }
  }
}

@media (max-width: 960px) {
  .website-nav__links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
