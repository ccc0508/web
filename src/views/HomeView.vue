<script setup lang="ts">
import BackToTop from '../components/BackToTop.vue'
import BusinessDataSection from '../components/BusinessDataSection.vue'
import InformationTabs from '../components/InformationTabs.vue'
import PrimaryNav from '../components/PrimaryNav.vue'
import SectionHeader from '../components/SectionHeader.vue'
import SiteHeader from '../components/SiteHeader.vue'
import VideoPlaceholder from '../components/VideoPlaceholder.vue'

const businessSections = [
  {
    sectionId: 'transaction',
    titleLead: '交易',
    titleRest: '动态',
    tabs: ['交易公告', '结果公示', '成交公告', '其他公告'],
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
              <img alt="首页轮播占位图" src="/assets/carousel-placeholder.jpg" />
              <div class="carousel-card__shade"></div>
              <div class="carousel-card__caption">
                <span>数字乡村</span>
                <strong>科技赋能乡村振兴</strong>
                <p>汇聚集体资源，助力美好乡村建设</p>
              </div>
              <div class="carousel-card__dots" aria-label="轮播图第 1 张，共 3 张">
                <i class="is-active"></i><i></i><i></i>
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

    p {
      margin: 6px 0 0;
      font-size: 14px;
      letter-spacing: 0.12em;
    }
  }

  &__dots {
    position: absolute;
    right: 25px;
    bottom: 20px;
    display: flex;
    gap: 8px;

    i {
      width: 8px;
      height: 8px;
      background: rgb(255 255 255 / 60%);
      border-radius: 50%;

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
