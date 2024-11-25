<script lang="ts" setup>
import type { Pokemon } from '#imports'
import { PokemonCard } from '#components'

const props = defineProps<Pokemon & { sprite?: boolean }>()

const modal = useModal()
</script>

<template>
  <div class="flex cursor-pointer flex-col items-center p-1 transition-colors rounded-md hover:bg-[var(--ui-bg-accented)] justify-center"
    @click="modal.open(PokemonCard, props)">
    <img loading="lazy" class="mb-1 size-12 md:size-16"
      :alt="name" :src="`/sprites/gen9/${parseInt(ndex)}.png`" />
    <span v-show="!sprite" class="font-bold text-sm">#{{ ndex }}</span>
    <span v-show="!sprite" class="whitespace-pre-wrap text-center text-xs font-medium">{{ name }}</span>
  </div>
</template>