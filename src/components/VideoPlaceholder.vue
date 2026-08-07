<script setup lang="ts">
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const showUnavailableMessage = () => {
  ElMessage({
    message: '视频暂未接入',
    type: 'info',
    duration: 2200,
    offset: 74,
  })
}
</script>

<template>
  <button
    class="video-placeholder"
    aria-label="播放视频占位内容"
    data-testid="video-play"
    type="button"
    @click="showUnavailableMessage"
  >
    <span class="video-placeholder__label">宣传视频</span>
    <span class="video-placeholder__play" aria-hidden="true">
      <i></i>
    </span>
    <span class="video-placeholder__caption">点击播放</span>
  </button>
</template>

<style scoped lang="scss">
.video-placeholder {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  background:
    linear-gradient(155deg, rgb(255 255 255 / 12%), transparent 45%),
    linear-gradient(135deg, #b6b3b1, #8c8885);

  &::before,
  &::after {
    position: absolute;
    content: '';
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 50%;
  }

  &::before {
    top: -110px;
    right: -60px;
    width: 330px;
    height: 330px;
  }

  &::after {
    bottom: -130px;
    left: -50px;
    width: 280px;
    height: 280px;
  }

  &__label {
    position: absolute;
    top: 17px;
    left: 18px;
    padding: 5px 11px;
    background: rgb(31 29 28 / 34%);
    border-radius: 2px;
    font-size: 12px;
    letter-spacing: 0.12em;
  }

  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    width: 70px;
    height: 70px;
    place-items: center;
    background: rgb(201 21 30 / 90%);
    border: 5px solid rgb(255 255 255 / 80%);
    border-radius: 50%;
    box-shadow: 0 10px 28px rgb(48 34 32 / 24%);
    transform: translate(-50%, -55%);
    transition: transform 160ms ease, background 160ms ease;

    i {
      width: 0;
      height: 0;
      margin-left: 5px;
      border-top: 11px solid transparent;
      border-bottom: 11px solid transparent;
      border-left: 17px solid #fff;
    }
  }

  &__caption {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 18px 20px 14px;
    background: linear-gradient(transparent, rgb(32 29 27 / 50%));
    font-size: 13px;
    letter-spacing: 0.12em;
    text-align: center;
  }

  &:hover &__play {
    background: #e0222b;
    transform: translate(-50%, -55%) scale(1.07);
  }
}
</style>
