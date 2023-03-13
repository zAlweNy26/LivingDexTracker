import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import AboutView from '@views/AboutView.vue'
import TermsView from '@views/TermsView.vue'
import BoxesView from '@views/BoxesView.vue'
import FaqView from '@views/FaqView.vue'
import FeedbackView from '@views/FeedbackView.vue'
import PokedexView from '@views/PokedexView.vue'
import GuideView from '@views/GuideView.vue'
import AttributionsView from '@views/AttributionsView.vue'
import NotFoundView from '@views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/attributions',
      name: 'attributions',
      component: AttributionsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView
    }
  ]
})

export default router
