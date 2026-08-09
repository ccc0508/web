<script setup lang="ts">
import BackToTop from '../components/BackToTop.vue'
import ComingSoon from '../components/ComingSoon.vue'
import ExpiringAssetsFilterPanel from '../components/ExpiringAssetsFilterPanel.vue'
import PrimaryNav from '../components/PrimaryNav.vue'
import SiteHeader from '../components/SiteHeader.vue'
</script>

<template>
  <div class="expiring-assets-page">
    <SiteHeader />
    <PrimaryNav />

    <main class="expiring-assets-page__main">
      <div class="expiring-assets-page__breadcrumb-wrap">
        <div class="site-container expiring-assets-breadcrumb" aria-label="当前位置">
          <span class="expiring-assets-breadcrumb__pin" aria-hidden="true"><i></i></span>
          <span>当前位置</span>
          <button type="button" @click="$router.push({ name: 'home' })">首页</button>
          <span aria-hidden="true">/</span>
          <span>临期资产</span>
        </div>
      </div>

      <div class="site-container expiring-assets-page__body">
        <ExpiringAssetsFilterPanel />
        <section
          class="expiring-assets-results"
          aria-label="临期资产结果"
          data-testid="expiring-assets-results"
        >
          <ComingSoon />
        </section>
      </div>
    </main>

    <BackToTop />
  </div>
</template>

<style scoped lang="scss">
.expiring-assets-page {
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

.expiring-assets-breadcrumb {
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

.expiring-assets-results {
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
