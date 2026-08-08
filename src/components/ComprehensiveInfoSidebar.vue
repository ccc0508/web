<script setup lang="ts">
import { ref } from 'vue'

const categories = [
  '工作动态',
  '通知公告',
  '行业资讯',
  '警示曝光',
  '线索征集',
  '帮扶协作',
  '产业规划',
  '政策法规',
] as const

const activeCategory = ref<(typeof categories)[number]>('工作动态')
const startDate = ref('')
const endDate = ref('')
const keyword = ref('')

const keepLocalOnly = () => undefined
</script>

<template>
  <aside
    class="information-sidebar"
    :data-active-category="activeCategory"
    data-testid="comprehensive-info-sidebar"
  >
    <nav class="information-categories" aria-label="综合信息栏目">
      <button
        v-for="category in categories"
        :key="category"
        :aria-current="activeCategory === category ? 'true' : undefined"
        :class="['information-category', { 'is-active': activeCategory === category }]"
        type="button"
        @click="activeCategory = category"
      >
        <span class="information-category__dot" aria-hidden="true"></span>
        <span class="information-category__label">{{ category }}</span>
        <span class="information-category__arrow" aria-hidden="true"></span>
      </button>
    </nav>

    <form
      class="information-filter"
      aria-label="综合信息查询"
      role="search"
      @submit.prevent="keepLocalOnly"
    >
      <div class="information-filter__dates" role="group" aria-label="日期范围">
        <span class="information-filter__calendar" aria-hidden="true">
          <i></i>
        </span>
        <label :class="['information-filter__date', { 'is-empty': !startDate }]">
          <span v-if="!startDate">起始时间</span>
          <input v-model="startDate" aria-label="起始时间" type="date" />
        </label>
        <b aria-hidden="true">至</b>
        <label :class="['information-filter__date', { 'is-empty': !endDate }]">
          <span v-if="!endDate">截止时间</span>
          <input v-model="endDate" aria-label="截止时间" type="date" />
        </label>
      </div>

      <input
        v-model="keyword"
        aria-label="综合信息关键字"
        autocomplete="off"
        class="information-filter__keyword"
        placeholder="关键字:"
        type="search"
      />
      <button class="information-filter__submit" type="submit">查询</button>
    </form>
  </aside>
</template>

<style scoped lang="scss">
.information-sidebar {
  width: 300px;
}

.information-categories {
  display: grid;
  gap: 10px;
}

.information-category {
  position: relative;
  display: grid;
  grid-template-columns: 34px 1fr 34px;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 8px 0 12px;
  overflow: hidden;
  color: #25211f;
  cursor: pointer;
  background: #fff5df;
  border-left: 4px solid #d9dce0;
  border-radius: 0 6px 6px 0;
  font-size: 17px;
  transition: color 150ms ease, background 150ms ease, border-color 150ms ease;

  &__dot {
    width: 8px;
    height: 8px;
    margin-left: 10px;
    background: #d9dee5;
    border-radius: 50%;
  }

  &__label {
    font-weight: 500;
    text-align: center;
  }

  &__arrow {
    width: 8px;
    height: 8px;
    margin-left: 8px;
    border-top: 2px solid #c7c9cb;
    border-right: 2px solid #c7c9cb;
    transform: rotate(45deg);
  }

  &:hover:not(.is-active) {
    color: #d92820;
    background: #fff0d3;
  }

  &.is-active {
    color: #fff;
    background: #ef3527;
    border-left-color: #f5ad00;

    .information-category__dot {
      background: #fff;
    }

    .information-category__label {
      font-weight: 700;
    }

    .information-category__arrow {
      border-color: rgb(255 255 255 / 35%);
    }
  }
}

.information-filter {
  margin-top: 29px;

  &__dates {
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) 30px minmax(0, 1fr);
    align-items: center;
    height: 30px;
    color: #1f1d1b;
    background: #fff;
    border: 1px solid #d8dee8;
    border-radius: 4px;

    b {
      font-size: 14px;
      font-weight: 400;
      text-align: center;
    }
  }

  &__calendar {
    position: relative;
    display: block;
    width: 13px;
    height: 13px;
    margin-left: 12px;
    border: 1px solid #b8c2d1;
    border-radius: 1px;

    &::before,
    &::after {
      position: absolute;
      top: -3px;
      width: 1px;
      height: 4px;
      content: '';
      background: #b8c2d1;
    }

    &::before { left: 3px; }
    &::after { right: 3px; }

    i {
      position: absolute;
      top: 3px;
      right: 1px;
      left: 1px;
      height: 1px;
      background: #b8c2d1;
    }
  }

  &__date {
    position: relative;
    display: block;
    min-width: 0;
    height: 28px;
    overflow: hidden;

    span {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      color: #b4bdca;
      pointer-events: none;
      font-size: 13px;
    }

    input {
      width: 100%;
      height: 100%;
      padding: 0;
      color: #6c7278;
      cursor: pointer;
      background: transparent;
      border: 0;
      outline: 0;
      font-size: 12px;

      &::-webkit-calendar-picker-indicator {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
      }
    }

    &.is-empty input {
      color: transparent;
    }
  }

  &__keyword {
    width: 100%;
    height: 29px;
    padding: 0 16px;
    margin-top: 19px;
    color: #4e4b48;
    background: #fff;
    border: 1px solid #d8dee8;
    border-radius: 4px;
    font-size: 13px;

    &::placeholder {
      color: #b4bdca;
    }

    &:focus {
      border-color: #e74237;
      outline: 0;
    }
  }

  &__submit {
    width: 100%;
    height: 44px;
    margin-top: 20px;
    color: #fff;
    cursor: pointer;
    background: #ed3325;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 700;

    &:hover {
      background: #dc291f;
    }
  }
}
</style>
