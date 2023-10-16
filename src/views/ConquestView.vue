<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { type PokemonConquest } from '@helpers/utility'

let pokJson: PokemonConquest[] = await fetch('/pokemon_conquest.json').then(d => d.json())

pokJson = pokJson.sort((p1, p2) => p1.rgal.localeCompare(p2.rgal))

const searchItem = ref("")

const scrollToTop = () => window.scrollTo({ behavior: 'smooth', left: 0, top: 0 })

const searchFilter = computed(() => {
    let filteredPok = JSON.parse(JSON.stringify(pokJson)) as typeof pokJson
    filteredPok = filteredPok.filter(v => v.name.toLowerCase().includes(searchItem.value.toLowerCase()))
    return filteredPok
})
</script>

<template>
	<div class="flex w-full grow flex-col items-center justify-center gap-4">
		<p class="flex items-center gap-2 font-medium">
			<span>Total Pokémons: {{ pokJson.length }}</span>
			<Icon icon="ic:baseline-catching-pokemon" class="swap-on h-6 w-6" />
		</p>
		<div class="flex flex-col items-center justify-center gap-4">
			<div class="flex flex-wrap items-center gap-4">
				<div class="input-group-bordered w-min">
					<input v-model="searchItem" type="text" class="input !input-sm border-2 !border-secondary"
						placeholder="Search a Pokémon...">
					<button class="btn btn-square btn-secondary btn-sm" aria-label="Search a Pokémon">
						<Icon class="h-6 w-6" icon="fluent:search-24-filled" />
					</button>
				</div>
			</div>
		</div>
		<div class="flex grow flex-wrap items-center justify-center gap-4">
			<div v-if="searchItem" class="flex flex-col items-center gap-4">
				<p class="text-xl font-bold text-secondary">
					Search result:
				</p>
				<div class="flex max-w-fit grow flex-wrap justify-items-center rounded-xl bg-base-200 sm:p-2">
					<template v-if="searchFilter.length">
						<div v-for="(pok, index) in searchFilter" :key="index"
							class="flex h-auto w-20 cursor-pointer flex-col items-center justify-center sm:h-auto sm:w-24">
							<img loading="lazy" class="h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/pokemon_conquest/${parseInt(pok.ndex)} Conquest.png`">
							<span class="text-2xs font-bold sm:text-xs">#{{ pok.ndex }}</span>
							<span class="text-center text-3xs font-medium sm:text-xs">{{ pok.name }}</span>
						</div>
					</template>
					<p v-else class="p-2 font-medium">
						No Pokémons found!
					</p>
				</div>
			</div>
			<div v-else
				class="flex max-w-fit flex-wrap items-center justify-center gap-2 rounded-xl bg-base-200 p-2 text-2xs sm:p-4 sm:text-xs">
				<div v-for="(pok, index) in pokJson" :key="index"
					class="flex h-auto w-20 cursor-pointer flex-col items-center justify-center sm:w-24">
					<img loading="lazy" class="h-12 w-12 transition-all sm:h-16 sm:w-16"
						:src="`/sprites/pokemon_conquest/${parseInt(pok.ndex)} Conquest.png`">	
					<span class="font-bold">#{{ pok.ndex }}</span>
					<span class="whitespace-pre-wrap text-center font-medium">{{ pok.name }}</span>
				</div>
			</div>
		</div>
		<button class="btn btn-circle btn-secondary sticky bottom-6 z-50 self-end" aria-label="Go at the top"
			@click="scrollToTop">
			<Icon class="h-6 w-6" icon="ph:arrow-up-bold" />
		</button>
	</div>
</template>