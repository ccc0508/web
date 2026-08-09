<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import CompactFilterOptionGroup from './CompactFilterOptionGroup.vue'
import {
  createDefaultExpiringAssetsState,
  expiringAssetsCategoryOptions,
  expiringAssetsDeadlineOptions,
  expiringAssetsDistrictOptions,
  expiringAssetsTownOptions,
  type ExpiringAssetsFilterState,
} from '../config/expiringAssets'

const state = reactive<ExpiringAssetsFilterState>(createDefaultExpiringAssetsState())
const defaultState = createDefaultExpiringAssetsState()
const isMoreExpanded = ref(false)

const selectedConditions = computed(() => {
  const labels: Array<[keyof ExpiringAssetsFilterState, string]> = [
    ['district', '区'],
    ['town', '镇街'],
    ['expiryDeadline', '到期期限'],
    ['assetCategory', '资产类别'],
  ]

  const conditions = labels
    .filter(([key]) => state[key] !== defaultState[key])
    .map(([key, label]) => `${label}：${state[key]}`)

  if (state.confirmedKeyword) {
    conditions.push(`关键字：${state.confirmedKeyword}`)
  }

  return conditions
})

const resetFilters = () => {
  Object.assign(state, createDefaultExpiringAssetsState())
}

const confirmKeyword = () => {
  state.confirmedKeyword = state.keyword.trim()
}
</script>

<template>
  <section
    class="expiring-assets-filter-panel"
    :data-asset-category="state.assetCategory"
    :data-district="state.district"
    :data-expiry-deadline="state.expiryDeadline"
    :data-town="state.town"
    data-testid="expiring-assets-filter-panel"
    aria-label="临期资产筛选"
  >
    <header class="expiring-assets-filter-panel__header">
      <div
        class="expiring-assets-filter-panel__selected"
        data-testid="expiring-assets-selected-conditions"
      >
        <strong>已选条件：</strong>
        <span
          v-for="condition in selectedConditions"
          :key="condition"
          class="expiring-assets-filter-panel__condition"
        >
          {{ condition }}
        </span>
      </div>
      <button class="expiring-assets-filter-panel__reset" type="button" @click="resetFilters">
        全部撤销
      </button>
    </header>

    <div class="expiring-assets-filter-panel__groups">
      <CompactFilterOptionGroup
        v-model="state.district"
        group-id="district"
        label="区"
        :options="expiringAssetsDistrictOptions"
        test-id-prefix="expiring-assets-filter"
      />
      <CompactFilterOptionGroup
        v-model="state.town"
        group-id="town"
        label="镇街"
        :options="expiringAssetsTownOptions"
        test-id-prefix="expiring-assets-filter"
      />
      <CompactFilterOptionGroup
        v-model="state.expiryDeadline"
        group-id="expiry-deadline"
        label="到期期限"
        :options="expiringAssetsDeadlineOptions"
        test-id-prefix="expiring-assets-filter"
      />
      <CompactFilterOptionGroup
        v-model="state.assetCategory"
        group-id="asset-category"
        label="资产类别"
        :options="expiringAssetsCategoryOptions"
        show-tail-arrow
        tail-arrow-after="“四荒”地"
        test-id-prefix="expiring-assets-filter"
      />
    </div>

    <div
      v-if="isMoreExpanded"
      id="expiring-assets-additional-filters"
      class="expiring-assets-filter-panel__advanced"
      data-testid="expiring-assets-additional-filters"
    >
      <div class="expiring-assets-filter-panel__advanced-row" role="group" aria-label="关键字">
        <span class="expiring-assets-filter-panel__advanced-label">关键字：</span>
        <div class="expiring-assets-filter-panel__advanced-controls">
          <input
            v-model="state.keyword"
            aria-label="临期资产关键字"
            placeholder="请输入关键字"
            type="search"
            @keyup.enter="confirmKeyword"
          />
          <button
            class="expiring-assets-filter-panel__confirm"
            type="button"
            @click="confirmKeyword"
          >
            确定
          </button>
        </div>
      </div>
    </div>

    <button
      :class="[
        'expiring-assets-filter-panel__more',
        { 'expiring-assets-filter-panel__more--expanded': isMoreExpanded },
      ]"
      :aria-expanded="isMoreExpanded"
      aria-controls="expiring-assets-additional-filters"
      type="button"
      @click="isMoreExpanded = !isMoreExpanded"
    >
      <span>更多选项(关键字)</span>
      <i aria-hidden="true"></i>
    </button>
  </section>
</template>

<style scoped lang="scss">
.expiring-assets-filter-panel {
  --compact-filter-label-width: 120px;

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
    grid-template-columns: 120px minmax(0, 1fr);
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
      width: 220px;
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
