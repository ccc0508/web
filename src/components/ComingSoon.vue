<template>
  <div class="coming-soon" data-testid="coming-soon" role="status">
    <div class="coming-soon__gavel" aria-hidden="true">
      <svg viewBox="0 0 68 48">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.6">
          <path d="m17 10 17 17" />
          <path d="m11 12 8-8 20 20-8 8z" />
          <path d="m38 24 18 18" />
          <path d="m50 39 8-8 4 4-8 8z" />
          <path d="M6 43h23M9 38h17" />
        </g>
      </svg>
    </div>
    <div class="coming-soon__copy">
      <p class="coming-soon__title">敬请期待...</p>
      <p class="coming-soon__subtitle">Coming soon...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.coming-soon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 122px;
  padding: 20px 24px 28px;
  color: #e2e2e2;

  &__gavel {
    flex: 0 0 68px;
    width: 68px;
    height: 48px;
    margin-right: 15px;

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &__copy {
    min-width: 150px;
  }

  &__title {
    margin: 0;
    color: #e2e2e2;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.12;
    letter-spacing: 0.06em;
  }

  &__subtitle {
    margin: 0;
    color: #e7e7e7;
    font-size: 17px;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: 0.02em;
  }
}
</style>
