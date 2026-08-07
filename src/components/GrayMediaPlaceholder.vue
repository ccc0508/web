<script setup lang="ts">
withDefaults(defineProps<{ ratio?: string; label?: string }>(), {
  ratio: '16 / 10',
  label: '图片占位',
})
</script>

<template>
  <div class="gray-media" :style="{ aspectRatio: ratio }" role="img" :aria-label="label">
    <span class="gray-media__icon" aria-hidden="true"></span>
    <span>{{ label }}</span>
  </div>
</template>

<style scoped lang="scss">
.gray-media {
  display: grid;
  place-content: center;
  gap: 8px;
  width: 100%;
  min-height: 50px;
  overflow: hidden;
  color: #aaa5a2;
  background:
    linear-gradient(135deg, rgb(255 255 255 / 30%), transparent 48%),
    #ddd;
  border: 1px solid #d5d1ce;
  font-size: 12px;
  text-align: center;

  &__icon {
    position: relative;
    display: block;
    width: 30px;
    height: 24px;
    margin: 0 auto;
    border: 2px solid #bab6b3;
    border-radius: 3px;

    &::before {
      position: absolute;
      top: 5px;
      left: 6px;
      width: 5px;
      height: 5px;
      content: '';
      border: 1px solid #bab6b3;
      border-radius: 50%;
    }

    &::after {
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 14px;
      height: 14px;
      content: '';
      border-top: 2px solid #bab6b3;
      border-left: 2px solid #bab6b3;
      transform: rotate(45deg) skew(-8deg, -8deg);
    }
  }
}
</style>
