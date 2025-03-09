<template>
  <!-- Fade In / Fade Out -->
  <Transition :name="'fade'" @enter="onRootEnter">
    <div class="actionshhet-wrap" v-if="isOpenActionSheetContainer">
      <Transition name="bottomtotop" @leave="onLeave">
        <div v-if="isBottomToTop" class="bottomsheet" ref="actionsheet">
          <div class="top-bar"></div>
          <div class="bottomsheet-header">
            <h1 class="header-title">
              <slot name="headetitle"></slot>
            </h1>
          </div>
          <div class="bottomsheet-body">
            <slot name="bottomsheetbody"></slot>
          </div>
          <div class="bottomsheet-footer">
            <slot name="bottomsheetfooter"></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLElement>('actionsheet')
onClickOutside(target, onOutSideClick)
type ActionSheet2Props = {
  isshowactionsheet?: boolean
}
type ActionSheetEmits = {
  (event: 'outsidelick'): void
}

const props = withDefaults(defineProps<ActionSheet2Props>(), {
  isshowactionsheet: false,
})
const emits = defineEmits<ActionSheetEmits>()

const isOpenActionSheetContainer = ref(false)
const isBottomToTop = ref(false)

/**
 * @description 진입 애니메이션 시작
 */
function onRootEnter() {
  // BottomToTop 뜨도록 값 변경
  isBottomToTop.value = true
}

/**
 * @description 엘리멘트가 사라질때 동작하는 이벤트
 */
function onLeave() {
  isOpenActionSheetContainer.value = false
}

/**
 * @description 하얀색 부분 외부 클릭시 이벤트
 * @param e PointerEvent
 */
function onOutSideClick(e: PointerEvent) {
  if (e.target) {
    emits('outsidelick')
  }
}

watch(
  () => props.isshowactionsheet,
  (val) => {
    if (val) {
      isOpenActionSheetContainer.value = true
    } else {
      isBottomToTop.value = false
    }
  },
)
</script>
<style scoped src="./actionsheet2.css"></style>
