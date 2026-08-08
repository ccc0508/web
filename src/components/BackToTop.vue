<script setup lang="ts">
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <button
    class="back-top"
    aria-label="返回顶部"
    data-testid="back-top"
    type="button"
    @click="scrollToTop"
  >
    <span aria-hidden="true"></span>
    <small>顶部</small>
  </button>
</template>

<style scoped lang="scss">
.back-top {
  position: fixed;
  right: 26px;
  bottom: 30px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 58px;
  color: #fff;
  cursor: pointer;
  background: rgb(183 19 27 / 88%);
  border-radius: 4px;
  box-shadow: 0 7px 19px rgb(100 15 19 / 20%);

  span {
    width: 11px;
    height: 11px;
    margin-top: 5px;
    border-top: 2px solid #fff;
    border-left: 2px solid #fff;
    transform: rotate(45deg);
  }

  small {
    margin-top: 4px;
    font-size: 11px;
  }
}
</style>
