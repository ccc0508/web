<script setup lang="ts">
/**
 * 地区/机构选择弹窗
 *
 * - 树形结构：广东省（根节点） → 21 个地级市
 * - 单选模式，默认选中"广东省"
 * - 点击"确定"后更新外部地区名称
 * - 点击关闭按钮不保存未确认的选择
 */
import { ref, watch } from 'vue'
import { guangdongCities } from '../config/projectMap'

const props = defineProps<{
  visible: boolean
  currentRegion: string
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'confirm', region: string): void
}>()

/** 弹窗内临时选中的地区（确认前不 affect 外部） */
const selectedRegion = ref('广东省')

// 弹窗打开时，同步当前地区到临时选中
watch(
  () => props.visible,
  (val) => {
    if (val) {
      selectedRegion.value = props.currentRegion
    }
  },
)

const handleClose = () => {
  emit('update:visible', false)
}

const handleConfirm = () => {
  emit('confirm', selectedRegion.value)
  emit('update:visible', false)
}

const handleSelect = (region: string) => {
  selectedRegion.value = region
}
</script>

<template>
  <div v-if="visible" class="region-modal-overlay" @click.self="handleClose">
    <div class="region-modal" role="dialog" aria-modal="true" aria-label="地区/机构选择">
      <!-- 标题栏 -->
      <div class="region-modal__header">
        <span class="region-modal__title">地区/机构选择</span>
        <button
          class="region-modal__close"
          type="button"
          aria-label="关闭"
          @click="handleClose"
        >
          ×
        </button>
      </div>

      <!-- 树形地区列表 -->
      <div class="region-modal__body">
        <div class="region-modal__tree">
          <!-- 根节点：广东省 -->
          <div class="region-tree__node region-tree__node--root">
            <div class="region-tree__row">
              <span class="region-tree__toggle" aria-hidden="true">▼</span>
              <label class="region-tree__label">
                <input
                  type="radio"
                  name="region"
                  value="广东省"
                  :checked="selectedRegion === '广东省'"
                  @change="handleSelect('广东省')"
                />
                <span>广东省</span>
              </label>
            </div>

            <!-- 子节点：21 个地级市 -->
            <div class="region-tree__children">
              <div
                v-for="city in guangdongCities"
                :key="city"
                class="region-tree__row"
                :class="{ 'region-tree__row--selected': selectedRegion === city }"
              >
                <label class="region-tree__label">
                  <input
                    type="radio"
                    name="region"
                    :value="city"
                    :checked="selectedRegion === city"
                    @change="handleSelect(city)"
                  />
                  <span>{{ city }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="region-modal__footer">
        <button class="region-modal__confirm" type="button" @click="handleConfirm">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.region-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 35%);
}

.region-modal {
  width: 420px;
  max-height: 560px;
  overflow: hidden;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 8px 30px rgb(0 0 0 / 18%);

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    background: #f5f5f5;
    border-bottom: 1px solid #e8e8e8;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  &__close {
    position: absolute;
    right: 12px;
    font-size: 22px;
    line-height: 1;
    color: #999;
    cursor: pointer;
    background: transparent;
    border: 0;

    &:hover {
      color: #333;
    }
  }

  &__body {
    max-height: 420px;
    padding: 12px 0;
    overflow-y: auto;
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: 12px 0 18px;
    border-top: 1px solid #f0f0f0;
  }

  &__confirm {
    padding: 7px 36px;
    color: #fff;
    cursor: pointer;
    background: #2a7de1;
    border: 0;
    border-radius: 4px;
    font-size: 15px;

    &:hover {
      background: #1a6dd1;
    }
  }
}

.region-tree {
  &__node--root {
    user-select: none;
  }

  &__row {
    display: flex;
    align-items: center;
    height: 36px;
    padding-left: 20px;
    cursor: pointer;
    transition: background 120ms ease;

    &:hover {
      background: #fffbe6;
    }

    &--selected {
      background: #fff3d6;
    }
  }

  &__toggle {
    margin-right: 6px;
    font-size: 10px;
    color: #999;
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-size: 14px;
    color: #333;

    input[type='radio'] {
      cursor: pointer;
    }
  }

  &__children {
    padding-left: 20px;
  }
}
</style>
