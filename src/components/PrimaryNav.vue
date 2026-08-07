<script setup lang="ts">
const navigation = [
  '首页',
  '综合信息',
  '交易动态',
  '临期资产',
  '三资公开',
  '农村工程和采购',
  '村域招商',
  '金融超市',
  '警示名单',
  '交易大厅',
]

const keepHomepage = () => undefined
</script>

<template>
  <nav class="primary-nav" aria-label="主导航">
    <div class="site-container primary-nav__inner">
      <button
        v-for="(label, index) in navigation"
        :key="label"
        :aria-current="index === 0 ? 'page' : undefined"
        :class="[
          'primary-nav__item',
          { 'primary-nav__item--active': index === 0, 'primary-nav__item--hall': label === '交易大厅' },
        ]"
        :data-testid="`nav-${index}`"
        type="button"
        @click="keepHomepage"
      >
        <span v-if="label === '交易大厅'" class="primary-nav__hall-icon" aria-hidden="true">交</span>
        {{ label }}
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.primary-nav {
  position: relative;
  z-index: 5;
  height: 58px;
  color: #fff;
  background: linear-gradient(180deg, #d51b24, #bd121b);
  box-shadow: 0 5px 15px rgb(130 19 25 / 18%);

  &__inner {
    display: flex;
    align-items: stretch;
    height: 100%;
  }

  &__item {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    padding: 0 10px;
    color: inherit;
    cursor: default;
    background: transparent;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    transition: background 160ms ease;

    &::after {
      position: absolute;
      top: 17px;
      right: 0;
      width: 1px;
      height: 24px;
      content: '';
      background: rgb(255 255 255 / 13%);
    }

    &:last-child::after,
    &--active::after {
      display: none;
    }

    &--active {
      flex: 0 0 92px;
      color: #bd1119;
      background: linear-gradient(180deg, #ffdd6d, #ffc83c);
      box-shadow: inset 0 -4px 0 #eea51d;
    }

    &--hall {
      display: flex;
      flex: 0 0 148px;
      align-items: center;
      justify-content: center;
      gap: 9px;
      height: 68px;
      margin-top: -10px;
      background: linear-gradient(180deg, #f49335, #e6681d);
      border-radius: 8px 8px 0 0;
      box-shadow: 0 -4px 12px rgb(153 55 10 / 13%);
      font-size: 18px;
    }
  }

  &__hall-icon {
    display: inline-grid;
    width: 30px;
    height: 30px;
    place-items: center;
    color: #e97122;
    background: #fff5df;
    border-radius: 50%;
    font-size: 15px;
    font-weight: 800;
  }
}

@media (max-width: 1399px) {
  .primary-nav__item {
    padding-inline: 7px;
    font-size: 15px;
  }
}
</style>
