import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    content: defineCollection(asSeoCollection({
      type: 'page',
      source: '**/*.md',
    })),
  },
})
