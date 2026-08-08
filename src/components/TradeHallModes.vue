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
  padding: 18px 0 12px;
  background: #fff;

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 8px;
  }

  &__tab {
    position: relative;
    height: 38px;
    padding: 0 22px;
    color: #d81f28;
    cursor: pointer;
    background: #fdecea;
    border-radius: 4px 4px 0 0;
    font-size: 16px;
    white-space: nowrap;

    &:hover {
      background: #fbdcd9;
    }

    &.is-active {
      color: #fff;
      background: #d81f28;
      font-weight: 700;

      &::after {
        position: absolute;
        bottom: -8px;
        left: 50%;
        width: 0;
        height: 0;
        content: '';
        border-top: 7px solid #d81f28;
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
    gap: 8px;
    height: 36px;
    padding: 0 14px;
    margin: 0 0 8px;
    color: #9c9692;
    background: #f0eeee;
    border: 1px solid #e2ddda;
    border-radius: 3px;
    font-size: 14px;

    i {
      width: 0;
      height: 0;
      border-top: 5px solid #a9a29e;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }
  }
}

@media (max-width: 1399px) {
  .trade-modes {
    &__tab {
      padding-inline: 17px;
      font-size: 15px;
    }
  }
}
</style>
