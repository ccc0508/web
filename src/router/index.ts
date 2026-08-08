import { createRouter, createWebHistory } from 'vue-router'
import ComprehensiveInfoView from '../views/ComprehensiveInfoView.vue'
import HomeView from '../views/HomeView.vue'
import TradeHallView from '../views/TradeHallView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/comprehensive-info',
      name: 'comprehensive-info',
      component: ComprehensiveInfoView,
    },
    {
      path: '/trade-hall',
      name: 'trade-hall',
      component: TradeHallView,
    },
  ],
})

export default router
