<script lang="ts" setup>
const { toggleTheme } = useSettingsStore()
</script>

<template>
  <ClientOnly>
    <UButton variant="outline" color="neutral" square @click="toggleTheme()">
      <UIcon name="i-tabler-moon" class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <UIcon name="i-tabler-sun" class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span class="sr-only">{{ $t('theme.toggle') }}</span>
    </UButton>
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
