<script setup lang="ts">
import { ref } from 'vue'
import GrayMediaPlaceholder from './GrayMediaPlaceholder.vue'

const tabs = ['工作动态', '通知公告', '行业资讯', '警示曝光', '帮扶协作']
const activeTab = ref(tabs[0])
</script>

<template>
  <article class="information-panel" data-testid="information-panel" :data-active-tab="activeTab">
    <div class="information-panel__tabs" aria-label="资讯分类" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :id="`information-tab-${index}`"
        :key="tab"
        :aria-controls="`information-panel-${index}`"
        :aria-selected="activeTab === tab"
        :class="{ 'is-active': activeTab === tab }"
        :data-testid="`information-tab-${index}`"
        role="tab"
        type="button"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
      <span class="information-panel__more">更多&gt;</span>
    </div>

    <div
      :id="`information-panel-${tabs.indexOf(activeTab)}`"
      class="information-panel__content"
      role="tabpanel"
      :aria-labelledby="`information-tab-${tabs.indexOf(activeTab)}`"
    >
      <div class="information-panel__lead">
        <GrayMediaPlaceholder :label="`${activeTab}图片占位`" ratio="4 / 3" />
        <div class="information-panel__summary" aria-hidden="true">
          <span class="information-panel__category">{{ activeTab }}</span>
          <i class="is-title"></i>
          <i class="is-title is-short"></i>
          <i></i>
          <i></i>
          <i class="is-short"></i>
        </div>
      </div>

      <div class="information-panel__list" aria-label="资讯内容占位">
        <div v-for="index in 5" :key="index" class="information-panel__row">
          <span aria-hidden="true"></span>
          <i :class="{ 'is-short': index === 2 || index === 5 }"></i>
          <em></em>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.information-panel {
  height: 380px;
  padding: 21px 22px 18px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ece5e1;
  box-shadow: var(--section-shadow);

  &__tabs {
    display: flex;
    align-items: center;
    gap: 11px;
    height: 48px;
    border-bottom: 1px solid #eee8e4;

    button {
      height: 40px;
      padding: 0 20px;
      color: #282421;
      cursor: pointer;
      background: #f0f1f3;
      font-size: 16px;
      white-space: nowrap;
      transition: color 140ms ease, background 140ms ease;

      &.is-active {
        color: #fff;
        background: linear-gradient(180deg, #ed4037, #df2f28);
        font-weight: 700;
      }
    }
  }

  &__more {
    margin-left: auto;
    color: #8d8783;
    font-size: 13px;
    white-space: nowrap;
  }

  &__content {
    padding-top: 16px;
  }

  &__lead {
    display: grid;
    grid-template-columns: 168px minmax(0, 1fr);
    gap: 18px;
    height: 135px;
    padding-bottom: 14px;
    border-bottom: 1px solid #eee8e4;

    :deep(.gray-media) {
      height: 120px;
      aspect-ratio: auto !important;
    }
  }

  &__summary {
    padding-top: 2px;

    i {
      display: block;
      width: 100%;
      height: 7px;
      margin-top: 10px;
      background: #dedad7;
      border-radius: 4px;

      &.is-title {
        height: 12px;
        margin-top: 9px;
        background: #c7c1bd;
      }

      &.is-short {
        width: 68%;
      }
    }
  }

  &__category {
    display: inline-block;
    padding: 3px 9px;
    color: #c62229;
    background: #fff2ee;
    border-left: 3px solid #d52229;
    font-size: 12px;
  }

  &__list {
    padding-top: 10px;
  }

  &__row {
    display: grid;
    grid-template-columns: 7px minmax(0, 1fr) 68px;
    gap: 10px;
    align-items: center;
    height: 30px;

    span {
      width: 5px;
      height: 5px;
      background: #d12a30;
      border-radius: 50%;
    }

    i,
    em {
      display: block;
      height: 7px;
      background: #d9d5d2;
      border-radius: 4px;
    }

    i.is-short {
      width: 76%;
    }

    em {
      width: 54px;
      margin-left: auto;
      background: #e6e2df;
    }
  }
}

@media (max-width: 1399px) {
  .information-panel {
    padding-inline: 18px;

    &__tabs {
      gap: 8px;

      button {
        padding-inline: 15px;
        font-size: 15px;
      }
    }

    &__lead {
      grid-template-columns: 154px minmax(0, 1fr);
    }
  }
}
</style>
