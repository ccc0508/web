<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

type HeaderMode = 'home' | 'trade-hall'

const router = useRouter()

const props = withDefaults(defineProps<{ mode?: HeaderMode }>(), {
  mode: 'home',
})

const keyword = ref('')
const searchType = ref('本站文章')
const isTradeHall = computed(() => props.mode === 'trade-hall')

const headerCopy = computed(() => isTradeHall.value
  ? {
      welcome: '欢迎进入佛山市农村集体“三资”智慧云平台',
      title: '佛山市农村集体“三资”智慧云平台交易系统',
      subtitle: '佛山市农村产权流转交易管理服务平台',
      slogan: '科技赋能未来乡村、数字赋能乡村振兴',
      searchPlaceholder: '请输入你要查询的信息',
    }
  : {
      welcome: '您好，欢迎来到广东省农村集体“三资”智慧云平台！',
      title: '广东省农村集体“三资”智慧云平台',
      subtitle: '广东省农村产权流转交易管理服务平台',
      slogan: '科技赋能未来乡村　数字赋能乡村振兴',
      searchPlaceholder: '请输入您要搜索的内容',
    })

const now = new Date()
const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()]
const dateText = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日　${weekday}`

const keepPresentationOnly = () => undefined

const goToProjectMap = () => router.push('/project-map')
</script>

<template>
  <header :class="['site-header', { 'site-header--trade-hall': isTradeHall }]">
    <div class="welcome-bar">
      <div class="site-container welcome-bar__inner">
        <span>{{ headerCopy.welcome }}</span>
        <span data-testid="welcome-date">{{ dateText }}</span>
      </div>
    </div>

    <div :class="['brand-hero', { 'brand-hero--trade-hall': isTradeHall }]">
      <div class="brand-hero__glow brand-hero__glow--left" aria-hidden="true"></div>
      <div class="brand-hero__glow brand-hero__glow--right" aria-hidden="true"></div>
      <div class="site-container brand-hero__inner">
        <div :class="['brand-lockup', { 'brand-lockup--trade-hall': isTradeHall }]">
          <div class="brand-emblem" aria-hidden="true">
            <span class="brand-emblem__sun"></span>
            <span class="brand-emblem__field brand-emblem__field--one"></span>
            <span class="brand-emblem__field brand-emblem__field--two"></span>
            <span class="brand-emblem__field brand-emblem__field--three"></span>
          </div>
          <div class="brand-lockup__copy">
            <p class="brand-lockup__slogan">{{ headerCopy.slogan }}</p>
            <h1>{{ headerCopy.title }}</h1>
            <p class="brand-lockup__subtitle">{{ headerCopy.subtitle }}</p>
          </div>
        </div>

        <form
          :class="['search-panel', { 'search-panel--trade-hall': isTradeHall }]"
          :aria-label="isTradeHall ? '交易大厅搜索' : '站内搜索'"
          role="search"
          @submit.prevent="keepPresentationOnly"
        >
          <div :class="['search-panel__field', { 'search-panel__field--plain': isTradeHall }]">
            <select v-if="!isTradeHall" v-model="searchType" aria-label="搜索范围">
              <option>本站文章</option>
              <option>交易公告</option>
            </select>
            <span v-if="!isTradeHall" class="search-panel__divider" aria-hidden="true"></span>
            <input
              v-model="keyword"
              aria-label="搜索关键词"
              autocomplete="off"
              :placeholder="headerCopy.searchPlaceholder"
              type="search"
            />
          </div>
          <button class="search-panel__submit" type="submit">搜索</button>
          <button class="search-panel__map" type="button" @click="goToProjectMap">
            <span class="search-panel__pin" aria-hidden="true"></span>
            项目地图
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.welcome-bar {
  height: 39px;
  color: #827d79;
  background: #f2f1f0;
  border-bottom: 1px solid #ebe7e4;
  font-size: 13px;

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
}

.brand-hero {
  position: relative;
  height: 346px;
  overflow: hidden;
  background:
    linear-gradient(118deg, rgb(255 255 255 / 76%) 0 13%, transparent 36%),
    radial-gradient(circle at 72% 40%, rgb(255 255 255 / 90%) 0 3%, transparent 26%),
    linear-gradient(180deg, #fff9f7 0%, #ffebe8 100%);

  &::before,
  &::after {
    position: absolute;
    bottom: -110px;
    width: 560px;
    height: 255px;
    content: '';
    border-radius: 50%;
    border: 1px solid rgb(205 57 60 / 8%);
    transform: rotate(-8deg);
  }

  &::before {
    left: -110px;
    box-shadow: 0 0 0 42px rgb(224 85 80 / 3%), 0 0 0 88px rgb(224 85 80 / 2%);
  }

  &::after {
    right: -80px;
    box-shadow: 0 0 0 48px rgb(224 85 80 / 3%), 0 0 0 96px rgb(224 85 80 / 2%);
  }

  &__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-top: 42px;
  }

  &__glow {
    position: absolute;
    width: 310px;
    height: 310px;
    opacity: 0.35;
    border: 42px solid #f7dcd6;
    border-radius: 50%;

    &--left {
      top: 65px;
      left: -210px;
    }

    &--right {
      top: -190px;
      right: -120px;
    }
  }
}

.brand-lockup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &__copy {
    position: relative;
    text-align: center;
  }

  &__slogan {
    margin: 0 0 2px;
    color: #b23836;
    font-family: "STKaiti", "KaiTi", serif;
    font-size: 17px;
    letter-spacing: 0.22em;
  }

  h1 {
    margin: 0;
    color: #bd1d25;
    font-family: "STKaiti", "KaiTi", "FangSong", serif;
    font-size: 53px;
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: 0.045em;
    text-shadow: 0 2px 0 rgb(255 255 255 / 75%);
  }

  &--trade-hall {
    h1 {
      max-width: 1060px;
      font-size: 45px;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .brand-lockup__slogan {
      letter-spacing: 0.18em;
    }
  }

  &__subtitle {
    display: flex;
    align-items: center;
    gap: 14px;
    justify-content: center;
    margin: 5px 0 0;
    color: #8f332f;
    font-family: "STKaiti", "KaiTi", serif;
    font-size: 21px;
    letter-spacing: 0.28em;

    &::before,
    &::after {
      width: 78px;
      height: 1px;
      content: '';
      background: linear-gradient(90deg, transparent, #c76d67);
    }

    &::after {
      transform: scaleX(-1);
    }
  }
}

.brand-emblem {
  position: relative;
  width: 88px;
  height: 86px;
  margin-right: 26px;
  transform: translateY(5px);

  &__sun {
    position: absolute;
    top: 5px;
    left: 32px;
    width: 23px;
    height: 23px;
    border: 5px solid #c41b24;
    border-radius: 50%;
  }

  &__field {
    position: absolute;
    left: 5px;
    width: 78px;
    height: 42px;
    border: 8px solid transparent;
    border-top-color: #c41b24;
    border-radius: 50%;
    transform: rotate(-7deg);

    &--one { top: 34px; }
    &--two { top: 49px; transform: rotate(7deg); }
    &--three { top: 64px; transform: rotate(-2deg); }
  }
}

.search-panel {
  display: flex;
  align-items: stretch;
  width: 930px;
  height: 52px;
  margin-top: 42px;
  filter: drop-shadow(0 8px 14px rgb(143 31 34 / 9%));

  &__field {
    display: flex;
    flex: 1;
    align-items: center;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e5252b;
    border-right: 0;
    border-radius: 4px 0 0 4px;

    select {
      width: 132px;
      height: 100%;
      padding: 0 20px;
      color: #4b4542;
      cursor: pointer;
      background: #fff;
      border: 0;
      appearance: auto;
    }

    input {
      flex: 1;
      height: 100%;
      padding: 0 21px;
      color: #3e3937;
      background: #fff;
      border: 0;
      outline: 0;

      &::placeholder {
        color: #b0aaa6;
      }
    }

    &--plain {
      border-radius: 6px 0 0 6px;

      input {
        padding-inline: 24px;
      }
    }
  }

  &--trade-hall {
    width: 930px;

    .search-panel__submit {
      width: 134px;
      letter-spacing: 0.08em;
    }

    .search-panel__map {
      width: 168px;
      margin-left: 28px;
      background: rgb(255 255 255 / 82%);
    }
  }

  &__divider {
    width: 1px;
    height: 23px;
    background: #ded8d5;
  }

  &__submit,
  &__map {
    color: #fff;
    cursor: pointer;
  }

  &__submit {
    width: 112px;
    background: linear-gradient(180deg, #ee3339, #d91c24);
    font-size: 17px;
    letter-spacing: 0.16em;
  }

  &__map {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    width: 140px;
    margin-left: 14px;
    color: #ca1b22;
    background: rgb(255 255 255 / 70%);
    border: 1px solid #d7252c;
    border-radius: 4px;
    font-size: 16px;
  }

  &__pin {
    position: relative;
    width: 16px;
    height: 20px;
    border: 2px solid currentColor;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg) scale(0.8);

    &::after {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 4px;
      height: 4px;
      content: '';
      border: 1px solid currentColor;
      border-radius: 50%;
    }
  }
}

@media (max-width: 1399px) {
  .brand-lockup--trade-hall {
    h1 {
      max-width: 990px;
      font-size: 42px;
    }
  }

  .search-panel--trade-hall {
    width: 900px;
  }
}
</style>
