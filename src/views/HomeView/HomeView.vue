<script setup lang="ts">
import ActionSheet from '@/slot/ActionSheet/ActionSheet.vue'
import ActionSheet2 from '@/slot/ActionSheet2/ActionSheet2.vue'
import { ref } from 'vue'

const isActionSheet = ref(false)
function openActionSheet() {
  isActionSheet.value = !isActionSheet.value
}

function onOutSideClick() {
  isActionSheet.value = false
}
</script>

<template>
  <div class="center">
    <button @click="openActionSheet">액션시트</button>
    <ActionSheet2 @outsidelick="onOutSideClick" :isshowactionsheet="isActionSheet">
      <template #headetitle> ActionSheet 헤더 </template>
      <template #bottomsheetfooter>
        <div class="btn-wrap">
          <button class="btn">다음</button>
        </div>
      </template>
    </ActionSheet2>

    <ActionSheet @outsidelick="onOutSideClick" :roottransition="'fade'" :isshowactionsheet="false">
      <template #headetitle> ActionSheet 헤더 </template>

      <template #bottomsheetfooter>
        <div class="btn-wrap">
          <button class="btn">다음</button>
        </div>
      </template>
    </ActionSheet>
  </div>
</template>

<style scoped src="./homeview.css"></style>
