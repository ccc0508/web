<script setup lang="ts">
import {
  Calendar,
  DocumentChecked,
  EditPen,
  Money,
  Postcard,
  Reading,
  Stamp,
  Wallet,
} from '@element-plus/icons-vue'

const steps = [
  { label: '阅读公告', icon: Reading },
  { label: '报名获取保证金账户', icon: Wallet },
  { label: '缴纳交易保证金', icon: Money },
  { label: '资格审核、优先权审核', icon: Postcard },
  { label: '出价竞投', icon: Stamp },
  { label: '结果公示', icon: Calendar },
  { label: '合同签订', icon: EditPen },
  { label: '交易结束', icon: DocumentChecked },
]
</script>

<template>
  <section class="trade-process" aria-label="竞投流程" data-testid="trade-hall-process">
    <div class="site-container">
      <h2 class="trade-process__title">竞投流程</h2>
      <ol class="trade-process__steps">
        <template v-for="(step, index) in steps" :key="step.label">
          <li class="trade-process__step">
            <span class="trade-process__icon" aria-hidden="true">
              <component :is="step.icon" />
            </span>
            <span class="trade-process__label">{{ step.label }}</span>
          </li>
          <li v-if="index < steps.length - 1" class="trade-process__arrow" aria-hidden="true">»</li>
        </template>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">
.trade-process {
  position: relative;
  min-height: 186px;
  padding: 48px 0 14px;
  margin-top: 26px;
  background: linear-gradient(90deg, #ffe0bc 0%, #fff8d9 48%, #ffdfc0 100%);

  .site-container {
    width: 1200px;
  }

  &__title {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 274px;
    height: 30px;
    margin: 0;
    color: #fff;
    background: #ef382f;
    border-radius: 0 0 24px 24px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.04em;
    transform: translateX(-50%);

    &::before,
    &::after {
      position: absolute;
      top: 6px;
      width: 48px;
      height: 18px;
      content: '';
      background-image: radial-gradient(circle, rgb(255 255 255 / 54%) 2px, transparent 2.5px);
      background-size: 9px 8px;
    }

    &::before {
      left: 14px;
    }

    &::after {
      right: 14px;
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
    width: 76px;
    height: 76px;
    color: #fff;
    background: #ff858b;
    border: 8px solid rgb(255 129 124 / 22%);
    border-radius: 50%;
    box-shadow: 0 5px 12px rgb(233 81 73 / 16%);

    svg {
      width: 37px;
      height: 37px;
      stroke-width: 1.6;
    }
  }

  &__label {
    max-width: 132px;
    margin-top: 8px;
    color: #191919;
    font-size: 16px;
    line-height: 1.18;
    text-align: center;
  }

  &__arrow {
    display: flex;
    flex: 0 0 48px;
    align-items: center;
    justify-content: center;
    margin-top: 19px;
    color: #ef4a2c;
    font-family: Georgia, serif;
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
    transform: skewX(-10deg);
  }
}
</style>
