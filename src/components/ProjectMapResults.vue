<script setup lang="ts">
/**
 * 项目地图页面 - 右侧项目结果区域
 *
 * - 顶部灰色状态条：共找到 0 宗项目 + 默认/交易底价排序控件
 * - 下方纯白空白区域，不显示任何项目内容
 *
 * 排序按钮仅为视觉展示，点击不改变任何状态。
 */

/** 排序按钮点击 - 不执行任何操作 */
const handleSortClick = () => undefined
</script>

<template>
  <div class="project-results">
    <!-- 灰色状态条 -->
    <div class="project-results__status-bar">
      <div class="project-results__count">
        <span>共找到</span>
        <span class="project-results__count-num">0</span>
        <span>宗项目</span>
      </div>
      <div class="project-results__sort">
        <button
          class="project-results__sort-btn project-results__sort-btn--active"
          type="button"
          @click="handleSortClick"
        >
          默认
        </button>
        <button
          class="project-results__sort-btn"
          type="button"
          @click="handleSortClick"
        >
          交易底价
        </button>
        <span class="project-results__sort-arrows" aria-hidden="true">
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <path d="M5 0L0 5h10L5 0z" fill="#999" />
            <path d="M5 14L0 9h10l-5 5z" fill="#ccc" />
          </svg>
        </span>
      </div>
    </div>

    <!-- 空白内容区域 -->
    <div class="project-results__empty" aria-label="项目列表区域">
      <!-- 纯白空白，不显示任何内容 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-results {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;

  &__status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 16px;
    background: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
  }

  &__count {
    display: flex;
    align-items: baseline;
    gap: 4px;
    font-size: 14px;
    color: #333;

    span {
      color: #333;
    }
  }

  &__count-num {
    color: #ed7b21 !important;
    font-size: 20px;
    font-weight: 700;
  }

  &__sort {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__sort-btn {
    padding: 0;
    color: #555;
    cursor: pointer;
    background: transparent;
    border: 0;
    font-size: 14px;

    &--active {
      color: #2a7de1;
      font-weight: 600;
    }

    &:hover {
      color: #2a7de1;
    }
  }

  &__sort-arrows {
    display: flex;
    align-items: center;
    margin-left: -6px;
  }

  &__empty {
    flex: 1;
    background: #fff;
  }
}
</style>
