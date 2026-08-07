<script setup lang="ts">
withDefaults(defineProps<{ title: string; eyebrow?: string }>(), {
  eyebrow: '',
})
</script>

<template>
  <header class="section-header">
    <div class="section-header__title-wrap">
      <span class="section-header__mark" aria-hidden="true"></span>
      <div>
        <span v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</span>
        <h2>{{ title }}</h2>
      </div>
    </div>
    <span class="section-header__rule" aria-hidden="true"></span>
  </header>
</template>

<style scoped lang="scss">
.section-header {
  display: flex;
  align-items: center;
  height: 61px;
  padding: 0 22px;
  border-bottom: 1px solid var(--line);

  &__title-wrap {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 0 0 auto;
  }

  &__mark {
    width: 5px;
    height: 25px;
    background: linear-gradient(180deg, #ee353b, #bd1119);
    border-radius: 3px;
    box-shadow: 5px 0 0 #ffd88a;
  }

  &__eyebrow {
    display: block;
    margin-bottom: 1px;
    color: #c55a54;
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    color: #2f2a28;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
  }

  &__rule {
    flex: 1;
    height: 1px;
    margin-left: 18px;
    background: linear-gradient(90deg, #eee4df, transparent);
  }
}
</style>
