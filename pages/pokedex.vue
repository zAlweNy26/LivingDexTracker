<script lang="ts" setup>
import pokJson from 'assets/pokemon_original.json'

type Pokemon = typeof pokJson[number]

const { messages, locale } = useI18n()
const localeGames = computed(() => 
	messages.value[locale.value]?.pokedex?.games ?? messages.value['en'].pokedex.games)

const onlySprites = ref(false)
const totGens = Math.max(...pokJson.map(p => p.gen))
const pokGens: Pokemon[][] = []
const searchItem = ref("")

for (let i = 1; i <= totGens; i++) {
	const first = pokJson.findIndex(p => p.gen == i)
	const last = i == totGens ? pokJson.length : pokJson.findIndex(p => p.gen == i + 1)
	pokGens.push(pokJson.slice(first, last))
}

const searchFilter = computed(() => {
	return pokJson.filter(v => v.name.toLowerCase().includes(searchItem.value.toLowerCase()))
})

function replaceGenTitle(gen: number) {
	const title = GenTitles[gen]
	const games = localeGames.value[String(gen + 1) as keyof typeof localeGames.value] as any[]
	if (!games) return title
	return title.replace(/{(\d+)}/g, (match, index) => {
		return games[index] !== undefined ? games[index].loc.source : match;
	})
}
</script>

<template>
	<section class="flex w-full grow flex-col gap-4">
		<div class="flex items-center self-center gap-2 font-medium">
			<span>{{ $t('pokedex.total', [pokJson.length]) }}</span>
			<NuIcon name="i-tabler-pokeball" class="size-6" />
		</div>
		<div class="flex flex-wrap self-center items-center gap-4">
			<NuInput v-model="searchItem" icon="i-tabler-search" :placeholder="$t('pokedex.search')" />
			<NuSwitch v-model="onlySprites" :label="$t('pokedex.onlySprites')" />
		</div>
		<div class="flex flex-col gap-4">
			<div v-if="searchItem" class="flex flex-col items-center gap-4">
				<p class="text-xl font-bold text-secondary">{{ $t('search.result') }}</p>
				<div v-if="searchFilter.length" class="flex flex-wrap gap-2 py-2 px-1 rounded-md bg-neutral-100 dark:bg-neutral-800">
					<div v-for="(pok, j) in searchFilter" :key="`pok_${j}`"
						class="flex cursor-pointer flex-col items-center justify-center">
						<img loading="lazy" class="mb-1 size-12 transition-all md:size-16"
							:alt="pok.name" :src="`/sprites/gen9/${parseInt(pok.ndex)}.png`" />
						<span v-show="!onlySprites" class="font-bold text-sm">#{{ pok.ndex }}</span>
						<span v-show="!onlySprites" class="whitespace-pre-wrap text-center text-xs font-medium">{{ pok.name }}</span>
					</div>
				</div>
				<p v-else class="p-2 font-medium">{{ $t('pokedex.empty') }}</p>
			</div>
			<template v-else>
				<NuCollapsible v-for="(gen, i) in pokGens" :key="`gen_${i + 1}`">
					<NuButton color="neutral" variant="subtle" trailingIcon="i-tabler-chevron-down" block :ui="{
						trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
					}">
						<div class="flex flex-col text-neutral">
							<div class="game-title text-xl font-bold" 
								v-html="`${$t('pokedex.generation', [i + 1])} ${replaceGenTitle(i)}`" />
							<p class="flex items-center gap-1 text-xs font-medium text-neutral-focus">
								<span>{{ $t('pokedex.total', [gen.length]) }}</span>
								<NuIcon name="i-tabler-pokeball" class="swap-on h-4 w-4" />
							</p>
						</div>
					</NuButton>
					<template #content>
						<div class="grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] mt-2 gap-2 py-2 px-1 rounded-md bg-neutral-100 dark:bg-neutral-800">
							<div v-for="(pok, j) in gen" :key="`gen_${i + 1}_pok_${j}`"
								class="flex cursor-pointer flex-col items-center justify-center">
								<img loading="lazy" class="mb-1 size-12 transition-all md:size-16"
									:alt="pok.name" :src="`/sprites/gen9/${parseInt(pok.ndex)}.png`" />
								<span v-show="!onlySprites" class="font-bold text-sm">#{{ pok.ndex }}</span>
								<span v-show="!onlySprites" class="whitespace-pre-wrap text-center text-xs font-medium">{{ pok.name }}</span>
							</div>
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