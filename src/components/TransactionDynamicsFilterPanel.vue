<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import CompactFilterOptionGroup from './CompactFilterOptionGroup.vue'
import { guangdongCityOptions } from '../config/guangdongCities'
import {
  createDefaultTransactionDynamicsState,
  transactionAmountOptions,
  transactionAnnouncementOptions,
  transactionAssetCategoryOptions,
  transactionPublishDateOptions,
  transactionTradeModeOptions,
  type TransactionDynamicsFilterState,
} from '../config/transactionDynamics'

const state = reactive<TransactionDynamicsFilterState>(createDefaultTransactionDynamicsState())
const defaultState = createDefaultTransactionDynamicsState()
const isMoreExpanded = ref(false)

const rangeText = (start: string, end: string) => {
  if (!start && !end) return ''
  return `（${start || '未填'} 至 ${end || '未填'}）`
}

const selectedConditions = computed(() => {
  const labels: Array<[keyof TransactionDynamicsFilterState, string]> = [
    ['city', '市'],
    ['assetCategory', '资产类别'],
    ['tradeMode', '交易模式'],
    ['announcementType', '公告类型'],
  ]

  const conditions = labels
    .filter(([key]) => state[key] !== defaultState[key])
    .map(([key, label]) => `${label}：${state[key]}`)

  if (state.amount !== defaultState.amount) {
    const detail =
      state.amount === '自定义金额'
        ? `自定义金额${rangeText(state.customAmountStart, state.customAmountEnd)}`
        : state.amount
    conditions.push(`成交金额：${detail}`)
  }

  if (state.publishDate !== defaultState.publishDate) {
    const detail =
      state.publishDate === '自定义日期'
        ? `自定义日期${rangeText(state.customPublishDateStart, state.customPublishDateEnd)}`
        : state.publishDate
    conditions.push(`发布日期：${detail}`)
  }

  if (state.confirmedKeyword) {
    conditions.push(`关键字：${state.confirmedKeyword}`)
  }

  return conditions
})

const resetFilters = () => {
  Object.assign(state, createDefaultTransactionDynamicsState())
}

const confirmAmount = () => {
  if (state.customAmountStart || state.customAmountEnd) {
    state.amount = '自定义金额'
  }
}

const confirmPublishDate = () => {
  if (state.customPublishDateStart || state.customPublishDateEnd) {
    state.publishDate = '自定义日期'
  }
}

const confirmKeyword = () => {
  state.confirmedKeyword = state.keyword.trim()
}
</script>

<template>
  <section
    class="transaction-filter-panel"
    :data-announcement-type="state.announcementType"
    :data-amount="state.amount"
    :data-asset-category="state.assetCategory"
    :data-city="state.city"
    :data-publish-date="state.publishDate"
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
        v-model="state.city"
        group-id="city"
        label="市"
        :options="guangdongCityOptions"
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

    <div
      v-if="isMoreExpanded"
      id="transaction-additional-filters"
      class="transaction-filter-panel__advanced"
      data-testid="transaction-additional-filters"
    >
      <div class="transaction-filter-panel__advanced-row" role="radiogroup" aria-label="成交金额">
        <span class="transaction-filter-panel__advanced-label">成交金额：</span>
        <div class="transaction-filter-panel__advanced-controls">
          <button
            v-for="option in transactionAmountOptions"
            :key="option"
            :aria-checked="state.amount === option"
            :class="[
              'transaction-filter-panel__advanced-option',
              { 'is-selected': state.amount === option },
            ]"
            role="radio"
            type="button"
            @click="state.amount = option"
          >
            {{ option }}
          </button>
          <input
            v-model="state.customAmountStart"
            aria-label="成交金额下限"
            inputmode="numeric"
            placeholder="最低金额"
            type="number"
            @focus="state.amount = '自定义金额'"
          />
          <span class="transaction-filter-panel__range-separator" aria-hidden="true">-</span>
          <input
            v-model="state.customAmountEnd"
            aria-label="成交金额上限"
            inputmode="numeric"
            placeholder="最高金额"
            type="number"
            @focus="state.amount = '自定义金额'"
          />
          <button class="transaction-filter-panel__confirm" type="button" @click="confirmAmount">
            确定
          </button>
        </div>
      </div>

      <div class="transaction-filter-panel__advanced-row" role="radiogroup" aria-label="发布日期">
        <span class="transaction-filter-panel__advanced-label">发布日期：</span>
        <div class="transaction-filter-panel__advanced-controls">
          <button
            v-for="option in transactionPublishDateOptions"
            :key="option"
            :aria-checked="state.publishDate === option"
            :class="[
              'transaction-filter-panel__advanced-option',
              { 'is-selected': state.publishDate === option },
            ]"
            role="radio"
            type="button"
            @click="state.publishDate = option"
          >
            {{ option }}
          </button>
          <input
            v-model="state.customPublishDateStart"
            aria-label="发布开始日期"
            type="date"
            @focus="state.publishDate = '自定义日期'"
          />
          <span class="transaction-filter-panel__range-separator" aria-hidden="true">至</span>
          <input
            v-model="state.customPublishDateEnd"
            aria-label="发布结束日期"
            type="date"
            @focus="state.publishDate = '自定义日期'"
          />
          <button
            class="transaction-filter-panel__confirm"
            type="button"
            @click="confirmPublishDate"
          >
            确定
          </button>
        </div>
      </div>

      <div class="transaction-filter-panel__advanced-row" role="group" aria-label="关键字">
        <span class="transaction-filter-panel__advanced-label">关键字：</span>
        <div class="transaction-filter-panel__advanced-controls">
          <input
            v-model="state.keyword"
            aria-label="交易动态关键字"
            class="transaction-filter-panel__keyword"
            placeholder="请输入关键字"
            type="search"
            @keyup.enter="confirmKeyword"
          />
          <button class="transaction-filter-panel__confirm" type="button" @click="confirmKeyword">
            确定
          </button>
        </div>
      </div>
    </div>

    <button
      :class="[
        'transaction-filter-panel__more',
        { 'transaction-filter-panel__more--expanded': isMoreExpanded },
      ]"
      :aria-expanded="isMoreExpanded"
      aria-controls="transaction-additional-filters"
      type="button"
      @click="isMoreExpanded = !isMoreExpanded"
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

  &__advanced {
    padding: 8px 17px 4px 0;
    margin-top: 3px;
    border-top: 1px dashed #e2e4e7;
  }

  &__advanced-row {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    align-items: start;
    min-height: 40px;
  }

  &__advanced-label {
    padding: 7px 8px 0 0;
    color: #111;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
  }

  &__advanced-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-width: 0;

    input {
      width: 116px;
      height: 29px;
      padding: 0 9px;
      color: #333;
      background: #fff;
      border: 1px solid #d8dce2;
      border-radius: 2px;
      font-size: 13px;

      &:focus {
        border-color: #ed382c;
        outline: 0;
      }
    }

    input[type='date'] {
      width: 138px;
    }
  }

  &__advanced-option {
    min-height: 29px;
    padding: 5px 15px;
    color: #080808;
    cursor: pointer;
    background: transparent;
    font-size: 14px;
    line-height: 19px;
    white-space: nowrap;

    &:hover:not(.is-selected) {
      color: #ee3528;
      background: #fff4f1;
    }

    &.is-selected {
      color: #fff;
      background: #ed382c;
    }
  }

  &__range-separator {
    padding: 0 8px;
    color: #777d83;
    font-size: 13px;
    white-space: nowrap;
  }

  &__confirm {
    height: 29px;
    padding: 0 11px;
    margin-left: 8px;
    color: #222;
    cursor: pointer;
    background: #fff;
    border: 1px solid #aeb3b8;
    border-radius: 2px;
    font-size: 13px;

    &:hover {
      color: #ed382c;
      border-color: #ed382c;
    }
  }

  &__keyword {
    width: 220px !important;
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

    &--expanded i {
      margin-top: 5px;
      transform: rotate(225deg);
    }
  }
}
</style>
