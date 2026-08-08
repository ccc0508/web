<script setup lang="ts">
import BackToTop from '../components/BackToTop.vue'
import ComingSoon from '../components/ComingSoon.vue'
import ComprehensiveInfoSidebar from '../components/ComprehensiveInfoSidebar.vue'
import PrimaryNav from '../components/PrimaryNav.vue'
import SiteHeader from '../components/SiteHeader.vue'
</script>

<template>
  <div class="comprehensive-info-page">
    <SiteHeader />
    <PrimaryNav />

    <main class="comprehensive-info-page__main">
      <div class="comprehensive-info-page__breadcrumb-wrap">
        <div class="site-container comprehensive-info-breadcrumb" aria-label="当前位置">
          <span class="comprehensive-info-breadcrumb__pin" aria-hidden="true">
            <i></i>
          </span>
          <span>当前位置</span>
          <button type="button" @click="$router.push({ name: 'home' })">首页</button>
          <span aria-hidden="true">/</span>
          <span>综合信息</span>
        </div>
      </div>

      <div class="site-container comprehensive-info-page__content">
        <section
          class="comprehensive-info-results"
          aria-label="综合信息内容"
          data-testid="comprehensive-info-results"
        >
          <ComingSoon />
        </section>
        <ComprehensiveInfoSidebar />
      </div>
    </main>

    <BackToTop />
  </div>
</template>

<style scoped lang="scss">
.comprehensive-info-page {
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

  &__content {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 56px;
    align-items: start;
    min-height: 704px;
    padding: 30px 30px 46px 40px;
  }
}

.comprehensive-info-breadcrumb {
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

.comprehensive-info-results {
  display: grid;
  min-width: 0;
  min-height: 620px;
  place-items: center;
  background: #fff;

  :deep(.coming-soon) {
    width: 100%;
  }
}

@media (max-width: 1399px) {
  .comprehensive-info-page__content {
    gap: 42px;
    padding-right: 28px;
    padding-left: 32px;
  }
}
</style>
