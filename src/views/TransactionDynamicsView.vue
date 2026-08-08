<script setup lang="ts">
import BackToTop from '../components/BackToTop.vue'
import ComingSoon from '../components/ComingSoon.vue'
import PrimaryNav from '../components/PrimaryNav.vue'
import SiteHeader from '../components/SiteHeader.vue'
import TransactionDynamicsFilterPanel from '../components/TransactionDynamicsFilterPanel.vue'
</script>

<template>
  <div class="transaction-dynamics-page">
    <SiteHeader />
    <PrimaryNav />

    <main class="transaction-dynamics-page__main">
      <div class="transaction-dynamics-page__breadcrumb-wrap">
        <div class="site-container transaction-breadcrumb" aria-label="当前位置">
          <span class="transaction-breadcrumb__pin" aria-hidden="true"><i></i></span>
          <span>当前位置</span>
          <button type="button" @click="$router.push({ name: 'home' })">首页</button>
          <span aria-hidden="true">/</span>
          <span>结果公示</span>
        </div>
      </div>

      <div class="site-container transaction-dynamics-page__body">
        <TransactionDynamicsFilterPanel />
        <section
          class="transaction-dynamics-results"
          aria-label="交易动态结果"
          data-testid="transaction-dynamics-results"
        >
          <ComingSoon />
        </section>
      </div>
    </main>

    <BackToTop />
  </div>
</template>

<style scoped lang="scss">
.transaction-dynamics-page {
  min-height: 100vh;
  background: #fff;

  &__main {
    min-height: 760px;
    background: #fff;
    border-top: 3px solid #d8171f;
  }

  &__breadcrumb-wrap {
    border-bottom: 1px solid #e7e9ed;
  }

  &__body {
    width: 1200px;
    min-height: 704px;
    padding: 10px 20px 44px;
  }
}

.transaction-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 52px;
  padding: 0 18px;
  color: #312e2c;
  font-size: 14px;

  button {
    padding: 0;
    color: #312e2c;
    cursor: pointer;
    background: transparent;

    &:hover {
      color: #d81f28;
    }
  }

  &__pin {
    position: relative;
    width: 13px;
    height: 16px;
    margin-right: 2px;
    background: #111;
    border-radius: 7px 7px 7px 0;
    transform: rotate(-45deg) scale(0.88);

    i {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 5px;
      height: 5px;
      background: #fff;
      border-radius: 50%;
    }
  }
}

.transaction-dynamics-results {
  display: grid;
  min-height: 335px;
  margin-top: 38px;
  place-items: center;
  background: #fff;

  :deep(.coming-soon) {
    width: 100%;
  }
}

</style>
