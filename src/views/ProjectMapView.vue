<script setup lang="ts">
/**
 * 项目地图页面
 *
 * 布局：
 * ┌─────────────────────────────────────────────────────┐
 * │            顶部筛选导航区（filter-bar）              │
 * ├──────────────────────────────┬──────────────────────┤
 * │                              │ 共找到 0 宗项目       │
 * │        广东省地图             │ 默认  交易底价        │
 * │    （Leaflet，可缩放/拖动）   ├──────────────────────┤
 * │                              │                      │
 * │                              │    空白展示区域       │
 * │                              │                      │
 * └──────────────────────────────┴──────────────────────┘
 *
 * 地图使用 Leaflet + OpenStreetMap 在线底图。
 * 所有筛选、搜索、排序操作均不改变地图或右侧内容。
 */
import { onMounted, onUnmounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import ProjectMapFilterBar from '../components/ProjectMapFilterBar.vue'
import ProjectMapResults from '../components/ProjectMapResults.vue'
import RegionSelectModal from '../components/RegionSelectModal.vue'
import {
  guangdongMapCenter,
  guangdongMapZoom,
  projectMapMaxNativeZoom,
  projectMapMaxZoom,
} from '../config/projectMap'

/* ── 地图相关 ── */
const mapContainer = ref<HTMLElement>()
let map: L.Map | null = null
let mapResizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value, {
    center: guangdongMapCenter,
    zoom: guangdongMapZoom,
    maxZoom: projectMapMaxZoom,
    zoomControl: true,
    scrollWheelZoom: true,
    dragging: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
  })

  // 添加高德地图底图（国内可访问）
  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; AutoNavi',
    maxNativeZoom: projectMapMaxNativeZoom,
    maxZoom: projectMapMaxZoom,
  }).addTo(map)

  // 修复 Leaflet 在 flex 布局中初次渲染尺寸不正确的问题
  setTimeout(() => map?.invalidateSize(), 200)

  // 浏览器缩放、窗口最大化或左右区域尺寸变化后，重新计算地图画布大小。
  mapResizeObserver = new ResizeObserver(() => {
    map?.invalidateSize({ animate: false })
  })
  mapResizeObserver.observe(mapContainer.value)
})

onUnmounted(() => {
  mapResizeObserver?.disconnect()
  mapResizeObserver = null
  map?.remove()
  map = null
})

/* ── 地区选择弹窗 ── */
const regionModalVisible = ref(false)
const currentRegion = ref('广东省')

const handleOpenRegion = () => {
  regionModalVisible.value = true
}

const handleRegionConfirm = (region: string) => {
  // 仅更新顶部右侧地区名称，不移动/缩放地图
  currentRegion.value = region
}
</script>

<template>
  <div class="project-map-page">
    <!-- 顶部筛选导航区 -->
    <ProjectMapFilterBar
      :current-region="currentRegion"
      @open-region="handleOpenRegion"
    />

    <!-- 下方工作区：地图 + 结果 -->
    <div class="project-map-page__workspace">
      <!-- 左侧：广东省地图 -->
      <div class="project-map-page__map-area">
        <div ref="mapContainer" class="project-map-page__map-canvas"></div>
      </div>

      <!-- 竖向分隔线 -->
      <div class="project-map-page__divider" aria-hidden="true"></div>

      <!-- 右侧：项目结果区域 -->
      <div class="project-map-page__results-area">
        <ProjectMapResults />
      </div>
    </div>

    <!-- 地区/机构选择弹窗 -->
    <RegionSelectModal
      v-model:visible="regionModalVisible"
      :current-region="currentRegion"
      @confirm="handleRegionConfirm"
    />
  </div>
</template>

<style scoped lang="scss">
.project-map-page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #fff;

  &__workspace {
    display: flex;
    flex: 1;
    min-height: 0;
  }

  &__map-area {
    flex: 1;
    min-width: 0;
    position: relative;
  }

  &__map-canvas {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__divider {
    width: 1px;
    flex-shrink: 0;
    background: #e8e2de;
  }

  &__results-area {
    flex: 0 0 360px;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
}

/* 浏览器高倍缩放时优先保留地图，避免固定宽度结果栏挤占整个视口。 */
@media (max-width: 760px) {
  .project-map-page {
    &__workspace {
      position: relative;
      display: block;
    }

    &__map-area {
      width: 100%;
      height: 100%;
    }

    &__divider,
    &__results-area {
      display: none;
    }
  }
}

/* Leaflet 地图样式微调 */
:deep(.leaflet-container) {
  width: 100%;
  height: 100%;
  background: #e8eef2;
  font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
}

:deep(.leaflet-control-attribution) {
  font-size: 11px;
}
</style>
