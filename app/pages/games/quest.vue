<script lang="ts" setup>
import pokJson from 'assets/pokemon_quest.json'

const onlySprites = ref(false), searchText = ref(''), spriteType = ref('1')
const showChineseNames = ref(false), showChineseExclusives = ref(true)

const filteredPoks = computed(() => {
  if (!showChineseExclusives.value) return pokJson.filter(p => !p.chinese)
  return pokJson
})

const searchFilter = computed(() => {
  return filteredPoks.value.filter(v => v.name.toLowerCase().includes(searchText.value.toLowerCase()))
})
</script>

<template>
  <section class="flex w-full grow flex-col gap-4">
    <div class="flex items-center self-center gap-2 font-medium">
      <span>{{ $t('total.pokemon', [filteredPoks.length]) }}</span>
      <UIcon name="i-tabler-pokeball" class="size-6" />
    </div>
    <div class="flex flex-wrap self-center items-center gap-4">
      <UInput v-model="searchText" icon="i-tabler-search" :placeholder="$t('pokedex.search')" />
      <USwitch v-model="onlySprites" :label="$t('pokedex.onlySprites')" />
    </div>
    <div class="flex flex-wrap self-center items-center gap-4">
      <USelect v-model="spriteType" defaultValue="1" :items="[
        { label: $t('pokemon.icon'), value: '1' },
        { label: $t('pokemon.model'), value: '2' },
        { label: $t('pokemon.shiny'), value: '3' },
      ]" />
      <USwitch v-model="showChineseExclusives" :label="$t('quest.chineseExclusives')" />
      <USwitch v-if="showChineseExclusives && !onlySprites" v-model="showChineseNames" :label="$t('quest.chineseNames')" />
    </div>
    <div v-if="searchText" class="flex flex-col justify-center items-center gap-4">
      <p class="text-xl font-bold">
        {{ $t('search.result') }}
      </p>
      <div v-if="searchFilter.length" class="flex flex-wrap justify-center items-center gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
        <PokemonBox v-for="(pok, j) in searchFilter" :key="`pok_${j}`" v-bind="{ ...pok, name: showChineseNames ? pok.c_name : pok.name }"
                    folder="pokemon_quest" :suffix="`-${spriteType}`" :card="false" :sprite="onlySprites" />
      </div>
      <p v-else class="p-2 font-medium">
        {{ $t('pokedex.empty') }}
      </p>
    </div>
    <div v-else class="grid grid-cols-[repeat(auto-fit,minmax(min-content,5rem))] place-items-center gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
      <PokemonBox v-for="(pok, j) in filteredPoks" :key="`pok_${j}`" v-bind="{ ...pok, name: showChineseNames ? pok.c_name : pok.name }"
                  folder="pokemon_quest" :suffix="`-${spriteType}`" :card="false" :sprite="onlySprites" />
    </div>
  </section>
</template>
