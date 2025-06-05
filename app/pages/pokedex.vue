<script lang="ts" setup>
import pokJson from 'assets/pokemon_original.json'

const pokGens = _GroupBy(pokJson, p => p.gen)

const onlySprites = ref(false), searchText = ref('')

const { messages, locale } = useI18n()
const localeGames = computed(() =>
  messages.value[locale.value]?.pokedex?.games ?? messages.value.en.pokedex.games)

const searchFilter = computed(() => {
  return pokJson.filter(v => v.name.toLowerCase().includes(searchText.value.toLowerCase()))
})

function replaceGenTitle(gen: number) {
  const title = GenTitles[gen - 1]
  const games = localeGames.value[String(gen) as keyof typeof localeGames.value] as any[]
  if (!games) return title
  return title?.replace(/\{(\d+)\}/g, (match, index) => {
    return games[index] !== undefined ? games[index].loc.source : match
  })
}
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
    <div class="flex flex-col gap-4">
      <div v-if="searchText" class="flex flex-col justify-center items-center gap-4">
        <p class="text-xl font-bold">
          {{ $t('search.result') }}
        </p>
        <div v-if="searchFilter.length" class="flex flex-wrap justify-center items-center gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
          <PokemonBox v-for="(pok, j) in searchFilter" :key="`pok_${j}`" v-bind="pok" :sprite="onlySprites" />
        </div>
        <p v-else class="p-2 font-medium">
          {{ $t('pokedex.empty') }}
        </p>
      </div>
      <template v-else>
        <UCollapsible v-for="(gen, i) in pokGens" :key="`gen_${i}`">
          <UButton class="group" color="neutral" variant="subtle" trailingIcon="i-tabler-chevron-down" block :ui="{
            trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }">
            <div class="flex flex-col items-start">
              <div class="game-title text-xl font-bold"
                   v-html="`${$t('pokedex.generation', [Number(i)])} ${replaceGenTitle(Number(i))}`" />
              <div class="text-sm flex items-center gap-1 font-medium">
                <span>{{ $t('total.pokemon', [gen.length]) }}</span>
                <UIcon name="i-tabler-pokeball" class="size-4" />
              </div>
            </div>
          </UButton>
          <template #content>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(min-content,5rem))] place-items-center mt-2 gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
              <PokemonBox v-for="(pok, j) in gen" :key="`gen_${i}_pok_${j}`" v-bind="pok" :sprite="onlySprites" />
            </div>
          </template>
        </UCollapsible>
      </template>
    </div>
  </section>
</template>

<style>
.game-title > span {
  text-shadow: 0px 0px 3px #FFF, 0px -0px 3px #FFF, -0px 0px 3px #FFF,
    -0px -0px 3px #FFF, 0px 0px 3px #FFF, 0px 0px 3px #FFF,
    -0px 0px 3px #FFF, 0px -0px 3px #FFF, 0px 0px 3px #FFF;
}

.dark .game-title > span {
  text-shadow: 0px 0px 3px #000, 0px -0px 3px #000, -0px 0px 3px #000,
    -0px -0px 3px #000, 0px 0px 3px #000, 0px 0px 3px #000,
    -0px 0px 3px #000, 0px -0px 3px #000, 0px 0px 3px #000;
}
</style>
