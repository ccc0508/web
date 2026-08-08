<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import FilterOptionGroup from './FilterOptionGroup.vue'
import {
  assetCategoryOptions,
  createDefaultFilterState,
  districtOptions,
  priceOptions,
  timeOptions,
  tradeModes,
  type TradeFilterState,
  type TradeModeId,
} from '../config/tradeHall'

const props = defineProps<{ mode: TradeModeId }>()

const state = reactive<TradeFilterState>(createDefaultFilterState())
const collapsed = ref(false)

const currentMode = computed(
  () => tradeModes.find((mode) => mode.id === props.mode) ?? tradeModes[0],
)

const resetFilters = () => {
  Object.assign(state, createDefaultFilterState())
}

watch(() => props.mode, resetFilters)

const keepLocalOnly = () => undefined

const rangeText = (start: string, end: string) => {
  if (!start && !end) return ''
  return `（${start} 至 ${end}）`
}

const selectedTags = computed<string[]>(() => {
  const tags: string[] = []
  const appendGroup = (label: string, value: string, detail = '') => {
    if (value && value !== '不限') {
      tags.push(`${label}：${detail || value}`)
    }
  }

  appendGroup('所属区', state.district)
  appendGroup('资产类别', state.assetCategory)
  appendGroup('交易类别', state.transactionType)
  appendGroup(currentMode.value.statusLabel, state.status)
  appendGroup('协商方式', state.negotiationMethod)

  if (state.price !== '不限') {
    const priceDetail =
      state.price === '自定义金额'
        ? `自定义金额${rangeText(state.customPriceStart, state.customPriceEnd)}`
        : state.price
    tags.push(`交易底价：${priceDetail}`)
  }

  appendGroup('交易时间', state.tradeTime, `自定义日期${rangeText(state.customTradeTimeStart, state.customTradeTimeEnd)}`)
  appendGroup('发布日期', state.publishDate, `自定义日期${rangeText(state.customPublishDateStart, state.customPublishDateEnd)}`)

  if (state.keyword.trim()) {
    tags.push(`关键字：${state.keyword.trim()}`)
  }

  return tags
})
</script>

<template>
  <section class="filter-panel" aria-label="筛选面板" data-testid="trade-hall-filter-panel">
    <div class="filter-panel__toolbar">
      <div class="filter-panel__selected" data-testid="trade-hall-selected">
        <span class="filter-panel__selected-label">已选条件：</span>
        <span v-if="selectedTags.length" class="filter-panel__tags">
          <span v-for="tag in selectedTags" :key="tag" class="filter-panel__tag">{{ tag }}</span>
        </span>
      </div>
      <div class="filter-panel__actions">
        <button class="filter-panel__action" type="button" @click="resetFilters">清除</button>
        <button class="filter-panel__action" type="button" @click="collapsed = !collapsed">
          {{ collapsed ? '展开' : '收起' }}
        </button>
      </div>
    </div>

    <div v-show="!collapsed" class="filter-panel__body">
      <FilterOptionGroup
        v-model="state.district"
        label="所属区"
        :options="districtOptions"
      />
      <FilterOptionGroup
        v-model="state.assetCategory"
        label="资产类别"
        :options="assetCategoryOptions"
      />
      <FilterOptionGroup
        v-model="state.transactionType"
        label="交易类别"
        :options="currentMode.transactionTypes"
      />
      <FilterOptionGroup
        v-model="state.status"
        :label="currentMode.statusLabel"
        :options="currentMode.statuses"
      />
      <FilterOptionGroup
        v-if="currentMode.negotiationMethods"
        v-model="state.negotiationMethod"
        label="协商方式"
        :options="currentMode.negotiationMethods"
      />

      <div class="filter-group" role="radiogroup" aria-label="交易底价">
        <span class="filter-group__label">交易底价：</span>
        <div class="filter-group__body">
          <div class="filter-group__options">
            <button
              v-for="option in priceOptions"
              :key="option"
              :aria-checked="state.price === option"
              :class="['filter-group__option', { 'is-selected': state.price === option }]"
              role="radio"
              type="button"
              @click="state.price = option"
            >
              {{ option }}
            </button>
          </div>
          <div v-if="state.price === '自定义金额'" class="filter-group__custom">
            <input
              v-model="state.customPriceStart"
              aria-label="起始金额"
              autocomplete="off"
              inputmode="numeric"
              placeholder="起始金额"
              type="number"
            />
            <span class="filter-group__dash" aria-hidden="true">-</span>
            <input
              v-model="state.customPriceEnd"
              aria-label="结束金额"
              autocomplete="off"
              inputmode="numeric"
              placeholder="结束金额"
              type="number"
            />
            <button class="filter-group__confirm" type="button" @click="keepLocalOnly">确定</button>
          </div>
        </div>
      </div>

      <div class="filter-group" role="radiogroup" aria-label="交易时间">
        <span class="filter-group__label">交易时间：</span>
        <div class="filter-group__body">
          <div class="filter-group__options">
            <button
              v-for="option in timeOptions"
              :key="option"
              :aria-checked="state.tradeTime === option"
              :class="['filter-group__option', { 'is-selected': state.tradeTime === option }]"
              role="radio"
              type="button"
              @click="state.tradeTime = option"
            >
              {{ option }}
            </button>
          </div>
          <div v-if="state.tradeTime === '自定义日期'" class="filter-group__custom">
            <input
              v-model="state.customTradeTimeStart"
              aria-label="交易开始日期"
              type="date"
            />
            <span class="filter-group__dash" aria-hidden="true">至</span>
            <input
              v-model="state.customTradeTimeEnd"
              aria-label="交易结束日期"
              type="date"
            />
            <button class="filter-group__confirm" type="button" @click="keepLocalOnly">确定</button>
          </div>
        </div>
      </div>

      <div class="filter-group" role="radiogroup" aria-label="发布日期">
        <span class="filter-group__label">发布日期：</span>
        <div class="filter-group__body">
          <div class="filter-group__options">
            <button
              v-for="option in timeOptions"
              :key="option"
              :aria-checked="state.publishDate === option"
              :class="['filter-group__option', { 'is-selected': state.publishDate === option }]"
              role="radio"
              type="button"
              @click="state.publishDate = option"
            >
              {{ option }}
            </button>
          </div>
          <div v-if="state.publishDate === '自定义日期'" class="filter-group__custom">
            <input
              v-model="state.customPublishDateStart"
              aria-label="发布开始日期"
              type="date"
            />
            <span class="filter-group__dash" aria-hidden="true">至</span>
            <input
              v-model="state.customPublishDateEnd"
              aria-label="发布结束日期"
              type="date"
            />
            <button class="filter-group__confirm" type="button" @click="keepLocalOnly">确定</button>
          </div>
        </div>
      </div>

      <div class="filter-group" role="group" aria-label="关键字">
        <span class="filter-group__label">关键字：</span>
        <div class="filter-group__keyword-row">
          <input
            v-model="state.keyword"
            aria-label="关键字输入"
            autocomplete="off"
            class="filter-group__keyword"
            placeholder="请输入关键字"
            type="search"
          />
          <button class="filter-group__confirm" type="button" @click="keepLocalOnly">确定</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.filter-panel {
  background: #fff;
  border: 1px solid #efe6e2;
  box-shadow: 0 6px 18px rgb(99 42 35 / 5%);

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 52px;
    padding: 10px 18px;
    background: #faf6f4;
    border-bottom: 1px solid #f0e7e3;
  }

  &__selected {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding-right: 20px;
    font-size: 14px;
  }

  &__selected-label {
    color: #3f3a37;
    font-weight: 700;
    white-space: nowrap;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__tag {
    padding: 3px 10px;
    color: #c91c24;
    background: #fdeeed;
    border: 1px solid #f5c8c6;
    border-radius: 3px;
    font-size: 13px;
    white-space: nowrap;
  }

  &__actions {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
  }

  &__action {
    padding: 5px 16px;
    color: #d81f28;
    cursor: pointer;
    background: #fff;
    border: 1px solid #e6b7b5;
    border-radius: 3px;
    font-size: 14px;

    &:hover {
      background: #fdeeed;
    }
  }

  &__body {
    padding: 6px 18px 18px;
  }
}

.filter-group {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px dashed #efe7e3;

  &:last-child {
    border-bottom: 0;
  }

  &__label {
    flex: 0 0 96px;
    padding-top: 5px;
    color: #4a4441;
    font-size: 14px;
    font-weight: 700;
    text-align: right;
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 10px;
  }

  &__option {
    padding: 4px 12px;
    color: #5f5955;
    cursor: pointer;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 13px;
    white-space: nowrap;

    &:hover {
      color: #d81f28;
      background: #fdf1f0;
    }

    &.is-selected {
      color: #fff;
      background: #d81f28;
      font-weight: 700;
    }
  }

  &__custom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding: 10px 12px;
    background: #fdf8f6;
    border: 1px solid #f2e6e1;
    border-radius: 4px;

    input {
      width: 190px;
      height: 32px;
      padding: 0 10px;
      color: #403a37;
      background: #fff;
      border: 1px solid #d9cfcb;
      border-radius: 3px;

      &:focus {
        border-color: #d81f28;
        outline: 0;
      }
    }

    input[type='date'] {
      width: 162px;
    }
  }

  &__dash {
    color: #8e8884;
    white-space: nowrap;
  }

  &__confirm {
    height: 32px;
    padding: 0 18px;
    color: #fff;
    cursor: pointer;
    background: #d81f28;
    border-radius: 3px;
    font-size: 13px;

    &:hover {
      background: #c01720;
    }
  }

  &__keyword-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  &__keyword {
    width: 300px;
    height: 32px;
    padding: 0 10px;
    color: #403a37;
    background: #fff;
    border: 1px solid #d9cfcb;
    border-radius: 3px;

    &:focus {
      border-color: #d81f28;
      outline: 0;
    }
  }
}
</style>
