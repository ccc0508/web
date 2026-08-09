<script setup lang="ts">
defineProps<{
  groupId: string
  label: string
  modelValue: string
  options: readonly string[]
  showTailArrow?: boolean
  tailArrowAfter?: string
  testIdPrefix?: string
}>()

defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div
    class="compact-filter-group"
    :data-testid="`${testIdPrefix ?? 'transaction-filter'}-${groupId}`"
    role="radiogroup"
    :aria-label="label"
  >
    <span class="compact-filter-group__label">{{ label }}：</span>
    <div class="compact-filter-group__options">
      <template v-for="option in options" :key="option">
        <button
          :aria-checked="modelValue === option"
          :class="['compact-filter-group__option', { 'is-selected': modelValue === option }]"
          role="radio"
          type="button"
          @click="$emit('update:modelValue', option)"
        >
          {{ option }}
        </button>
        <span
          v-if="showTailArrow && tailArrowAfter === option"
          class="compact-filter-group__tail-arrow"
          aria-hidden="true"
        ></span>
      </template>
      <span
        v-if="showTailArrow && !tailArrowAfter"
        class="compact-filter-group__tail-arrow"
        aria-hidden="true"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.compact-filter-group {
  display: grid;
  grid-template-columns: var(--compact-filter-label-width, 100px) minmax(0, 1fr);
  align-items: start;
  min-height: 36px;

  &__label {
    padding: 7px 8px 0 0;
    color: #111;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-width: 0;
    row-gap: 0;
  }

  &__option {
    min-height: 29px;
    padding: 5px 15px;
    color: #080808;
    cursor: pointer;
    background: transparent;
    border-radius: 0;
    font-size: 14px;
    line-height: 19px;
    white-space: nowrap;

    &:hover:not(.is-selected) {
      color: #ee3528;
      background: #fff4f1;
    }

    &.is-selected {
      color: #fff;
      background: #ed382c;
    }
  }

  &__tail-arrow {
    width: 8px;
    height: 8px;
    margin: 0 0 0 19px;
    border-top: 1px solid #8f959b;
    border-right: 1px solid #8f959b;
    transform: rotate(45deg);
  }
}
</style>
