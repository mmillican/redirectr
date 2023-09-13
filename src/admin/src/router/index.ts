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
    },
    {
      path: '/oidc-callback',
      name: 'oidc-callback',
      component: OidcCallback,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
