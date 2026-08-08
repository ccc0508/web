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
  padding: 12px 0;
  border-bottom: 1px dashed #efe7e3;

  &:last-child {
    border-bottom: 0;
  }

  &__label {
    flex: 0 0 96px;
    padding-top: 5px;
    color: #4a4441;
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
    gap: 8px 10px;
  }

  &__option {
    padding: 4px 12px;
    color: #5f5955;
    cursor: pointer;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 13px;
    white-space: nowrap;

    &:hover {
      color: #d81f28;
      background: #fdf1f0;
    }

    &.is-selected {
      color: #fff;
      background: #d81f28;
      font-weight: 700;
    }
  }
}
</style>
