<script lang="ts" setup>
import pokJson from 'assets/pokemon_conquest.json'

const onlySprites = ref(false), searchText = ref('')

const searchFilter = computed(() => {
  return pokJson.filter(v => v.name.toLowerCase().includes(searchText.value.toLowerCase()))
})
</script>

<template>
  <section class="flex w-full grow flex-col gap-4">
    <div class="flex items-center self-center gap-2 font-medium">
      <span>{{ $t('total.pokemon', [pokJson.length]) }}</span>
      <UIcon name="i-tabler-pokeball" class="size-6" />
    </div>
    <div class="flex flex-wrap self-center items-center gap-4">
      <UInput v-model="searchText" icon="i-tabler-search" :placeholder="$t('pokedex.search')" />
      <USwitch v-model="onlySprites" :label="$t('pokedex.onlySprites')" />
    </div>
    <div v-if="searchText" class="flex flex-col justify-center items-center gap-4">
      <p class="text-xl font-bold">
        {{ $t('search.result') }}
      </p>
      <div v-if="searchFilter.length" class="flex flex-wrap justify-center items-center gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
        <div v-for="(pok, j) in searchFilter" :key="`pok_${j}`"
             class="flex cursor-pointer flex-col items-center p-1 transition-colors rounded-md hover:bg-[var(--ui-bg-accented)] justify-center">
          <img loading="lazy" class="mb-1 size-12 md:size-16"
               :alt="pok.name" :src="`/sprites/pokemon_conquest/${parseInt(pok.ndex)}.png`">
          <span v-show="!onlySprites" class="font-bold text-sm">#{{ pok.ndex }}</span>
          <span v-show="!onlySprites" class="whitespace-pre-wrap text-center text-xs font-medium">{{ pok.name }}</span>
        </div>
      </div>
      <p v-else class="p-2 font-medium">
        {{ $t('pokedex.empty') }}
      </p>
    </div>
    <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(min-content,5rem))] place-items-center gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
      <div v-for="(pok, j) in pokJson" :key="`pok_${j}`"
           class="flex cursor-pointer flex-col items-center p-1 transition-colors rounded-md hover:bg-[var(--ui-bg-accented)] justify-center">
        <img loading="lazy" class="mb-1 size-12 md:size-16"
             :alt="pok.name" :src="`/sprites/pokemon_conquest/${parseInt(pok.ndex)}.png`">
        <span v-show="!onlySprites" class="font-bold text-sm">#{{ pok.ndex }}</span>
        <span v-show="!onlySprites" class="whitespace-pre-wrap text-center text-xs font-medium">{{ pok.name }}</span>
      </div>
    </div>
  </section>
</template>
