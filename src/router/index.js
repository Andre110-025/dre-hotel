import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import AuthView from '@/views/authView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'auth',
      component: AuthView,
      beforeEnter: (to, from, next) => {
        const { user } = useUserStore()
        // if user hasn't logged in before 
        if (!user.expirationTime && !user.token) {
          next() // show them authview
        } else {
          next({ name: 'home' })
        }
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../components/authLogin.vue')
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../components/authSignup.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue'),
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('../views/explore.vue'),
    },
    {
      path: '/suites',
      name: 'suites',
      component: () => import('../views/suites.vue'),
    },
    {
      path: '/bookUs',
      name: 'bookUs',
      component: () => import('../views/bookUs.vue'),
    },
    {
      path: '/paymentPage',
      name: 'paymentPage',
      component: () => import('../views/paymentPage.vue'),
    },
    // {
    //   path: '/signIn',
    //   name: 'signIn',
    //   component: () => import('../views/signIn.vue')
    // },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: () => import('../views/signup.vue')
    // },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact.vue'),
    },
  ],

  linkExactActiveClass: 'text-mainColor font-semibold',
})

export default router
