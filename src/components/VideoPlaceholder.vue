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
}
</style>
