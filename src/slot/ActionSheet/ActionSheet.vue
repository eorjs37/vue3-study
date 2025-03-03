<template>
  <!-- Fade In / Fade Out -->
  <Transition :name="roottransition" @enter="onRootEnter">
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
type ActionSheetProps = {
  roottransition?: string
  isshowactionsheet?: boolean
}

type ActionSheetEmits = {
  (event: 'outsidelick'): void
}
const isOpenActionSheetContainer = ref(false)
const isBottomToTop = ref(false)

const props = withDefaults(defineProps<ActionSheetProps>(), {
  roottransition: 'fade',
  isshowactionsheet: false,
})

const emits = defineEmits<ActionSheetEmits>()

function onRootEnter() {
  isBottomToTop.value = true
}

function onLeave() {
  console.log('after leave')
  isOpenActionSheetContainer.value = false
}

function onOutSideClick(e: PointerEvent) {
  if (e.target) {
    emits('outsidelick')
  }
}

watch(
  () => props.isshowactionsheet,
  async (val) => {
    if (val) {
      //

      isOpenActionSheetContainer.value = true
    } else {
      //
      isBottomToTop.value = false
    }
  },
)
</script>
<style scoped src="./actionsheet.css"></style>
