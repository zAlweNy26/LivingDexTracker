import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: import("@views/HomeView.vue"),
    },
    {
      path: '/auth',
      name: 'auth',
      component: import("@views/AuthView.vue"),
    },
    {
      path: '/settings',
      name: 'settings',
      component: import("@views/SettingsView.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: import("@views/PokedexView.vue"),
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: import("@views/FaqView.vue"),
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: import("@views/FeedbackView.vue"),
    },
    {
      path: '/guide',
      name: 'guide',
      component: import("@views/GuideView.vue"),
    },
    {
      path: '/boxes',
      name: 'boxes',
      component: import("@views/BoxesView.vue"),
    },
    {
      path: '/contact',
      name: 'contact',
      component: import("@views/AboutView.vue"),
    },
    {
      path: '/terms',
      name: 'terms',
      component: import("@views/TermsView.vue"),
    },
    {
      path: '/policy',
      name: 'policy',
      component: import("@views/PrivacyView.vue"),
    },
    {
      path: '/attributions',
      name: 'attributions',
      component: import("@views/AttributionsView.vue"),
    },
    {
      path: '/games',
      name: 'games',
      redirect: {
        path: '/'
      },
      children: [
        {
          path: 'pokemon_quest',
          name: 'pokemon_quest',
          component: import("@views/QuestView.vue")
        },
        {
          path: 'magikarp_jump',
          name: 'magikarp_jump',
          component: import("@views/JumpView.vue")
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: import("@views/NotFoundView.vue"),
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.requireAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        path: '/auth',
      }
    }
  }
})

export default router
