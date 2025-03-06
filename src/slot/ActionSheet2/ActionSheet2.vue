<template>
  <!-- Fade In / Fade Out -->
  <Transition :name="'fade'">
    <div class="actionshhet-wrap" v-if="isOpenActionSheetContainer"></div>
  </Transition>
</template>
<script setup lang="ts">
type ActionSheet2Props = {
  isshowactionsheet?: boolean
}

const props = withDefaults(defineProps<ActionSheet2Props>(), {
  isshowactionsheet: false,
})

import { ref, watch } from 'vue'

const isOpenActionSheetContainer = ref(false)

watch(
  () => props.isshowactionsheet,
  (val) => {
    if (val) {
      isOpenActionSheetContainer.value = true
    }
  },
)
</script>
<style scoped src="./actionsheet2.css"></style>
