<template>
  <div>
    <button @click="voiceRecord">목소리녹음</button>
    <button @click="stopVoiceRecord">중지</button>

    <audio ref="audioEle"></audio>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mediaRecorder = ref<MediaRecorder | null>(null)
const audioStream = ref<MediaStream | null>(null)
const audioEle = ref<HTMLAudioElement | null>(null)

/**
 * @description DataAvaliable Event
 * @param e
 */
function onDataAvaliable(e: BlobEvent) {
  console.log(e.data)
}
/**
 * @description 목소리 녹음 중지
 */
function stopVoiceRecord() {
  mediaRecorder.value?.stop()
  audioStream.value?.getTracks().forEach((track) => track.stop())
}

/**
 * @description 목소리 녹음
 */
function voiceRecord() {
  if (!mediaRecorder.value) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        audioStream.value = stream
        mediaRecorder.value = new MediaRecorder(stream)
        mediaRecorder.value.addEventListener('dataavailable', onDataAvaliable)

        mediaRecorder.value.start()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function timeUpdateEvent(e: Event) {
  const target = e.target as HTMLAudioElement
  console.log(target.currentTime)
}

onMounted(() => {
  audioEle.value?.addEventListener('timeupdate', timeUpdateEvent)
})
</script>
<style scoped src="./voicerecorder.css"></style>
