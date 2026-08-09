import { createRouter, createWebHistory } from 'vue-router'
import ComprehensiveInfoView from '../views/ComprehensiveInfoView.vue'
import ExpiringAssetsView from '../views/ExpiringAssetsView.vue'
import HomeView from '../views/HomeView.vue'
import PortalPlaceholderView from '../views/PortalPlaceholderView.vue'
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
      path: '/three-assets-disclosure',
      name: 'three-assets-disclosure',
      component: PortalPlaceholderView,
      props: { title: '三资公开' },
    },
    {
      path: '/rural-engineering-procurement',
      name: 'rural-engineering-procurement',
      component: PortalPlaceholderView,
      props: { title: '农村工程和采购' },
    },
    {
      path: '/village-investment',
      name: 'village-investment',
      component: PortalPlaceholderView,
      props: { title: '村域招商' },
    },
    {
      path: '/financial-supermarket',
      name: 'financial-supermarket',
      component: PortalPlaceholderView,
      props: { title: '金融超市' },
    },
    {
      path: '/warning-list',
      name: 'warning-list',
      component: PortalPlaceholderView,
      props: { title: '警示名单' },
    },
    {
      path: '/trade-hall',
      name: 'trade-hall',
      component: TradeHallView,
    },
  ],
})

export default router
