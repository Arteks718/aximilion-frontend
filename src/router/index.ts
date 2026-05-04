import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import AuthView from '../views/AuthView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'login',
          name: 'login',
          component: AuthView
        },
        {
          path: 'register',
          name: 'register',
          component: AuthView
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: { auth: true }
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // Wait for Supabase session to be restored before making any redirect decisions
  if (!authStore.isInitialized) {
    await authStore.initialize()
  }

  if (to.meta.auth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
