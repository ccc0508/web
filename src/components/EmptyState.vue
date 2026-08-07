<script setup lang="ts">
withDefaults(defineProps<{ text?: string }>(), {
  text: '暂无公开数据',
})
</script>

<template>
  <div class="empty-state" role="status">
    <div class="empty-state__graphic" aria-hidden="true">
      <span></span>
      <i></i>
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 185px;
  color: #aaa29e;

  &__graphic {
    position: relative;
    width: 64px;
    height: 52px;
    margin-bottom: 13px;
    border: 2px solid #d8d3cf;
    border-radius: 5px;
    background: #faf9f8;

    span {
      position: absolute;
      top: 12px;
      left: 13px;
      width: 15px;
      height: 15px;
      border: 2px solid #d8d3cf;
      border-radius: 50%;
    }

    i {
      position: absolute;
      right: 10px;
      bottom: 10px;
      left: 10px;
      height: 17px;
      overflow: hidden;

      &::before,
      &::after {
        position: absolute;
        width: 30px;
        height: 30px;
        content: '';
        border: 2px solid #d8d3cf;
        transform: rotate(45deg);
      }

      &::before { top: 8px; left: 0; }
      &::after { top: 11px; right: -7px; }
    }
  }

  p {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.08em;
  }
}
</style>
