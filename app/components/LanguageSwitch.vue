<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const settings = useSettingsStore()
const { changeLocale } = settings
const { locale, locales, currentLocale } = storeToRefs(settings)

const items = computed<DropdownMenuItem[]>(() => locales.value.map(l => ({
  label: `${languagesFlags[l.code]} ${l.name}`,
  type: 'checkbox',
  onSelect: () => changeLocale(l.code),
  checked: l.code === locale.value,
})))
</script>

<template>
  <ClientOnly>
    <UDropdownMenu :items :content="{ align: 'end', sideOffset: 16 }">
      <UButton variant="outline" color="neutral" :ui="{ label: 'size-5' }"
               square :label="languagesFlags[currentLocale.code]" />
    </UDropdownMenu>
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
