import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import HomeView from '@views/HomeView.vue'
import AboutView from '@views/AboutView.vue'
import TermsView from '@views/TermsView.vue'
import BoxesView from '@views/BoxesView.vue'
import FaqView from '@views/FaqView.vue'
import FeedbackView from '@views/FeedbackView.vue'
import PokedexView from '@views/PokedexView.vue'
import GuideView from '@views/GuideView.vue'
import AuthView from '@views/AuthView.vue'
import SettingsView from '@views/SettingsView.vue'
import PrivacyView from '@views/PrivacyView.vue'
import QuestView from '@views/QuestView.vue'
import JumpView from '@views/JumpView.vue'
import AttributionsView from '@views/AttributionsView.vue'
import NotFoundView from '@views/NotFoundView.vue'
import ConquestView from '@views/ConquestView.vue'

const router = createRouter({
  linkActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokedexView
    },
    {
      path: '/faqs',
      name: 'faqs',
      component: FaqView
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackView
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView
    },
    {
      path: '/boxes',
      name: 'boxes',
      component: BoxesView
    },
    {
      path: '/contact',
      name: 'contact',
      component: AboutView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView
    },
    {
      path: '/policy',
      name: 'policy',
      component: PrivacyView
    },
    {
      path: '/attributions',
      name: 'attributions',
      component: AttributionsView
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
          component: QuestView
        },
        {
          path: 'magikarp_jump',
          name: 'magikarp_jump',
          component: JumpView
        },
        {
          path: 'pokemon_conquest',
          name: 'pokemon_conquest',
          component: ConquestView
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: NotFoundView,
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
