<script setup lang="ts">
const steps = [
  '阅读公告',
  '报名获取保证金账户',
  '缴纳交易保证金',
  '资格审核、优先权审核',
  '出价竞投',
  '结果公示',
  '合同签订',
  '交易结束',
]
</script>

<template>
  <section class="trade-process" aria-label="竞投流程" data-testid="trade-hall-process">
    <div class="site-container">
      <h2 class="trade-process__title">竞投流程</h2>
      <ol class="trade-process__steps">
        <template v-for="(step, index) in steps" :key="step">
          <li class="trade-process__step">
            <span class="trade-process__icon" aria-hidden="true">{{ index + 1 }}</span>
            <span class="trade-process__label">{{ step }}</span>
          </li>
          <li v-if="index < steps.length - 1" class="trade-process__arrow" aria-hidden="true">»</li>
        </template>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trade-process {
  padding: 30px 0 24px;
  background: #fdf8f6;
  border-bottom: 1px solid #f3e7e2;

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 0 0 28px;
    color: #c9151e;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0.14em;

    &::before,
    &::after {
      width: 112px;
      height: 3px;
      content: '';
      background: linear-gradient(90deg, transparent, #e05a52);
      border-radius: 2px;
    }

    &::after {
      transform: scaleX(-1);
    }
  }

  &__steps {
    display: flex;
    align-items: flex-start;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__step {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    min-width: 0;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    color: #fff;
    background: #f9a7bb;
    border-radius: 50%;
    font-size: 21px;
    font-weight: 700;
  }

  &__label {
    margin-top: 10px;
    color: #5b5450;
    font-size: 14px;
    line-height: 1.45;
    text-align: center;
  }

  &__arrow {
    display: flex;
    flex: 0 0 34px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    color: #f0683f;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }
}
</style>
