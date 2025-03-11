import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import VoiceRecorderView from '@/views/VoiceRecorderView/VoiceRecorderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/voicerecord',
      name: 'voicerecord',
      component: VoiceRecorderView,
    },
  ],
})

export default router
