<script lang="ts" setup>
import type { DropdownMenuItem } from '#ui/types'

const settings = useSettingsStore()
const { changeLocale } = settings
const { locale, locales } = storeToRefs(useSettingsStore())

const currentLocale = computed(() => 
  locales.value.find(l => l.code === locale.value) ?? locales.value[0]
)

const items = computed<DropdownMenuItem[]>(() => locales.value.map(l => ({
  label: `${l.domain} ${l.name}`,
  onSelect: () => changeLocale(l.code),
  checked: l.code === locale.value,
} satisfies DropdownMenuItem)))
</script>

<template>
  <NuDropdownMenu :items :content="{ align: 'end', sideOffset: 16 }">
    <NuButton variant="outline" color="neutral" square :label="currentLocale.domain" />
    <template #item-trailing="{ item }">
      <NuIcon v-if="item.checked" name="i-tabler-point-filled" class="size-4" />
    </template>
  </NuDropdownMenu>
</template>