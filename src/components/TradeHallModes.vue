<script setup lang="ts">
import type { TradeModeId } from '../config/tradeHall'
import { tradeModes } from '../config/tradeHall'

const model = defineModel<TradeModeId>({ required: true })
</script>

<template>
  <section class="trade-modes" aria-label="交易模式" data-testid="trade-hall-modes">
    <div class="site-container trade-modes__inner">
      <div class="trade-modes__tabs" role="tablist" aria-label="交易模式">
        <button
          v-for="mode in tradeModes"
          :key="mode.id"
          :aria-selected="model === mode.id"
          :class="['trade-modes__tab', { 'is-active': model === mode.id }]"
          role="tab"
          type="button"
          @click="model = mode.id"
        >
          {{ mode.label }}
        </button>
      </div>

      <span
        class="trade-modes__sort"
        aria-disabled="true"
        data-testid="trade-hall-sort"
      >
        <i aria-hidden="true"></i>
        默认排序
      </span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trade-modes {
  padding: 20px 0 7px;
  background: #fff;

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    width: 1160px;
  }

  &__tabs {
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    gap: 1px;
    padding: 0;
    margin-right: 31px;
  }

  &__tab {
    position: relative;
    flex: 1 1 0;
    height: 56px;
    padding: 0 8px;
    color: #ed382e;
    cursor: pointer;
    background: #fde7e2;
    border: 1px solid #fff;
    border-radius: 0;
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;

    &:hover {
      background: #fbdad3;
    }

    &.is-active {
      color: #fff;
      background: #dd180d;
      font-weight: 700;

      &::after {
        position: absolute;
        bottom: -8px;
        left: 50%;
        width: 0;
        height: 0;
        content: '';
        border-top: 9px solid #dd180d;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        transform: translateX(-50%);
      }
    }
  }

  &__sort {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    height: 30px;
    padding: 0 12px 0 15px;
    margin: 0;
    color: #c4c8cf;
    background: #f5f7fa;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    font-size: 14px;

    i {
      width: 0;
      height: 0;
      order: 2;
      border-top: 5px solid #c4c8cf;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
  }
}

@media (max-width: 1399px) {
  .trade-modes {
    &__tab {
      padding-inline: 5px;
      font-size: 16px;
    }
  }
}
</style>
