<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'
import { Slot } from 'reka-ui'

const { locale, t } = useI18n()
const route = useRoute()
const error = useError()

const title = useAppConfig().title

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

const seoTitle = computed(() => {
  const routeName = String(route.name).replace('games-', '')
  if (error.value) return t('error.routes.title', [error.value.statusCode])
  if (!routeName || routeName === 'index') return t('header.home')
  if (routeName in otherGames) return otherGames[routeName as keyof typeof otherGames]
  return t(`header.${routeName}`)
})

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
  link: [
    {
      rel: 'canonical',
      href: () => route.path,
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: `/icons/favicon-32x32.png`,
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      href: `/icons/apple-touch-icon.png`,
    },
  ],
})

useSeoMeta({
  titleTemplate: t => t ? `${t} | ${title}` : title,
  title: seoTitle,
  description: t('home.description'),
  ogImage: '/__og-image__/image/og.png',
  twitterTitle: seoTitle,
  twitterDescription: t('home.description'),
  twitterImage: `/logo_squared.webp`,
  twitterCard: 'app',
})

const head = useLocaleHead({
  dir: true,
  seo: true,
  lang: true,
  key: 'id',
})
</script>

<template>
  <div class="flex flex-col min-h-dvh">
    <NuxtLoadingIndicator
      :duration="3000" :throttle="300"
      color="repeating-linear-gradient(to right, var(--color-primary-400) 0%, var(--color-primary-900) 100%)" />
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
        </template>
        <template v-for="meta in head.meta" :key="meta.id">
          <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
        </template>
      </Head>
      <Body class="scroll-smooth min-h-dvh antialiased transition-colors">
        <UApp :locale="locales[locale]" :tooltip="{ delayDuration: 300 }"
              :toaster="{ duration: 2000, position: 'bottom-right' }">
          <NavHeader v-if="!error" />
          <Slot class="grow p-2 md:p-4">
            <slot />
          </Slot>
          <NavFooter />
        </UApp>
      </Body>
    </Html>
  </div>
</template>

<style>
.page-enter-active,
.layout-enter-active {
  transition: all 300ms ease-out;
}

.page-leave-active,
.layout-leave-active {
  transition: all 300ms cubic-bezier(1, 0.5, 0.8, 1);
}

.page-enter-from,
.page-leave-to,
.layout-enter-from,
.layout-leave-to {
  transform: translateY(20px);
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
