import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import AuthView from '../views/AuthView.vue'
import CreateCampaignView from '../views/CreateCampaignView.vue'
import ExploreView from '../views/ExploreView.vue'
import { useAuthStore } from '../stores/auth'
import CampaignDetailsView from '../views/CampaignDetailsView.vue'
import ProfileView from '../views/ProfileView.vue'
import MyCampaignsView from '../views/MyCampaignsView.vue'
import UserLayout from '../layouts/UserLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Returns to top if no saved position (like 'back' button) exists
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
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
          path: 'campaigns',
          name: 'campaigns',
          component: ExploreView
        },
        {
          path: 'campaigns/:id',
          name: 'campaign-detail',
          component: CampaignDetailsView,
          props: true
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
          path: 'create-campaign',
          name: 'create-campaign',
          component: CreateCampaignView,
          meta: { auth: true }
        },
        {
          path: 'me',
          component: UserLayout,
          meta: { auth: true },
          children: [
            {
              path: 'dashboard',
              name: 'dashboard',
              component: DashboardView
            },
            {
              path: 'profile',
              name: 'profile',
              component: ProfileView
            },
            {
              path: 'campaigns',
              name: 'my-campaigns',
              component: MyCampaignsView
            }
          ]
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

  console.log('router')

  if (to.meta.auth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
})

export default router
