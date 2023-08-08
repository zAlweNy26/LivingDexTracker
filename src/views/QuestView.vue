<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { QuestSpriteTypes, type PokemonQuest, type QuestSpriteType } from '@/utility'

const pokJson: PokemonQuest[] = await fetch('/pokemon_quest.json').then(d => d.json())

const searchItem = ref("")
const showChineseNames = ref(false), showChineseExclusives = ref(true)
const selectSpriteType = ref<QuestSpriteType>("Model")

const scrollToTop = () => window.scrollTo({ behavior: 'smooth', left: 0, top: 0 })

const resultPok = () => {
    let resPok = JSON.parse(JSON.stringify(pokJson)) as typeof pokJson

    if (!showChineseExclusives.value) {
        showChineseNames.value = false
        resPok = resPok.filter(p => !p.chinese)
    }

    return resPok
}

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
			<div class="flex flex-wrap items-center justify-center gap-4">
				<Listbox v-model="selectSpriteType">
					<div class="relative flex flex-col">
						<div class="rounded-t-lg bg-secondary px-2 py-1 text-center text-sm font-medium text-base-100">
							<span>Sprite Type</span>
						</div>
						<ListboxButton
							class="flex cursor-pointer items-center justify-between gap-2 rounded-b-lg bg-base-200 px-2 py-1 text-sm shadow-lg outline-0">
							<p class="font-semibold">
								{{ selectSpriteType }}
							</p>
							<Icon icon="ion:chevron-expand" class="h-4 w-4 shrink-0" />
						</ListboxButton>
						<Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
							leave-to-class="opacity-0">
							<ListboxOptions
								class="absolute top-full z-40 mt-2 w-full min-w-max cursor-pointer overflow-hidden rounded-lg bg-base-200 text-sm shadow-lg">
								<ListboxOption v-for="option in QuestSpriteTypes" v-slot="{ active, selected }" :key="option"
									:value="option" as="template">
									<li :class="{ 'bg-primary text-base-100': active, 'bg-secondary font-bold text-base-100': selected }"
										class="flex items-center gap-2 px-2 py-1 font-medium transition-colors">
										<p class="truncate">
											{{ option }}
										</p>
									</li>
								</ListboxOption>
							</ListboxOptions>
						</Transition>
					</div>
				</Listbox>
				<div class="flex flex-col justify-center gap-2">
					<label class="flex cursor-pointer items-center gap-2">
						<input v-model="showChineseExclusives" type="checkbox" class="!toggle !toggle-primary">
						<p class="shrink-0 select-none text-sm font-medium">Show Chinese exclusives</p>
					</label>
					<label v-if="showChineseExclusives" class="flex cursor-pointer items-center gap-2">
						<input v-model="showChineseNames" type="checkbox" class="!toggle !toggle-primary">
						<p class="flex shrink-0 select-none items-center justify-center gap-2 text-sm font-medium">
							<span>Show Chinese names</span>
							<Icon class="h-6 w-6" icon="twemoji:flag-china" />
						</p>
					</label>
				</div>
			</div>
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
							<img v-if="selectSpriteType == 'Model'" loading="lazy" class="h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-2.png`">
							<img v-else-if="selectSpriteType == 'Icon'" loading="lazy" class="h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-1.png`">
							<img v-else-if="selectSpriteType == 'Shiny Model'" loading="lazy" class="h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-3.png`">
							<span class="text-2xs font-bold sm:text-xs">#{{ pok.ndex }}</span>
							<span class="text-center text-3xs font-medium sm:text-xs">{{ pok.name }}</span>
						</div>
					</template>
					<p v-else class="font-medium">
						No Pokémons found!
					</p>
				</div>
			</div>
			<div v-else
				class="flex max-w-fit select-none flex-wrap items-center justify-center gap-2 rounded-xl bg-base-200 p-2 text-2xs sm:p-4 sm:text-xs">
				<div v-for="pok in resultPok()" :key="pok.index"
					class="flex h-auto w-20 cursor-pointer flex-col items-center justify-center sm:w-24">
					<img v-if="selectSpriteType == 'Model'" loading="lazy" class="h-12 w-auto transition-all sm:h-16"
						:src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-2.png`">
					<img v-else-if="selectSpriteType == 'Icon'" loading="lazy" class="h-12 w-auto transition-all sm:h-16"
						:src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-1.png`">
					<img v-else-if="selectSpriteType == 'Shiny Model'" loading="lazy" class="h-12 w-auto transition-all sm:h-16"
						:src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-3.png`">
					<span class="font-bold">#{{ pok.ndex }}</span>
					<span class="whitespace-pre-wrap text-center font-medium">{{ showChineseNames ? pok.c_name : pok.name }}</span>
					<span v-if="pok.form_type && !showChineseNames" 
						class="whitespace-pre-wrap text-center text-3xs font-medium text-neutral-focus">{{ pok.form_type }}</span>
				</div>
			</div>
		</div>
		<button class="btn btn-circle btn-secondary sticky bottom-6 z-50 self-end" aria-label="Go at the top"
			@click="scrollToTop">
			<Icon class="h-6 w-6" icon="ph:arrow-up-bold" />
		</button>
	</div>
</template>
