<script setup lang="ts">
defineProps<{
  label: string
  options: string[]
  modelValue: string
}>()

defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="filter-group" role="radiogroup" :aria-label="label">
    <span class="filter-group__label">{{ label }}：</span>
    <div class="filter-group__body">
      <div class="filter-group__options">
        <button
          v-for="option in options"
          :key="option"
          :aria-checked="modelValue === option"
          :class="['filter-group__option', { 'is-selected': modelValue === option }]"
          role="radio"
          type="button"
          @click="$emit('update:modelValue', option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-group {
  display: flex;
  align-items: flex-start;
  padding: 5px 0;

  &__label {
    flex: 0 0 152px;
    padding-top: 4px;
    color: #111;
    font-size: 14px;
    font-weight: 700;
    text-align: right;
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }

  &__option {
    min-width: 68px;
    min-height: 25px;
    padding: 4px 10px;
    color: #4a4a4a;
    cursor: pointer;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 14px;
    line-height: 15px;
    white-space: nowrap;

    &:hover {
      color: #d81f28;
      background: #fdf1f0;
    }

    &.is-selected {
      color: #fff;
      background: #ef392f;
      font-weight: 700;
    }
  }
}
</style>
