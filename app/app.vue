<script setup lang="ts">
const { t } = useI18n()

const title = useAppConfig().title

defineOgImageComponent('SeoImage', {
  headline: t('header.home'),
  title,
  description: t('home.description'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
