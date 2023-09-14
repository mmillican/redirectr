import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OidcCallback from '@/views/OidcCallback.vue';
import LogIn from '@/views/LogIn.vue';
import AuthService from '@/services/authService';

// TODO: Type route meta

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requireAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
      // Make sure this does not get the `requireAuth` meta property
    },
    {
      path: '/oidc-callback',
      name: 'oidc-callback',
      component: OidcCallback,
      // Make sure this does not get the `requireAuth` meta property
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

const handleRequireAuth = async(to: RouteLocationNormalized) => {
  const authService = new AuthService();
  const isAuthenticated = await authService.isAuthenticated();

  if (to.meta.requireAuth && !isAuthenticated) {
    return '/login';
  }
}

router.beforeEach(handleRequireAuth);

export default router
