<template>
  <div class="coming-soon" data-testid="coming-soon" role="status">
    <div class="coming-soon__gavel" aria-hidden="true">
      <span class="coming-soon__gavel-head"></span>
      <span class="coming-soon__gavel-handle"></span>
    </div>
    <p class="coming-soon__title">敬请期待...</p>
    <p class="coming-soon__subtitle">Coming soon...</p>
  </div>
</template>

<style scoped lang="scss">
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 58px 24px 64px;

  &__gavel {
    position: relative;
    width: 116px;
    height: 86px;
    margin-bottom: 18px;
  }

  &__gavel-head {
    position: absolute;
    top: 8px;
    left: 9px;
    width: 88px;
    height: 28px;
    background: #dcd6d2;
    border-radius: 14px;

    &::before,
    &::after {
      position: absolute;
      top: 3px;
      width: 20px;
      height: 22px;
      content: '';
      background: #e9e4e1;
      border-radius: 50%;
    }

    &::before {
      left: 6px;
    }

    &::after {
      right: 6px;
    }
  }

  &__gavel-handle {
    position: absolute;
    top: 22px;
    left: 55px;
    width: 50px;
    height: 15px;
    background: #dcd6d2;
    border-radius: 8px;
    transform: rotate(38deg);
    transform-origin: 8px 8px;
  }

  &__title {
    margin: 0 0 8px;
    color: #6f6864;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  &__subtitle {
    margin: 0;
    color: #a8a29e;
    font-size: 14px;
    letter-spacing: 0.16em;
  }
}
</style>
