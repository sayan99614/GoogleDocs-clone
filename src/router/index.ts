import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'name',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/docs/:id',
      component: () => import('../views/EditDocument.vue')
    }
  ]
})

router.beforeEach(async (to, form) => {
  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn && to.path === '/') {
    return { path: '/login' }
  } else if (!isLoggedIn && to.path === '/docs/abc') {
    return { path: '/login' }
  }
})

export default router
