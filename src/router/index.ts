import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomeEntryPage.vue'),
      meta: { title: '首页', accent: 'teal' },
    },
    {
      path: '/beginner',
      name: 'beginner',
      component: () => import('@/pages/BeginnerHomePage.vue'),
      meta: { title: '新手指南', accent: 'teal' },
    },
    {
      path: '/veteran-analysis',
      name: 'veteran-analysis',
      component: () => import('@/pages/VeteranAnalysisPage.vue'),
      meta: { title: '1.0回坑指南', accent: 'orange' },
    },
    {
      path: '/advisor',
      name: 'advisor',
      component: () => import('@/pages/AiAdvisorPage.vue'),
      meta: { title: 'AI帕鲁顾问', accent: 'teal' },
    },
    {
      path: '/breeding',
      name: 'breeding',
      component: () => import('@/pages/BreedingCalculatorPage.vue'),
      meta: { title: '配种计算器', accent: 'teal' },
    },
    {
      path: '/pals',
      name: 'pal-list',
      component: () => import('@/pages/PalListPage.vue'),
      meta: { title: '帕鲁图鉴', accent: 'blue' },
    },
    {
      path: '/pals/:id',
      name: 'pal-detail',
      component: () => import('@/pages/PalDetailPage.vue'),
      meta: { title: '帕鲁图鉴', accent: 'blue' },
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/pages/MapPage.vue'),
      meta: { title: '互动地图', accent: 'purple' },
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('@/pages/CommunityHubPage.vue'),
      meta: { title: 'Community Hub', accent: 'indigo' },
    },
    {
      path: '/community/:type/:id',
      name: 'community-detail',
      component: () => import('@/pages/CommunityDetailPage.vue'),
      meta: { title: 'Community Hub', accent: 'indigo' },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `帕鲁智库 · ${String(to.meta.title ?? '首页')}`
})

export default router
