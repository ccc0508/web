<script setup lang="ts">
import SiteHeader from '../components/SiteHeader.vue'
import TradeHallNav from '../components/TradeHallNav.vue'
</script>

<template>
  <div class="trade-hall-page">
    <SiteHeader mode="trade-hall" />
    <TradeHallNav />
    <main
      class="trade-hall-page__empty"
      aria-label="交易大厅空白内容区"
      data-testid="trade-hall-empty"
    ></main>
  </div>
</template>

<style scoped lang="scss">
.trade-hall-page {
  min-height: 100vh;
  background: #fff;

  &__empty {
    min-height: calc(100vh - 445px);
    background: #fff;
  }
}
</style>
