<script lang="ts" setup>
import { PokemonCard } from '#components'

const { folder = 'gen9', card = true, suffix = '' } = defineProps<{
  name: string
  ndex: string
  suffix?: string
  formType?: string
  sprite?: boolean
  folder?: string
  card?: boolean
}>()

const modal = useOverlay().create(PokemonCard)
</script>

<template>
  <div class="flex cursor-pointer flex-col items-center p-1 transition-colors rounded-md hover:bg-[var(--ui-bg-accented)] justify-center"
       @click="card ? modal.open() : undefined">
    <img loading="lazy" class="mb-1 h-12 md:h-16 w-auto" :alt="name" :src="`/sprites/${folder}/${parseInt(ndex)}${suffix}.png`">
    <span v-show="!sprite" class="font-bold text-sm">#{{ ndex }}</span>
    <span v-show="!sprite" class="whitespace-pre-wrap text-center text-xs font-medium">{{ name }}</span>
    <span v-if="formType" v-show="!sprite" class="whitespace-pre-wrap text-center text-2xs font-medium">{{ formType }}</span>
  </div>
</template>
