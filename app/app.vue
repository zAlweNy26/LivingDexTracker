<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale, t } = useI18n()
const route = useRoute()
const error = useError()
const title = useAppConfig().title

const seoTitle = computed(() => {
  const routeName = String(route.name).replace('games-', '')
  if (error.value) return t('error.routes.title', [error.value.statusCode])
  if (!routeName || routeName === 'index') return t('header.home')
  if (routeName in otherGames) return otherGames[routeName as keyof typeof otherGames]
  return t(`header.${routeName}`)
})

defineOgImageComponent('SeoImage', {
  headline: seoTitle.value,
  title,
  description: t('seoDescription'),
})
</script>

<template>
  <UApp :locale="locales[locale]" :tooltip="{ delayDuration: 300 }" :scroll-body="{ margin: false, padding: false }"
        :toaster="{ duration: 2000, position: 'bottom-right' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
