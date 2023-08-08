<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { GenTitle, type Pokemon } from '@/utility'

const pokJson: Pokemon[] = await fetch('/pokemon_original.json').then(d => d.json())

const isAllCollapsed = ref(false), showOnlyIcons = ref(false)
const totGens = Math.max(...pokJson.map(p => p.gen))
const pokGens: Pokemon[][] = []
const searchItem = ref("")

for (let i = 1; i <= totGens; i++) {
	const first = pokJson.findIndex(p => p.gen == i)
	const last = i == totGens ? pokJson.length : pokJson.findIndex(p => p.gen == i + 1)
	pokGens.push(pokJson.slice(first, last))
}

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
		<div class="flex flex-wrap items-center gap-4">
			<div class="input-group-bordered w-min">
				<input v-model="searchItem" type="text" class="input !input-sm border-2 !border-secondary"
					placeholder="Search a Pokémon...">
				<button class="btn btn-square btn-secondary btn-sm" aria-label="Search a Pokémon">
					<Icon class="h-6 w-6" icon="fluent:search-24-filled" />
				</button>
			</div>
			<label class="btn btn-secondary swap swap-rotate btn-sm" aria-label="Expand/Collapse">
				<input type="checkbox" class="modal-toggle" :checked="isAllCollapsed"
					@click="isAllCollapsed = !isAllCollapsed">
				<span class="ml-8 text-sm capitalize">{{ isAllCollapsed ? 'Expand' : 'Collapse' }} all</span>
				<Icon icon="ion:chevron-expand" class="swap-on h-6 w-6" />
				<Icon icon="ion:chevron-collapse" class="swap-off h-6 w-6" />
			</label>
			<label class="flex cursor-pointer items-center justify-between gap-2">
				<input v-model="showOnlyIcons" type="checkbox" class="!toggle !toggle-primary">
				<span class="shrink-0 select-none text-sm font-medium">Show only icons</span>
			</label>
		</div>
		<div class="flex grow flex-wrap items-center justify-center gap-4">
			<div v-if="searchItem" class="flex flex-col items-center gap-4">
				<p class="text-xl font-bold text-secondary">
					Search result:
				</p>
				<div class="flex max-w-fit grow select-none flex-wrap justify-items-center rounded-xl bg-base-200 sm:p-2">
					<template v-if="searchFilter.length">
						<div v-for="pok in searchFilter" :key="pok.index"
							class="flex h-auto w-20 cursor-pointer flex-col items-center justify-center sm:h-auto sm:w-24">
							<img loading="lazy" class="mb-1 h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/gen9/${parseInt(pok.ndex)}.png`">
							<span class="text-2xs font-bold sm:text-xs">#{{ pok.ndex }}</span>
							<span class="text-center text-3xs font-medium sm:text-xs">{{ pok.name }}</span>
						</div>
					</template>
					<p v-else class="font-medium">
						No Pokémons found!
					</p>
				</div>
			</div>
			<Disclosure v-for="(gen, i) in pokGens" v-else :key="`gen_${i + 1}`" v-slot="{ open }" :defaultOpen="true"
				as="div" class="max-w-fit grow rounded-xl bg-base-200 p-2">
				<div class="flex items-center justify-between gap-2">
					<div class="flex flex-col text-neutral">
						<div id="game_title" class="text-xl font-bold" v-html="GenTitle[i]" />
						<p class="flex items-center gap-2 text-xs font-medium text-neutral-focus">
							<span>Total Pokémons: {{ gen.length }}</span>
							<Icon icon="ic:baseline-catching-pokemon" class="swap-on h-4 w-4" />
						</p>
					</div>
					<DisclosureButton as="template">
						<button class="btn btn-square btn-ghost swap swap-rotate btn-sm" aria-label="Expand/Collapse">
							<input type="checkbox" class="modal-toggle" :checked="open">
							<Icon icon="fluent:chevron-down-12-filled" class="swap-on h-6 w-6" />
							<Icon icon="fluent:chevron-up-12-filled" class="swap-off h-6 w-6" />
						</button>
					</DisclosureButton>
				</div>
				<Transition enter-active-class="transition duration-500 ease-out"
					enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-500 ease-out" leave-from-class="transform scale-100 opacity-100"
					leave-to-class="transform scale-95 opacity-0">
					<DisclosurePanel as="div"
						class="flex select-none flex-wrap items-center justify-center gap-y-4 text-2xs sm:p-2 sm:text-xs">
						<div v-for="pok in gen" :key="pok.index"
							class="flex h-auto w-20 cursor-pointer flex-col items-center justify-center sm:w-24">
							<img loading="lazy" class="mb-1 h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/gen9/${parseInt(pok.ndex)}.png`">
							<span v-show="!showOnlyIcons" class="font-bold">#{{ pok.ndex }}</span>
							<span v-show="!showOnlyIcons" class="whitespace-pre-wrap text-center font-medium">{{ pok.name
							}}</span>
						</div>
					</DisclosurePanel>
				</Transition>
			</Disclosure>
		</div>
		<button class="btn btn-circle btn-secondary btn-sm sticky bottom-6 z-50 self-end" aria-label="Go at the top"
			@click="scrollToTop">
			<Icon class="h-5 w-5" icon="ph:arrow-up-bold" />
		</button>
	</div>
</template>

<style scoped>
#game_title > span {
	text-shadow: 0px 0px 3px #FFF, 0px -0px 3px #FFF, -0px 0px 3px #FFF,
		-0px -0px 3px #FFF, 0px 0px 3px #FFF, 0px 0px 3px #FFF,
		-0px 0px 3px #FFF, 0px -0px 3px #FFF, 0px 0px 3px #FFF;
}

[data-theme="dark"] #game_title > span {
	text-shadow: 0px 0px 3px #000, 0px -0px 3px #000, -0px 0px 3px #000,
		-0px -0px 3px #000, 0px 0px 3px #000, 0px 0px 3px #000,
		-0px 0px 3px #000, 0px -0px 3px #000, 0px 0px 3px #000;
}
</style>