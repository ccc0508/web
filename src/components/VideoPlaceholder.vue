<template>
  <div class="video-placeholder">
    <video
      class="video-placeholder__media"
      aria-label="播放宣传视频"
      controls
      data-testid="video-play"
      playsinline
      preload="metadata"
      poster="/assets/videos/rural-assets-promo-poster.jpg"
    >
      <source src="/assets/videos/rural-assets-promo.mp4" type="video/mp4" />
      您的浏览器暂不支持视频播放。
    </video>
    <span class="video-placeholder__label">宣传视频</span>
  </div>
</template>

<style scoped lang="scss">
.video-placeholder {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #171717;

  &__media {
    display: block;
    width: 100%;
    height: 100%;
    background: #171717;
    object-fit: contain;
  }

  &__label {
    position: absolute;
    top: 17px;
    left: 18px;
    padding: 5px 11px;
    color: #fff;
    background: rgb(31 29 28 / 62%);
    border-radius: 2px;
    font-size: 12px;
    letter-spacing: 0.12em;
    pointer-events: none;
  }
}
</style>
