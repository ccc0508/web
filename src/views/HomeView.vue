<script setup lang="ts">
import EmptyState from '../components/EmptyState.vue'
import GrayMediaPlaceholder from '../components/GrayMediaPlaceholder.vue'
import PrimaryNav from '../components/PrimaryNav.vue'
import SectionHeader from '../components/SectionHeader.vue'
import SiteHeader from '../components/SiteHeader.vue'
import VideoPlaceholder from '../components/VideoPlaceholder.vue'

const emptySections = [
  { title: '交易动态', eyebrow: 'Transaction updates' },
  { title: '临期资产', eyebrow: 'Expiring assets' },
  { title: '三资公开', eyebrow: 'Collective assets' },
  { title: '农村工程和采购', eyebrow: 'Projects & procurement' },
]

const keepPresentationOnly = () => undefined
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
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

          <aside class="utility-card" aria-label="便民服务">
            <div class="utility-card__heading">便民服务</div>
            <div class="utility-card__qr">
              <GrayMediaPlaceholder label="二维码占位" ratio="1 / 1" />
              <p>扫码关注平台</p>
            </div>
            <button type="button" @click="keepPresentationOnly">
              <span aria-hidden="true">公</span> 信息公开
            </button>
            <button type="button" @click="keepPresentationOnly">
              <span aria-hidden="true">办</span> 办事指南
            </button>
          </aside>
        </section>

        <section class="feature-row" aria-label="综合信息和视频中心">
          <article class="portal-card feature-card feature-card--video">
            <SectionHeader eyebrow="Video center" title="视频中心" />
            <div class="feature-card__body">
              <VideoPlaceholder />
            </div>
          </article>

          <article class="portal-card feature-card">
            <SectionHeader eyebrow="Information" title="综合信息" />
            <div class="media-list">
              <div v-for="index in 3" :key="index" class="media-list__item">
                <GrayMediaPlaceholder :label="`图片占位 ${index}`" ratio="16 / 10" />
                <div class="media-list__copy">
                  <span></span>
                  <i></i>
                  <i></i>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section class="data-grid" aria-label="公开数据模块">
          <article v-for="section in emptySections" :key="section.title" class="portal-card data-card">
            <SectionHeader :eyebrow="section.eyebrow" :title="section.title" />
            <EmptyState />
          </article>
        </section>

        <section class="portal-card website-nav" aria-label="网站导航">
          <SectionHeader eyebrow="Website navigation" title="网站导航" />
          <EmptyState />
        </section>

        <div class="homepage__end" aria-hidden="true">
          <span></span>
          <i></i>
          <span></span>
        </div>
      </div>
    </main>

    <button class="back-top" aria-label="返回顶部" type="button" @click="scrollToTop">
      <span aria-hidden="true"></span>
      <small>顶部</small>
    </button>
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
  grid-template-columns: 408px minmax(0, 1fr) 142px;
  gap: 17px;
  align-items: stretch;
}

.map-card,
.carousel-card,
.utility-card {
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

.utility-card {
  overflow: hidden;
  background: #fff;
  border: 1px solid #ece5e1;
  box-shadow: var(--section-shadow);

  &__heading {
    display: grid;
    height: 49px;
    place-items: center;
    color: #fff;
    background: linear-gradient(135deg, #d9272e, #b91119);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  &__qr {
    padding: 14px 14px 7px;

    p {
      margin: 8px 0 0;
      color: #938b87;
      font-size: 12px;
      text-align: center;
    }
  }

  > button {
    display: flex;
    align-items: center;
    gap: 9px;
    width: calc(100% - 24px);
    height: 46px;
    padding: 0 10px;
    margin: 9px 12px 0;
    color: #6d625d;
    cursor: default;
    background: #fff8f4;
    border: 1px solid #f0ddd5;
    border-radius: 2px;
    font-size: 13px;

    span {
      display: inline-grid;
      width: 24px;
      height: 24px;
      place-items: center;
      color: #fff;
      background: #d7272d;
      border-radius: 50%;
      font-size: 12px;
    }
  }
}

.feature-row,
.data-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-card {
  min-height: 368px;

  &__body {
    padding: 20px;
  }
}

.media-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
  padding: 20px;

  &__item {
    padding-bottom: 13px;
    background: #faf9f8;
    border: 1px solid #eee8e4;
  }

  &__copy {
    padding: 12px 10px 0;

    span,
    i {
      display: block;
      height: 8px;
      background: #dedad7;
      border-radius: 4px;
    }

    span {
      width: 82%;
      height: 10px;
      margin-bottom: 10px;
      background: #cbc5c1;
    }

    i {
      width: 100%;
      margin-top: 7px;

      &:last-child {
        width: 64%;
      }
    }
  }
}

.data-card {
  min-height: 270px;
}

.website-nav {
  min-height: 255px;
  margin-top: 20px;
}

.back-top {
  position: fixed;
  right: 26px;
  bottom: 30px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 58px;
  color: #fff;
  cursor: pointer;
  background: rgb(183 19 27 / 88%);
  border-radius: 4px;
  box-shadow: 0 7px 19px rgb(100 15 19 / 20%);

  span {
    width: 11px;
    height: 11px;
    margin-top: 5px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(45deg);
  }

  small {
    margin-top: 4px;
    font-size: 11px;
  }
}

@media (max-width: 1399px) {
  .showcase {
    grid-template-columns: 390px minmax(0, 1fr) 135px;
    gap: 14px;
  }

  .map-card,
  .carousel-card,
  .utility-card {
    height: 360px;
  }

  .map-card__canvas svg {
    height: 266px;
  }
}
</style>
