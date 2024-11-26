<script lang="ts" setup>
import pokJson from 'assets/pokemon_original.json'

type Pokemon = typeof pokJson[number]

const { messages, locale } = useI18n()
const localeGames = computed(() =>
	messages.value[locale.value]?.pokedex?.games ?? messages.value.en.pokedex.games)

const totGens = Math.max(...pokJson.map(p => p.gen))
const pokGens: Pokemon[][] = []
const onlySprites = ref(false)
const searchItem = ref('')

for (let i = 1; i <= totGens; i++) {
	const first = pokJson.findIndex(p => p.gen === i)
	const last = i === totGens ? pokJson.length : pokJson.findIndex(p => p.gen === i + 1)
	pokGens.push(pokJson.slice(first, last))
}

const searchFilter = computed(() => {
	return pokJson.filter(v => v.name.toLowerCase().includes(searchItem.value.toLowerCase()))
})

function replaceGenTitle(gen: number) {
	const title = GenTitles[gen]
	const games = localeGames.value[String(gen + 1) as keyof typeof localeGames.value] as any[]
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
			<NuIcon name="i-tabler-pokeball" class="size-6" />
		</div>
		<div class="flex flex-wrap self-center items-center gap-4">
			<NuInput v-model="searchItem" icon="i-tabler-search" :placeholder="$t('pokedex.search')" />
			<NuSwitch v-model="onlySprites" :label="$t('pokedex.onlySprites')" />
		</div>
		<div class="flex flex-col gap-4">
			<div v-if="searchItem" class="flex flex-col justify-center items-center gap-4">
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
				<NuCollapsible v-for="(gen, i) in pokGens" :key="`gen_${i + 1}`">
					<NuButton class="group" color="neutral" variant="subtle" trailingIcon="i-tabler-chevron-down" block :ui="{
						trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
					}">
						<div class="flex flex-col items-start">
							<div class="game-title text-xl font-bold"
								v-html="`${$t('pokedex.generation', [i + 1])} ${replaceGenTitle(i)}`" />
							<div class="text-sm flex items-center gap-1 font-medium">
								<span>{{ $t('total.pokemon', [gen.length]) }}</span>
								<NuIcon name="i-tabler-pokeball" class="size-4" />
							</div>
						</div>
					</NuButton>
					<template #content>
						<div class="grid grid-cols-[repeat(auto-fit,minmax(min-content,5rem))] place-items-center mt-2 gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
							<PokemonBox v-for="(pok, j) in gen" :key="`gen_${i + 1}_pok_${j}`" v-bind="pok" :sprite="onlySprites" />
						</div>
					</template>
				</NuCollapsible>
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
