<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale, t } = useI18n()

const title = useAppConfig().title

defineOgImageComponent('SeoImage', {
  headline: t('header.home'),
  title,
  description: t('home.description'),
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
