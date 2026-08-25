<script setup lang="ts">
import { computed, ref } from 'vue'

interface InformationItem {
  title: string
  date: string
}

interface InformationGroup {
  day: string
  month: string
  title: string
  summary: string
  items: InformationItem[]
}

const informationGroups: Record<string, InformationGroup> = {
  工作动态: {
    day: '21', month: '2026年08',
    title: '大沥大转湾二期地块启动拆除，将打造现代化五金全球采购中心',
    summary: '7月16日，大沥镇盐步大转湾全球五金建材采购中心——河东社区“龙船洛”专业市场地块拆除启动仪式顺利举办，这意味着大转湾全球五金建材采购中心新一轮产业升级改造工程正式落地实施。',
    items: [
      { title: '下沉到乐从路州的这场宣讲，把乡村善治和村域经济发展“种”进心', date: '2026-08-21' },
      { title: '全省率先！佛山出台若干举措推进乡村运营', date: '2026-08-20' },
      { title: '集体家底一键查 监督反馈线上办', date: '2026-08-14' },
      { title: '72个重点项目落地、总投资61亿元！佛山市乡村振兴招商大会启幕', date: '2026-08-12' },
      { title: '土地租金涨四倍！佛山这条“亿元村”致富路子不一般！', date: '2026-08-10' },
      { title: '三大百亿集群引凤来栖，佛山市乡村振兴招商大会本周三举办', date: '2026-08-10' },
    ],
  },
  通知公告: {
    day: '22', month: '2026年07', title: '佛山市闲置农房招租信息', summary: '佛山市闲置农房招租信息',
    items: [
      { title: '南海区桂城街道夏东社区五房沙闲置农房项目', date: '2026-07-22' },
      { title: '佛山市南海区农村集体资产财务管理服务中心关于恢复使用南海农商行交易保证金账户的公告', date: '2026-07-08' },
      { title: '南海区里水镇流潮水口村闲置农房项目', date: '2026-05-26' },
      { title: '高明区明城镇红岗村闲置农房项目', date: '2026-05-20' },
      { title: '高明区更合镇白石村村尾闲置农房项目', date: '2026-05-18' },
      { title: '南沙社区棋盘村闲置农房项目', date: '2026-05-15' },
    ],
  },
  行业资讯: {
    day: '25', month: '2026年08', title: '【河南】“美丽经济”助农增收',
    summary: '“这束荷花太有氛围感了，往湖边一站拍照特别出片！”近日，河南省信阳市浉河区南湾湖畔荷香满溢，“荷花市集”开市迎客。',
    items: [
      { title: '【青海】“光伏羊”绿了荒滩富了牧民', date: '2026-08-20' },
      { title: '【安徽】良种新技盘活灵芝产业', date: '2026-08-17' },
      { title: '【四川】这里的良田何以换“新装”？', date: '2026-08-14' },
      { title: '【新疆】让集体经济红利直达农户', date: '2026-08-13' },
      { title: '【山东】集体资产在阳光下保值增值', date: '2026-08-07' },
      { title: '【辽宁】驻村更“筑”村', date: '2026-08-04' },
    ],
  },
  警示曝光: {
    day: '18', month: '2025年06', title: '关于2起扰乱破坏农村集体资产交易秩序典型案例的通报',
    summary: '为进一步推动农村集体“三资”管理突出问题专项整治走深走实，防范和打击扰乱破坏农村集体资产交易秩序行为，强化警示震慑，现将我市近期查处的2起典型案例通报如下。',
    items: [
      { title: '南海区破获扰乱破坏农村集体资产交易秩序案件', date: '2025-03-12' },
      { title: '魏某、夏某、李某、江某等4人涉嫌敲诈勒索违法犯罪被公安机关依法立案查处', date: '2024-06-16' },
    ],
  },
  帮扶协作: {
    day: '17', month: '2026年01', title: '佛山对口帮扶云浮驻镇帮镇扶村交出2025年度“硬核”答卷',
    summary: '2025年是巩固拓展脱贫攻坚成果同乡村振兴有效衔接过渡期收官之年，佛云驻镇帮扶围绕产业、民生和乡村振兴精准发力，交出高质量年度答卷。',
    items: [
      { title: '取得多项亮眼成效！佛黔协作晒出2025成绩单', date: '2026-01-16' },
      { title: '8吨鲟鳇鱼“游”出国门！佛黔产业协作迎“开门红”', date: '2026-01-09' },
      { title: '万亿产业新风口下，佛云园如何打造低空经济“湾区样板”？', date: '2025-05-30' },
      { title: '智库观察丨佛云园招商密码 敢闯敢拼背后的“逆袭方法论”', date: '2025-05-30' },
      { title: '思劳东收费站、佛云大道正式通车！佛云园交通动脉贯通，产业腾飞箭在弦上', date: '2025-05-29' },
      { title: '43.52亿元！佛云协作实现首季“开门红”', date: '2025-05-28' },
    ],
  },
}

const tabs = Object.keys(informationGroups)
const activeTab = ref(tabs[0])
const activeGroup = computed(() => informationGroups[activeTab.value])
</script>

<template>
  <article class="information-panel" data-testid="information-panel" :data-active-tab="activeTab">
    <div class="information-panel__tabs" aria-label="资讯分类" role="tablist">
      <button v-for="(tab, index) in tabs" :id="`information-tab-${index}`" :key="tab"
        :aria-controls="`information-panel-${index}`" :aria-selected="activeTab === tab"
        :class="{ 'is-active': activeTab === tab }" :data-testid="`information-tab-${index}`"
        role="tab" type="button" @click="activeTab = tab">{{ tab }}</button>
      <span class="information-panel__more">更多&gt;</span>
    </div>

    <div :id="`information-panel-${tabs.indexOf(activeTab)}`" class="information-panel__content" role="tabpanel"
      :aria-labelledby="`information-tab-${tabs.indexOf(activeTab)}`">
      <div class="information-panel__lead">
        <div class="information-panel__date" aria-label="头条日期">
          <strong>{{ activeGroup.day }}</strong><span>{{ activeGroup.month }}</span>
        </div>
        <div class="information-panel__summary">
          <h3>{{ activeGroup.title }}</h3><p>{{ activeGroup.summary }}</p>
        </div>
      </div>
      <div class="information-panel__list" aria-label="资讯列表">
        <div v-for="item in activeGroup.items" :key="`${item.title}-${item.date}`" class="information-panel__row">
          <span aria-hidden="true"></span><p>{{ item.title }}</p><time>{{ item.date }}</time>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.information-panel {
  height: 380px; padding: 21px 22px 15px; overflow: hidden; background: #fff;
  border: 1px solid #ece5e1; box-shadow: var(--section-shadow);

  &__tabs { display: flex; align-items: center; gap: 11px; height: 48px; border-bottom: 1px solid #eee8e4;
    button { height: 40px; padding: 0 20px; color: #282421; cursor: pointer; background: #f0f1f3;
      font-size: 19px; white-space: nowrap; transition: color 140ms ease, background 140ms ease;
      &.is-active { color: #fff; background: linear-gradient(180deg, #ed4037, #df2f28); font-weight: 700; }
    }
  }
  &__more { margin-left: auto; color: #8d8783; font-size: 16px; white-space: nowrap; }
  &__content { padding-top: 13px; }
  &__lead { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 18px; height: 122px;
    padding-bottom: 12px; border-bottom: 1px solid #eee8e4; }
  &__date { display: flex; flex-direction: column; align-items: center; justify-content: center; color: #171412;
    border-right: 1px solid #eee8e4;
    strong { font-size: 50px; font-weight: 500; line-height: 1; }
    span { margin-top: 12px; font-size: 12px; font-weight: 700; }
  }
  &__summary { min-width: 0; padding: 5px 10px 0 0;
    h3 { margin: 0 0 12px; overflow: hidden; color: #171412; font-size: 20px; font-weight: 500;
      text-overflow: ellipsis; white-space: nowrap; }
    p { display: -webkit-box; margin: 0; overflow: hidden; color: #47413d; font-size: 14px; line-height: 1.8;
      -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
  }
  &__list { padding-top: 7px; }
  &__row { display: grid; grid-template-columns: 7px minmax(0, 1fr) 82px; gap: 9px; align-items: center; height: 27px;
    > span { width: 5px; height: 5px; background: #d12a30; border-radius: 50%; }
    p, time { margin: 0; overflow: hidden; color: #292522; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
    time { color: #8d8783; text-align: right; }
  }
}

@media (max-width: 1399px) {
  .information-panel { padding-inline: 18px;
    &__tabs { gap: 8px; button { padding-inline: 15px; font-size: 18px; } }
    &__lead { grid-template-columns: 96px minmax(0, 1fr); }
  }
}
</style>
