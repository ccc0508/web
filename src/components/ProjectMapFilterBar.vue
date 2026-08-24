<script setup lang="ts">
/**
 * 项目地图页面 - 顶部筛选导航区
 *
 * 包含：平台品牌、项目搜索、资产类型/交易模式/交易类别/交易底价筛选、
 * 报名开始时间日期范围、最右侧地区入口。
 *
 * 所有控件仅为视觉展示，不触发搜索、不改变地图或右侧内容。
 */
import { ref } from 'vue'
import {
  assetTypeOptions,
  basePriceOptions,
  transactionCategoryOptions,
  transactionModeOptions,
} from '../config/projectMap'

defineProps<{
  currentRegion: string
}>()

const emit = defineEmits<{
  (e: 'open-region'): void
}>()

const keyword = ref('')
const assetType = ref('')
const transactionMode = ref('')
const transactionCategory = ref('')
const basePrice = ref('')
const startDate = ref('')
const endDate = ref('')

/** 搜索按钮点击 - 不执行任何查询 */
const handleSearch = () => undefined
</script>

<template>
  <div class="filter-bar">
    <!-- 左侧：平台品牌 -->
    <div class="filter-bar__brand">
      <div class="filter-bar__emblem" aria-hidden="true">
        <img alt="" src="/assets/fahu-xiangzi-logo.png" />
      </div>
      <div class="filter-bar__brand-text">
        <strong>广东省农村集体“三资”智慧云平台</strong>
        <p>广东省农村产权流转交易管理服务平台</p>
      </div>
    </div>

    <!-- 中间：搜索框 + 搜索按钮 -->
    <div class="filter-bar__search">
      <input
        v-model="keyword"
        type="search"
        class="filter-bar__search-input"
        placeholder="请输入项目名称搜索"
        aria-label="项目名称搜索"
      />
      <button class="filter-bar__search-btn" type="button" @click="handleSearch">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#fff" stroke-width="2.5" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#fff" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- 筛选条件区 -->
    <div class="filter-bar__filters">
      <select v-model="assetType" class="filter-bar__select" aria-label="资产类型">
        <option value="">资产类型</option>
        <option v-for="opt in assetTypeOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <span class="filter-bar__divider" aria-hidden="true"></span>

      <select v-model="transactionMode" class="filter-bar__select" aria-label="交易模式">
        <option value="">交易模式</option>
        <option v-for="opt in transactionModeOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <span class="filter-bar__divider" aria-hidden="true"></span>

      <select v-model="transactionCategory" class="filter-bar__select" aria-label="交易类别">
        <option value="">交易类别</option>
        <option v-for="opt in transactionCategoryOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <span class="filter-bar__divider" aria-hidden="true"></span>

      <select v-model="basePrice" class="filter-bar__select" aria-label="交易底价">
        <option value="">交易底价</option>
        <option v-for="opt in basePriceOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <span class="filter-bar__divider" aria-hidden="true"></span>

      <!-- 报名开始时间 -->
      <div class="filter-bar__date-range">
        <span class="filter-bar__date-label">报名开始时间</span>
        <input
          v-model="startDate"
          type="date"
          class="filter-bar__date-input"
          aria-label="开始日期"
        />
        <span class="filter-bar__date-sep">至</span>
        <input
          v-model="endDate"
          type="date"
          class="filter-bar__date-input"
          aria-label="结束日期"
        />
      </div>
    </div>

    <!-- 最右侧：地区入口 -->
    <button
      class="filter-bar__region"
      type="button"
      aria-label="选择地区"
      @click="emit('open-region')"
    >
      {{ currentRegion }}
      <span class="filter-bar__region-arrow" aria-hidden="true">▾</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0;
  width: 100%;
  min-width: 1320px;
  height: 72px;
  padding: 0 20px;
  background: #fff;
  border-bottom: 1px solid #e8e2de;
  box-shadow: 0 2px 8px rgb(0 0 0 / 4%);

  /* 平台品牌区 */
  &__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    margin-right: 20px;
  }

  &__emblem {
    width: 48px;
    height: 48px;
    flex-shrink: 0;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__brand-text {
    strong {
      display: block;
      color: #bd1d25;
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
    }

    p {
      margin: 2px 0 0;
      color: #8f332f;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  /* 搜索区 */
  &__search {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    margin-right: 16px;
  }

  &__search-input {
    width: 220px;
    height: 36px;
    padding: 0 12px;
    background: #fff;
    border: 1px solid #ddd;
    border-right: 0;
    border-radius: 4px 0 0 4px;
    font-size: 13px;
    outline: none;

    &::placeholder {
      color: #b0aaa6;
    }

    &:focus {
      border-color: #c9151e;
    }
  }

  &__search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 36px;
    cursor: pointer;
    background: linear-gradient(180deg, #ee3339, #d91c24);
    border: 0;
    border-radius: 0 4px 4px 0;
  }

  /* 筛选条件区 */
  &__filters {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 0;
    min-width: 0;
  }

  &__select {
    height: 36px;
    padding: 0 10px;
    color: #4b4542;
    cursor: pointer;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 13px;
    appearance: auto;

    &:focus {
      border-color: #c9151e;
    }
  }

  &__divider {
    width: 1px;
    height: 20px;
    margin: 0 8px;
    background: #e0ddd9;
  }

  &__date-range {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  &__date-label {
    color: #4b4542;
    font-size: 13px;
    white-space: nowrap;
  }

  &__date-input {
    width: 130px;
    height: 36px;
    padding: 0 8px;
    color: #4b4542;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 13px;
    outline: none;

    &:focus {
      border-color: #c9151e;
    }
  }

  &__date-sep {
    color: #8e8884;
    font-size: 13px;
  }

  /* 地区入口 */
  &__region {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
    padding: 0 4px;
    margin-left: 16px;
    color: #c9151e;
    cursor: pointer;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #c9151e;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;

    &:hover {
      color: #a80f17;
    }
  }

  &__region-arrow {
    font-size: 10px;
  }
}
</style>
