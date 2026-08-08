<script setup lang="ts">
import { computed, reactive } from 'vue'
import CompactFilterOptionGroup from './CompactFilterOptionGroup.vue'
import {
  createDefaultTransactionDynamicsState,
  transactionAnnouncementOptions,
  transactionAssetCategoryOptions,
  transactionDistrictOptions,
  transactionTownOptions,
  transactionTradeModeOptions,
  type TransactionDynamicsFilterState,
} from '../config/transactionDynamics'

const state = reactive<TransactionDynamicsFilterState>(createDefaultTransactionDynamicsState())
const defaultState = createDefaultTransactionDynamicsState()

const selectedConditions = computed(() => {
  const labels: Array<[keyof TransactionDynamicsFilterState, string]> = [
    ['district', '区'],
    ['town', '镇街'],
    ['assetCategory', '资产类别'],
    ['tradeMode', '交易模式'],
    ['announcementType', '公告类型'],
  ]

  return labels
    .filter(([key]) => state[key] !== defaultState[key])
    .map(([key, label]) => `${label}：${state[key]}`)
})

const resetFilters = () => {
  Object.assign(state, createDefaultTransactionDynamicsState())
}

const keepCollapsed = () => undefined
</script>

<template>
  <section
    class="transaction-filter-panel"
    :data-announcement-type="state.announcementType"
    :data-asset-category="state.assetCategory"
    :data-district="state.district"
    :data-town="state.town"
    :data-trade-mode="state.tradeMode"
    data-testid="transaction-filter-panel"
    aria-label="交易动态筛选"
  >
    <header class="transaction-filter-panel__header">
      <div class="transaction-filter-panel__selected" data-testid="transaction-selected-conditions">
        <strong>已选条件：</strong>
        <span
          v-for="condition in selectedConditions"
          :key="condition"
          class="transaction-filter-panel__condition"
        >
          {{ condition }}
        </span>
      </div>
      <button class="transaction-filter-panel__reset" type="button" @click="resetFilters">
        全部撤销
      </button>
    </header>

    <div class="transaction-filter-panel__groups">
      <CompactFilterOptionGroup
        v-model="state.district"
        group-id="district"
        label="区"
        :options="transactionDistrictOptions"
      />
      <CompactFilterOptionGroup
        v-model="state.town"
        group-id="town"
        label="镇街"
        :options="transactionTownOptions"
      />
      <CompactFilterOptionGroup
        v-model="state.assetCategory"
        group-id="asset-category"
        label="资产类别"
        :options="transactionAssetCategoryOptions"
      />
      <CompactFilterOptionGroup
        v-model="state.tradeMode"
        group-id="trade-mode"
        label="交易模式"
        :options="transactionTradeModeOptions"
      />
      <CompactFilterOptionGroup
        v-model="state.announcementType"
        group-id="announcement-type"
        label="公告类型"
        :options="transactionAnnouncementOptions"
        show-tail-arrow
      />
    </div>

    <button
      class="transaction-filter-panel__more"
      aria-expanded="false"
      type="button"
      @click="keepCollapsed"
    >
      <span>更多选项(成交金额、发布日期、关键字)</span>
      <i aria-hidden="true"></i>
    </button>
  </section>
</template>

<style scoped lang="scss">
.transaction-filter-panel {
  position: relative;
  padding: 12px 20px 25px;
  background: #fff;
  border: 1px solid #dcdfe3;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 36px;
  }

  &__selected {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    min-height: 25px;
    color: #111;
    font-size: 14px;

    strong {
      font-size: 15px;
    }
  }

  &__condition {
    padding: 2px 7px;
    color: #e9362c;
    background: #fff6f4;
    border: 1px solid #f0b6b0;
    border-radius: 2px;
    font-size: 12px;
  }

  &__reset {
    flex: 0 0 auto;
    padding: 4px 20px;
    color: #f0392f;
    cursor: pointer;
    background: transparent;
    font-size: 13px;

    &:hover {
      color: #c82127;
    }
  }

  &__groups {
    padding-right: 17px;
  }

  &__more {
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 260px;
    height: 28px;
    padding: 0 16px;
    color: #1f1f1f;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe3;
    border-top-color: #fff;
    font-size: 12px;
    transform: translateX(-50%);

    i {
      width: 7px;
      height: 7px;
      margin-top: -4px;
      border-right: 1px solid #858b91;
      border-bottom: 1px solid #858b91;
      transform: rotate(45deg);
    }

    &:hover {
      color: #e9362c;
    }
  }
}
</style>
