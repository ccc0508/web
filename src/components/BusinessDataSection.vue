<script setup lang="ts">
import { computed, ref } from 'vue'
import EmptyState from './EmptyState.vue'

interface CategoryItem {
  label: string
  glyph: string
  color: string
}

interface DistrictItem {
  label: string
  color: string
}

interface ProjectRecord {
  name: string
  region: string
  date: string
}

const props = withDefaults(
  defineProps<{
    sectionId: string
    titleLead: string
    titleRest: string
    tabs?: string[]
    categories?: CategoryItem[]
    districts?: DistrictItem[]
    records?: Record<string, ProjectRecord[]>
  }>(),
  {
    tabs: () => [],
    categories: () => [],
    districts: () => [],
    records: () => ({}),
  },
)

const initialControl = props.tabs[0] ?? props.districts[0]?.label ?? props.categories[0]?.label ?? ''
const activeControl = ref(initialControl)
const fullTitle = computed(() => `${props.titleLead}${props.titleRest}`)
const activeRecords = computed(() => props.records[activeControl.value] ?? [])
const categoryOffset = ref(0)
const categoryDirection = ref<'next' | 'previous'>('next')
const visibleCategoryCount = computed(() => Math.min(7, props.categories.length))
const canSlideCategories = computed(() => props.categories.length > visibleCategoryCount.value)
const visibleCategories = computed(() =>
  Array.from(
    { length: visibleCategoryCount.value },
    (_, index) => props.categories[(categoryOffset.value + index) % props.categories.length],
  ),
)

const slideCategories = (step: -1 | 1) => {
  if (!canSlideCategories.value) return

  categoryDirection.value = step === 1 ? 'next' : 'previous'
  categoryOffset.value = (categoryOffset.value + step + props.categories.length) % props.categories.length
}
</script>

<template>
  <article
    :class="[
      'business-section',
      { 'business-section--categories': categories.length > 0, 'business-section--districts': districts.length > 0 },
    ]"
    :data-active-control="activeControl"
    :data-category-offset="categoryOffset"
    :data-testid="`business-${sectionId}`"
  >
    <header class="business-section__header">
      <div class="business-section__title">
        <span class="business-section__title-rule" aria-hidden="true"></span>
        <h2>
          <strong>{{ titleLead }}</strong>
          <span>{{ titleRest }}</span>
        </h2>
      </div>

      <div v-if="tabs.length" class="business-section__tabs" :aria-label="`${fullTitle}分类`" role="tablist">
        <button
          v-for="(tab, index) in tabs"
          :key="tab"
          :aria-selected="activeControl === tab"
          :class="{ 'is-active': activeControl === tab }"
          :data-testid="`${sectionId}-tab-${index}`"
          role="tab"
          type="button"
          @click="activeControl = tab"
        >
          {{ tab }}
        </button>
      </div>

      <button class="business-section__more" type="button">
        更多 <span aria-hidden="true"></span>
      </button>
    </header>

    <div v-if="categories.length" class="business-section__categories" :aria-label="`${fullTitle}资产分类`">
      <button
        class="business-section__arrow"
        aria-label="上一组分类"
        :data-testid="`${sectionId}-category-previous`"
        :disabled="!canSlideCategories"
        type="button"
        @click="slideCategories(-1)"
      >
        <span aria-hidden="true"></span>
      </button>

      <div class="business-section__category-viewport" aria-live="polite">
        <Transition :name="`category-${categoryDirection}`" mode="out-in">
          <div :key="categoryOffset" class="business-section__category-track">
            <button
              v-for="category in visibleCategories"
              :key="category.label"
              :aria-pressed="activeControl === category.label"
              class="business-section__category"
              :data-testid="`${sectionId}-category-${category.label}`"
              :style="{ '--category-color': category.color }"
              type="button"
              @click="activeControl = category.label"
            >
              <span class="business-section__bubble" aria-hidden="true">{{ category.glyph }}</span>
              <em>{{ category.label }}</em>
            </button>
          </div>
        </Transition>
      </div>

      <button
        class="business-section__arrow business-section__arrow--next"
        aria-label="下一组分类"
        :data-testid="`${sectionId}-category-next`"
        :disabled="!canSlideCategories"
        type="button"
        @click="slideCategories(1)"
      >
        <span aria-hidden="true"></span>
      </button>
    </div>

    <div v-if="districts.length" class="business-section__districts" :aria-label="`${fullTitle}区域`">
      <button
        v-for="(district, index) in districts"
        :key="district.label"
        :aria-pressed="activeControl === district.label"
        :class="{ 'is-active': activeControl === district.label }"
        :data-testid="`${sectionId}-district-${index}`"
        :style="{ '--district-color': district.color }"
        type="button"
        @click="activeControl = district.label"
      >
        <span aria-hidden="true"></span>
        {{ district.label }}
      </button>
    </div>

    <div v-if="activeRecords.length" class="business-section__records" aria-live="polite">
      <table>
        <thead>
          <tr>
            <th scope="col">项目名称</th>
            <th scope="col">所属地区</th>
            <th scope="col">发布日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in activeRecords" :key="`${record.name}-${record.date}`">
            <td>{{ record.name }}</td>
            <td>{{ record.region }}</td>
            <td>{{ record.date }}</td>
          </tr>
        </tbody>
      </table>
      <span class="business-section__view-more">查看更多&gt;</span>
    </div>

    <div v-else class="business-section__empty">
      <EmptyState />
    </div>
  </article>
</template>

<style scoped lang="scss">
.business-section {
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #ece5e1;
  box-shadow: var(--section-shadow);

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 83px;
    padding: 0 35px;

    &::after {
      position: absolute;
      right: 35px;
      bottom: 18px;
      left: 155px;
      height: 1px;
      content: '';
      background: linear-gradient(90deg, #f5d9d2, #e5e3e1 55%, #eceae8);
    }
  }

  &__title {
    position: relative;
    z-index: 1;
    display: flex;
    flex: 0 0 300px;
    align-items: center;

    &-rule {
      width: 5px;
      height: 42px;
      margin-right: 15px;
      background: #e12620;
    }

    h2 {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin: 0;
      font-family: "STKaiti", "KaiTi", "Microsoft YaHei", sans-serif;
      font-weight: 400;
      white-space: nowrap;

      strong {
        color: #df241d;
        font-size: 38px;
        font-weight: 700;
      }

      span {
        color: #14110f;
        font-size: 28px;
      }
    }
  }

  &__tabs {
    position: relative;
    z-index: 2;
    display: flex;
    align-self: stretch;
    gap: 42px;
    align-items: center;

    button {
      position: relative;
      height: 100%;
      padding: 0;
      color: #171412;
      cursor: pointer;
      background: transparent;
      font-size: 18px;
      font-weight: 700;
      white-space: nowrap;

      &::after {
        position: absolute;
        right: 0;
        bottom: 18px;
        left: 0;
        height: 4px;
        content: '';
        background: transparent;
      }

      &.is-active {
        color: #e52a24;

        &::after {
          background: #ee3a32;
        }
      }
    }
  }

  &__more {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
    color: #97918d;
    cursor: default;
    background: #fff;
    font-size: 14px;

    span {
      width: 8px;
      height: 8px;
      border-top: 1px solid #aaa4a0;
      border-right: 1px solid #aaa4a0;
      transform: rotate(45deg);
    }
  }

  &__categories {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr) 48px;
    gap: 10px;
    align-items: start;
    padding: 10px 26px 20px;
  }

  &__category-viewport {
    min-width: 0;
    min-height: 111px;
    overflow: hidden;
  }

  &__category-track {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 10px;
  }

  &__category {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    color: #1c1917;
    cursor: pointer;
    background: transparent;

    em {
      max-width: 118px;
      margin-top: 9px;
      font-size: 15px;
      font-style: normal;
      line-height: 1.3;
      text-align: center;
    }
  }

  &__bubble {
    display: grid;
    width: 68px;
    height: 68px;
    place-items: center;
    color: #fff;
    background: linear-gradient(145deg, color-mix(in srgb, var(--category-color), white 20%), var(--category-color));
    border: 4px solid color-mix(in srgb, var(--category-color), white 72%);
    border-radius: 50%;
    box-shadow: 0 5px 13px rgb(76 49 39 / 12%);
    font-family: "STKaiti", "KaiTi", serif;
    font-size: 27px;
    font-weight: 700;
  }

  &__arrow {
    display: grid;
    width: 43px;
    height: 43px;
    place-items: center;
    margin-top: 13px;
    cursor: pointer;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 5px 17px rgb(55 44 40 / 13%);
    transition: box-shadow 140ms ease, transform 140ms ease, opacity 140ms ease;

    &:hover:not(:disabled) {
      box-shadow: 0 7px 20px rgb(55 44 40 / 20%);
      transform: translateY(-1px);
    }

    &:disabled {
      cursor: default;
      opacity: 0.45;
    }

    span {
      width: 10px;
      height: 10px;
      border-bottom: 2px solid #27333a;
      border-left: 2px solid #27333a;
      transform: rotate(45deg) translate(1px, -1px);
    }

    &--next span {
      transform: rotate(225deg) translate(1px, -1px);
    }
  }

  .category-next-enter-active,
  .category-next-leave-active,
  .category-previous-enter-active,
  .category-previous-leave-active {
    transition: opacity 150ms ease, transform 150ms ease;
  }

  .category-next-enter-from,
  .category-previous-leave-to {
    opacity: 0;
    transform: translateX(28px);
  }

  .category-next-leave-to,
  .category-previous-enter-from {
    opacity: 0;
    transform: translateX(-28px);
  }

  &__districts {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
    padding: 4px 38px 17px;

    button {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      height: 53px;
      padding: 0 12px;
      color: #171412;
      cursor: pointer;
      background: transparent;
      border-radius: 3px;
      font-size: 17px;
      font-weight: 700;
      transition: background 140ms ease;

      span {
        width: 30px;
        height: 30px;
        flex: 0 0 auto;
        background: var(--district-color);
        clip-path: polygon(13% 20%, 44% 5%, 66% 17%, 92% 12%, 83% 42%, 97% 65%, 69% 72%, 60% 96%, 31% 82%, 7% 90%, 14% 55%, 0 38%);
        box-shadow: inset 0 0 0 4px rgb(255 255 255 / 25%);
      }

      &.is-active {
        background: #fff2ef;
      }
    }
  }

  &__empty {
    min-height: 155px;
    border-top: 1px solid #f0ebe8;

    :deep(.empty-state) {
      min-height: 155px;
    }
  }

  &__records {
    padding: 0 34px 24px;
    border-top: 1px solid #f0ebe8;

    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      color: #14110f;
      font-size: 15px;
    }

    th,
    td {
      height: 48px;
      padding: 0 12px;
      border-right: 1px solid #fff;
      border-bottom: 1px solid #e8e8e8;
      text-align: left;
      vertical-align: middle;
    }

    th {
      height: 50px;
      background: #f7f7f7;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }

    th:first-child,
    td:first-child {
      width: 51%;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 27%;
    }

    th:last-child,
    td:last-child {
      width: 22%;
      text-align: center;
    }

    tbody tr {
      cursor: default;
    }
  }

  &__view-more {
    display: block;
    margin-top: 12px;
    color: #817b77;
    font-size: 14px;
    text-align: center;
    cursor: default;
  }
}

@media (max-width: 1399px) {
  .business-section {
    &__header {
      padding-inline: 24px;

      &::after {
        right: 24px;
      }
    }

    &__title {
      flex-basis: 275px;

      h2 {
        gap: 10px;

        strong { font-size: 35px; }
        span { font-size: 26px; }
      }
    }

    &__tabs {
      gap: 30px;

      button { font-size: 17px; }
    }

    &__categories {
      padding-inline: 18px;
      gap: 6px;
    }

    &__category em {
      font-size: 14px;
    }
  }
}
</style>
