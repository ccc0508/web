<script setup lang="ts">
import type { TradeHallPage } from '../config/tradeHall'

const pages: { id: TradeHallPage; label: string }[] = [
  { id: 'trade-hall', label: '交易大厅' },
  { id: 'member', label: '会员中心' },
  { id: 'disclaimer', label: '免责声明' },
  { id: 'agreement', label: '服务协议' },
  { id: 'guide', label: '交易指南' },
]

const model = defineModel<TradeHallPage>({ required: true })
</script>

<template>
  <nav class="trade-hall-nav" aria-label="交易大厅导航" data-testid="trade-hall-nav">
    <div class="site-container trade-hall-nav__inner">
      <button
        v-for="page in pages"
        :key="page.id"
        :aria-current="model === page.id ? 'page' : undefined"
        :class="['trade-hall-nav__item', { 'trade-hall-nav__item--active': model === page.id }]"
        type="button"
        @click="model = page.id"
      >
        {{ page.label }}
      </button>

      <RouterLink class="trade-hall-nav__platform" :to="{ name: 'home' }">
        &gt;&gt; 佛山市农村集体“三资”智慧云平台
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.trade-hall-nav {
  position: relative;
  z-index: 4;
  height: 60px;
  color: #fff;
  background: #df170b;
  box-shadow: 0 4px 10px rgb(121 22 15 / 12%);

  &__inner {
    display: flex;
    align-items: stretch;
    width: 1200px;
    height: 100%;
  }

  &__item,
  &__platform {
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    font-size: 17px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
  }

  &__item {
    flex: 0 0 142px;
    cursor: pointer;
    background: transparent;

    &:first-child {
      flex-basis: 132px;
    }

    &--active {
      color: #fff;
      cursor: pointer;
      background: #f6b927;
      box-shadow: inset 0 -2px 0 rgb(226 146 12 / 34%);
    }
  }

  &__platform {
    flex: 0 0 425px;
    margin-left: auto;
    cursor: pointer;
  }
}

@media (max-width: 1399px) {
  .trade-hall-nav {
    &__item {
      flex-basis: 132px;
      font-size: 16px;

      &:first-child {
        flex-basis: 124px;
      }
    }

    &__platform {
      flex-basis: 410px;
      font-size: 16px;
    }
  }
}
</style>
