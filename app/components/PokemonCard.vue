<script lang="ts" setup>
import type { FullPokemon } from '#shared/utils/interfaces'

defineProps<FullPokemon>()
</script>

<template>
  <LazyUModal>
    <template #title>
      <div class="flex items-center gap-2 mb-2">
        <img loading="lazy" class="size-32" :alt="name" :src="`/sprites/gen9/${parseInt(ndex)}.png`">
        <div class="space-y-1">
          <UBadge color="neutral" :label="`#${ndex}`" />
          <p class="text-lg">
            {{ name }}
          </p>
          <div class="space-x-2">
            <UBadge color="neutral" variant="subtle" :label="$t('pokedex.generation', [gen])" />
            <UBadge color="neutral" variant="subtle" :label="Regions[region]" />
            <UBadge color="neutral" variant="subtle" :label="Games[game]" />
          </div>
        </div>
      </div>
    </template>
    <template #description>
      Pokémon description
    </template>
    <template #body>
      Gender: {{ gender_id }}
    </template>
  </LazyUModal>
</template>
