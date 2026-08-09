import { createRouter, createWebHistory } from 'vue-router'
import ComprehensiveInfoView from '../views/ComprehensiveInfoView.vue'
import ExpiringAssetsView from '../views/ExpiringAssetsView.vue'
import HomeView from '../views/HomeView.vue'
import TransactionDynamicsView from '../views/TransactionDynamicsView.vue'
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
      path: '/transaction-dynamics',
      name: 'transaction-dynamics',
      component: TransactionDynamicsView,
    },
    {
      path: '/expiring-assets',
      name: 'expiring-assets',
      component: ExpiringAssetsView,
    },
    {
      path: '/trade-hall',
      name: 'trade-hall',
      component: TradeHallView,
    },
  ],
})

export default router
