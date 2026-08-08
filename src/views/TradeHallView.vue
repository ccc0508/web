<script setup lang="ts">
import { computed, ref } from 'vue'
import BackToTop from '../components/BackToTop.vue'
import ComingSoon from '../components/ComingSoon.vue'
import SiteHeader from '../components/SiteHeader.vue'
import TradeHallFilterPanel from '../components/TradeHallFilterPanel.vue'
import TradeHallModes from '../components/TradeHallModes.vue'
import TradeHallNav from '../components/TradeHallNav.vue'
import TradeHallProcess from '../components/TradeHallProcess.vue'
import type { TradeHallPage, TradeModeId } from '../config/tradeHall'

const activePage = ref<TradeHallPage>('trade-hall')
const activeMode = ref<TradeModeId>('online-bid')
const isTradeHall = computed(() => activePage.value === 'trade-hall')
</script>

<template>
  <div class="trade-hall-page">
    <SiteHeader mode="trade-hall" />
    <TradeHallNav v-model="activePage" />
    <main class="trade-hall-page__main">
      <div v-show="isTradeHall" class="trade-hall-page__content" data-testid="trade-hall-content">
        <TradeHallProcess />
        <TradeHallModes v-model="activeMode" />
        <div class="site-container trade-hall-page__body">
          <TradeHallFilterPanel :mode="activeMode" />
          <section class="trade-hall-results" aria-label="交易结果" data-testid="trade-hall-results">
            <ComingSoon />
          </section>
        </div>
      </div>

      <section
        v-show="!isTradeHall"
        class="trade-hall-page__aux"
        aria-label="交易平台辅助页面"
        data-testid="trade-hall-aux-page"
      >
        <ComingSoon />
      </section>
    </main>
    <BackToTop />
  </div>
</template>

<style scoped lang="scss">
.trade-hall-page {
  min-height: 100vh;
  background: #fff;

  &__main {
    min-height: 480px;
    padding-bottom: 40px;
    background: #f5f5f5;
  }

  &__body {
    width: 1160px;
    padding-top: 0;
    background: #fff;
  }

  &__aux {
    min-height: 420px;
    background: #fff;
  }
}

.trade-hall-results {
  margin-top: 18px;
  background: #fff;
  border-top: 1px solid #dedede;
}
</style>
