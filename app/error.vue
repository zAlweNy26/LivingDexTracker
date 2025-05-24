<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()

const errorMsg = computed(() => `error.routes.${error.statusCode}`)

watchDeep(() => error, (err) => {
  console.log(err)
}, { immediate: true })

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout>
    <div class="flex min-h-dvh w-screen flex-col items-center justify-evenly gap-8 text-center">
      <div class="flex flex-col gap-4 text-5xl font-bold">
        <span class="text-(--ui-error)">{{ error.statusCode }}</span>
        <span>{{ $t('error.routes.notAccessible') }}</span>
        <span class="whitespace-break-spaces text-2xl text-(--ui-error)">
          {{ $t($te(errorMsg) ? errorMsg : 'error.routes.fallback') }}
        </span>
      </div>
      <UButton color="error" size="xl" @click="handleError">
        {{ $t('button.backHome') }}
      </UButton>
    </div>
  </NuxtLayout>
</template>
