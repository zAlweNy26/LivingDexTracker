<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Modal from '@components/Modal.vue'
import { updateUserData } from '@/firebase'
import { useUserStore } from '@stores/userStore'
import {
	Region, Game, OrderOptions, FormsPosition,
	VariantsOptions, TransformsOptions, SpecialsOptions,
	type Pokemon, type Order, type Position, type Variant,
	type Transform, type Special
} from '@helpers/utility'

const { userInfo, userData } = storeToRefs(useUserStore())

const pokJson: Pokemon[] = await fetch('/pokemon_all.json').then(d => d.json())

const selectFormsPosition = ref<Position>("Hidden")
const selectVariants = ref<Variant[]>([])
const selectTransforms = ref<Transform[]>([])
const selectSpecials = ref<Special[]>([])
const selectOrder = ref<Order>("National Dex")
const isAllCollapsed = ref(false)

const allPok = reactive(pokJson)
const boxNames = ref<string[][]>(new Array(Math.ceil(allPok.length / 30)).fill([]))
const selectedPok = ref<Pokemon>()
const catchedNormal = ref<number[]>([]), catchedShiny = ref<number[]>([])
const showShiny = ref(false), showOnlyIcons = ref(false)
const modalCard = ref<InstanceType<typeof Modal>>()
const searchItem = ref("")

const searchFilter = computed(() => {
	let filteredPok = JSON.parse(JSON.stringify(allPok)) as typeof pokJson

	const searchNum = parseInt(searchItem.value)

	if (!isNaN(searchNum)) {
		filteredPok = filteredPok.filter(p => parseInt(p.ndex) == parseInt(searchItem.value))
	} else filteredPok = filteredPok.filter(p => p.name.toLowerCase().includes(searchItem.value.toLowerCase()))

	filteredPok = filteredPok.sort((p1, p2) => p1.ndex.localeCompare(p2.ndex) || p1.form_index.localeCompare(p2.form_index))

	return filteredPok
})

const resetBoxes = () => {
	boxNames.value = new Array(Math.ceil(allPok.length / 30)).fill([])
}

const orderBy = computed(() => {
	let orderedPok = JSON.parse(JSON.stringify(allPok)) as typeof pokJson
	let j = 0

	orderedPok = orderedPok.filter(p => {
		if (selectFormsPosition.value === "Hidden") return p.original
		else return true
	})

	if (selectFormsPosition.value == "After everything") {
		orderedPok = orderedPok.sort((p1, p2) => {
			return ((p1.original == p2.original) ? 0 : (p1.original ? -1 : 1)) ||
				(selectOrder.value == "National Dex" ? 0 : 0) ||
				(selectOrder.value == "Alphabetical" ? p1.name.localeCompare(p2.name) : 0) ||
				(selectOrder.value == "Region" ? p1.region - p2.region : 0) ||
				(selectOrder.value == "Generation" ? p1.gen - p2.gen : 0) ||
				(selectOrder.value == "Release" ? p1.game - p2.game : 0) ||
				p1.ndex.localeCompare(p2.ndex) || p1.form_index.localeCompare(p2.form_index)
		})
	}

	resetBoxes()

	if (selectOrder.value == "Alphabetical") {
		if (selectFormsPosition.value != "After everything") orderedPok = orderedPok.sort((p1, p2) => p1.name.localeCompare(p2.name) || p1.form_index.localeCompare(p2.form_index))
		orderedPok.forEach((e, i) => {
			if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
			if (!boxNames.value[j].includes(e.name[0])) boxNames.value[j].push(e.name[0])
		})
	} else if (selectOrder.value == "Region") {
		if (selectFormsPosition.value != "After everything") orderedPok = orderedPok.sort((p1, p2) => p1.region - p2.region || p1.ndex.localeCompare(p2.ndex) || p1.form_index.localeCompare(p2.form_index))
		orderedPok.forEach((e, i) => {
			if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
			if (!boxNames.value[j].includes(Region[e.region])) boxNames.value[j].push(Region[e.region])
		})
	} else if (selectOrder.value == "Generation") {
		if (selectFormsPosition.value != "After everything") orderedPok = orderedPok.sort((p1, p2) => p1.gen - p2.gen || p1.ndex.localeCompare(p2.ndex) || p1.form_index.localeCompare(p2.form_index))
		orderedPok.forEach((e, i) => {
			if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
			if (!boxNames.value[j].includes(`Gen. ${e.gen}`)) boxNames.value[j].push(`Gen. ${e.gen}`)
		})
	} else if (selectOrder.value == "National Dex") {
		if (selectFormsPosition.value != "After everything") orderedPok = orderedPok.sort((p1, p2) => p1.ndex.localeCompare(p2.ndex) || p1.form_index.localeCompare(p2.form_index))
		orderedPok.forEach((e, i) => {
			if ((i > 0 && (i - 29) % 30 == 0) || i == orderedPok.length - 1) boxNames.value[j].push(e.ndex) //TODO: ottimizzare codice (non so perchè funzioni)
			if ((i > 0 && i % 30 == 0)) boxNames.value[++j] = []
			if (boxNames.value[j].length == 0) boxNames.value[j].push(e.ndex)
		})
	} else if (selectOrder.value == "Release") {
		if (selectFormsPosition.value != "After everything") orderedPok = orderedPok.sort((p1, p2) => p1.game - p2.game || p1.ndex.localeCompare(p2.ndex) || p1.form_index.localeCompare(p2.form_index))
		orderedPok.forEach((e, i) => {
			if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
			if (!boxNames.value[j].includes(Game[e.game])) boxNames.value[j].push(Game[e.game])
		})
	} else if (selectOrder.value == "Index") {
		if (selectFormsPosition.value != "After everything") orderedPok = orderedPok.sort((p1, p2) => p1.index - p2.index)
		orderedPok.forEach((e, i) => {
			if ((i > 0 && (i - 29) % 30 == 0) || i == orderedPok.length - 1) boxNames.value[j].push(e.index.toString()) //TODO: ottimizzare codice (non so perchè funzioni)
			if ((i > 0 && i % 30 == 0)) boxNames.value[++j] = []
			if (boxNames.value[j].length == 0) boxNames.value[j].push(e.index.toString())
		})
	}

	return orderedPok
})

const openPokInfo = (ndex: number) => {
	selectedPok.value = allPok.filter(p => p.original)[ndex - 1]
	modalCard.value?.openModal()
}

let timerLongTouch: ReturnType<typeof setTimeout>
let isMoving = false

const openPokInfoIOS = (event: "start" | "move" | "end", index: number, ndex: number) => {
	if (event == "start") {
		isMoving = false
		timerLongTouch = setTimeout(() => openPokInfo(ndex), 600)
	} else if (event == "move") {
		isMoving = true
		clearTimeout(timerLongTouch)
	} else if (event == "end") {
		clearTimeout(timerLongTouch)
		if (!isMoving) {
			isMoving = false
			catchPok(index)
		}
	}
}

const showLabel = (pok: Pokemon) => {
	if (selectFormsPosition.value === "Hidden") return false
	return true
}

const orderSelected = computed(() => {
	return allPok.filter(p => p.ndex == selectedPok.value?.ndex)
		.sort((p1, p2) => p1.form_index.localeCompare(p2.form_index))
})

const catchPok = (index: number) => { //TODO: Optimize the complexity of the function
	if (index < 0 || index > pokJson.length) return
	if (showShiny.value) {
		const valIndex = catchedShiny.value.indexOf(index)
		if (valIndex != -1) catchedShiny.value.splice(valIndex, 1)
		else catchedShiny.value.push(index)
	} else {
		const valIndex = catchedNormal.value.indexOf(index)
		if (valIndex != -1) catchedNormal.value.splice(valIndex, 1)
		else catchedNormal.value.push(index)
	}
}

const isPokCaught = (index: number) => showShiny.value ? catchedShiny.value.includes(index) : catchedNormal.value.includes(index)

const scrollToTop = () => window.scrollTo({ behavior: 'smooth', left: 0, top: 0 })

const isCompleted = (box: number) => {
	const boxPok = orderBy.value.slice((box - 1) * 30, box * 30)
	return (showShiny.value ?
		boxPok.every(p => catchedShiny.value.includes(p.index)) :
		boxPok.every(p => catchedNormal.value.includes(p.index))
	)
}

onActivated(() => {
	catchedNormal.value = JSON.parse(JSON.stringify(userData.value.catchedNormal))
	catchedShiny.value = JSON.parse(JSON.stringify(userData.value.catchedShiny))
})

onDeactivated(() => {
	if (userInfo.value) {
		updateUserData(userInfo.value.uid, {
			catchedNormal: userData.value.catchedNormal = JSON.parse(JSON.stringify(catchedNormal.value)),
			catchedShiny: userData.value.catchedShiny = JSON.parse(JSON.stringify(catchedShiny.value))
		}, "/data")
	}
	console.log("On deactivated")
})

watch(isAllCollapsed, () => {
	if (userInfo.value) {
		updateUserData(userInfo.value.uid, {
			catchedNormal: userData.value.catchedNormal = catchedNormal.value,
			catchedShiny: userData.value.catchedShiny = catchedShiny.value
		}, "/data")
	}
})
</script>

<template>
	<div class="flex w-full grow flex-col items-center justify-center gap-4">
		<p class="flex items-center gap-2 font-medium">
			<span>Total Pokémons: {{ orderBy.length }}</span>
			<Icon icon="ic:baseline-catching-pokemon" class="swap-on h-6 w-6" />
		</p>
		<div class="flex flex-col items-center justify-center gap-4">
			<div class="flex flex-wrap items-center justify-center gap-4">
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
			</div>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<Listbox v-model="selectOrder">
					<div class="relative flex flex-col">
						<div class="rounded-t-lg bg-secondary px-2 py-1 text-center text-sm font-medium text-base-100">
							<span>Order by</span>
						</div>
						<ListboxButton
							class="flex cursor-pointer items-center justify-between gap-2 rounded-b-lg bg-base-200 px-2 py-1 text-sm shadow-lg outline-0">
							<p class="font-semibold">
								{{ selectOrder }}
							</p>
							<Icon icon="ion:chevron-expand" class="h-4 w-4 shrink-0" />
						</ListboxButton>
						<Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
							leave-to-class="opacity-0">
							<ListboxOptions
								class="absolute top-full z-40 mt-2 w-full min-w-max cursor-pointer overflow-hidden rounded-lg bg-base-200 text-sm shadow-lg">
								<ListboxOption v-for="option in OrderOptions" v-slot="{ active, selected }" :key="option"
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
				<Listbox v-model="selectFormsPosition">
					<div class="relative flex flex-col">
						<div class="rounded-t-lg bg-secondary px-2 py-1 text-center text-sm font-medium text-base-100">
							<span>Other Forms position</span>
						</div>
						<ListboxButton
							class="flex cursor-pointer items-center justify-between gap-2 rounded-b-lg bg-base-200 px-2 py-1 text-sm shadow-lg outline-0">
							<p class="font-semibold">
								{{ selectFormsPosition }}
							</p>
							<Icon icon="ion:chevron-expand" class="h-4 w-4 shrink-0" />
						</ListboxButton>
						<Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
							leave-to-class="opacity-0">
							<ListboxOptions
								class="absolute top-full z-40 mt-2 w-full min-w-max cursor-pointer overflow-hidden rounded-lg bg-base-200 text-sm shadow-lg">
								<ListboxOption v-for="option in FormsPosition" v-slot="{ active, selected }" :key="option"
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
				<div class="flex flex-col items-center justify-center gap-2">
					<Listbox v-if="selectFormsPosition != 'Hidden'" v-model="selectVariants" multiple>
						<div class="relative flex flex-col">
							<ListboxButton
								class="flex cursor-pointer items-center gap-2 rounded-lg bg-base-200 px-2 py-1 text-sm shadow-lg outline-0 disabled:bg-base-200">
								<p class="font-semibold">
									Variants shown
								</p>
								<Icon icon="ion:chevron-expand" class="h-4 w-4 shrink-0" />
							</ListboxButton>
							<Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
								leave-to-class="opacity-0">
								<ListboxOptions
									class="absolute top-full z-40 mt-2 w-full min-w-max cursor-pointer overflow-hidden rounded-lg bg-base-200 text-sm shadow-lg">
									<ListboxOption v-for="option in VariantsOptions" v-slot="{ active, selected }"
										:key="option" :value="option" as="template">
										<li :class="{ 'bg-primary text-base-100': active }"
											class="flex items-center gap-2 px-2 py-1 font-medium transition-colors">
											<input type="checkbox" :checked="selected"
												class="checkbox-secondary checkbox checkbox-sm border-2">
											<p class="truncate">
												{{ option }}
											</p>
											<img class="h-4 w-auto"
												:src="`/icons/variants/${option.split(' ').join('_').toLowerCase()}.png`">
										</li>
									</ListboxOption>
								</ListboxOptions>
							</Transition>
						</div>
					</Listbox>
					<Listbox v-if="selectFormsPosition != 'Hidden'" v-model="selectTransforms" multiple>
						<div class="relative flex flex-col">
							<ListboxButton
								class="flex cursor-pointer items-center gap-2 rounded-lg bg-base-200 px-2 py-1 text-sm shadow-lg outline-0 disabled:bg-base-200">
								<p class="font-semibold">
									Transformations shown
								</p>
								<Icon icon="ion:chevron-expand" class="h-4 w-4 shrink-0" />
							</ListboxButton>
							<Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
								leave-to-class="opacity-0">
								<ListboxOptions
									class="absolute top-full z-40 mt-2 w-full min-w-max cursor-pointer overflow-hidden rounded-lg bg-base-200 text-sm shadow-lg">
									<ListboxOption v-for="option in TransformsOptions" v-slot="{ active, selected }"
										:key="option" :value="option" as="template">
										<li :class="{ 'bg-primary text-base-100': active }"
											class="flex items-center gap-2 px-2 py-1 font-medium transition-colors">
											<input type="checkbox" :checked="selected"
												class="checkbox-secondary checkbox checkbox-sm border-2">
											<p class="truncate">
												{{ option }}
											</p>
											<img class="h-4 w-auto"
												:src="`/icons/transforms/${option.split(' ').join('_').toLowerCase()}.png`">
										</li>
									</ListboxOption>
								</ListboxOptions>
							</Transition>
						</div>
					</Listbox>
					<Listbox v-if="selectFormsPosition != 'Hidden'" v-model="selectSpecials" multiple>
						<div class="relative flex flex-col">
							<ListboxButton
								class="flex cursor-pointer items-center gap-2 rounded-lg bg-base-200 px-2 py-1 text-sm shadow-lg outline-0 disabled:bg-base-200">
								<p class="font-semibold">
									Specials shown
								</p>
								<Icon icon="ion:chevron-expand" class="h-4 w-4 shrink-0" />
							</ListboxButton>
							<Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
								leave-to-class="opacity-0">
								<ListboxOptions
									class="absolute top-full z-40 mt-2 w-full min-w-max cursor-pointer overflow-hidden rounded-lg bg-base-200 text-sm shadow-lg">
									<ListboxOption v-for="option in SpecialsOptions" v-slot="{ active, selected }"
										:key="option" :value="option" as="template">
										<li :class="{ 'bg-primary text-base-100': active }"
											class="flex items-center gap-2 px-2 py-1 font-medium transition-colors">
											<input type="checkbox" :checked="selected"
												class="checkbox-secondary checkbox checkbox-sm border-2">
											<p class="truncate">
												{{ option }}
											</p>
											<img class="h-4 w-auto"
												:src="`/icons/specials/${option.split(' ').join('_').toLowerCase()}.png`">
										</li>
									</ListboxOption>
								</ListboxOptions>
							</Transition>
						</div>
					</Listbox>
				</div>
				<div class="flex flex-col items-center justify-center gap-2">
					<label class="flex cursor-pointer items-center justify-between gap-2">
						<input v-model="showOnlyIcons" type="checkbox" class="!toggle !toggle-primary">
						<span class="shrink-0 select-none text-sm font-medium">Show only icons</span>
					</label>
					<label class="flex cursor-pointer items-center justify-between gap-2">
						<input v-model="showShiny" type="checkbox" class="!toggle !toggle-primary">
						<span class="shrink-0 select-none text-sm font-medium">Show Shiny</span>
					</label>
				</div>
			</div>
		</div>
		<div class="flex grow flex-wrap items-center justify-center gap-4">
			<div v-if="searchItem" class="flex flex-col items-center justify-center gap-4">
				<p class="text-xl font-bold text-secondary">
					Search result:
				</p>
				<div style="-webkit-touch-callout: none;"
					class="flex max-w-fit grow select-none flex-wrap justify-center justify-items-center rounded-xl bg-base-200 sm:p-2">
					<template v-if="searchFilter.length">
						<div v-for="pok in searchFilter" :key="pok.index"
							class="flex h-auto w-auto cursor-pointer flex-col items-center justify-center gap-1 md:w-24"
							@touchstart="openPokInfoIOS('start', pok.index, parseInt(pok.ndex))"
							@touchmove="openPokInfoIOS('move', pok.index, parseInt(pok.ndex))"
							@touchend.prevent="openPokInfoIOS('end', pok.index, parseInt(pok.ndex))"
							@contextmenu.prevent="openPokInfo(parseInt(pok.ndex))" @click="catchPok(pok.index)">
							<img loading="lazy" class="mb-1 h-12 w-12 transition-all sm:h-16 sm:w-16"
								:class="{ 'brightness-[.25]': !isPokCaught(pok.index) }"
								:src="`/sprites/webps/poke_icon_${pok.ndex}_${pok.form_index}_${pok.gender_id}_${pok.gmax_id}_${pok.subform_index}_f_${showShiny ? 'r' : 'n'}.webp`"
								@error="(e) => (e.target as HTMLImageElement).src = '/sprites/webps/poke_icon_0000_000_uk_n_00000000_f_n.webp'">
							<span class="text-2xs font-bold sm:text-xs">#{{ pok.ndex }}</span>
							<span class="text-center text-3xs font-medium sm:text-xs">{{ pok.name }}</span>
							<span class="whitespace-pre-wrap text-center text-3xs font-medium text-neutral-focus">{{
								pok.form }}</span>
						</div>
					</template>
					<p v-else class="p-2 font-medium">
						No Pokémons found!
					</p>
				</div>
			</div>
			<Disclosure v-for="i in Math.ceil(orderBy.length / 30)" v-else :key="`box_${i}`" v-slot="{ open }" as="div"
				:defaultOpen="true" class="flex max-w-fit grow flex-col self-stretch rounded-xl bg-base-200 p-2">
				<div class="flex items-center justify-between gap-2">
					<div class="flex items-center gap-2">
						<p class="text-xl font-bold text-secondary">
							{{ boxNames[i - 1].join(" - ") }}
						</p>
						<Icon v-if="isCompleted(i)" icon="fluent:checkmark-circle-12-filled" class="h-6 w-6 text-success" />
					</div>
					<DisclosureButton as="template">
						<button class="swap-rotate btn btn-square btn-ghost swap btn-sm" aria-label="Expand/Collapse">
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
					<DisclosurePanel as="div" style="-webkit-touch-callout: none;"
						class="grid grow select-none grid-cols-6 grid-rows-5 justify-items-center p-1">
						<div v-for="pok in orderBy.slice((i - 1) * 30, i * 30)" :key="pok.index"
							class="flex h-auto w-auto cursor-pointer flex-col items-center justify-center gap-1 md:w-24"
							@touchstart="openPokInfoIOS('start', pok.index, parseInt(pok.ndex))"
							@touchmove="openPokInfoIOS('move', pok.index, parseInt(pok.ndex))"
							@touchend.prevent="openPokInfoIOS('end', pok.index, parseInt(pok.ndex))"
							@contextmenu.prevent="openPokInfo(parseInt(pok.ndex))" @click="catchPok(pok.index)">
							<img loading="lazy" class="mb-1 h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/webps/poke_icon_${pok.ndex}_${pok.form_index}_${pok.gender_id}_${pok.gmax_id}_${pok.subform_index}_f_${showShiny ? 'r' : 'n'}.webp`"
								@error="(e) => (e.target as HTMLImageElement).src = '/sprites/webps/poke_icon_0000_000_uk_n_00000000_f_n.webp'">
							<span v-show="!showOnlyIcons" class="text-2xs font-bold sm:text-xs">#{{ pok.ndex }}</span>
							<span v-show="!showOnlyIcons" class="text-center text-3xs font-medium sm:text-xs">{{ pok.name
							}}</span>
							<span class="text-center text-3xs font-medium sm:text-xs">{{ pok.index }}</span>
							<span v-if="!showOnlyIcons && showLabel(pok)"
								class="whitespace-pre-wrap text-center text-3xs font-medium text-neutral-focus">{{ pok.form }}</span>
						</div>
					</DisclosurePanel>
				</Transition>
			</Disclosure>
		</div>
		<button class="btn btn-circle btn-secondary btn-sm sticky bottom-6 z-50 self-end" aria-label="Go at the top"
			@click="scrollToTop">
			<Icon class="h-5 w-5" icon="ph:arrow-up-bold" />
		</button>
		<Modal ref="modalCard">
			<div class="flex flex-col gap-2">
				<div class="flex items-center justify-between gap-2 text-xl">
					<p class="font-bold">
						#{{ selectedPok?.ndex }} - {{ selectedPok?.name }}
					</p>
					<button class="btn btn-square btn-error btn-sm" @click="modalCard?.closeModal()">
						<Icon class="h-6 w-6" icon="eva:close-outline" />
					</button>
				</div>
				<div class="flex flex-wrap justify-center gap-4">
					<div v-for="pok in orderSelected" :key="pok.index" class="flex flex-col justify-between gap-1">
						<div class="flex h-auto w-auto cursor-pointer flex-col items-center justify-center gap-1 md:w-24">
							<img class="mb-1 h-12 w-12 transition-all sm:h-16 sm:w-16"
								:src="`/sprites/webps/poke_icon_${pok.ndex}_${pok.form_index}_${pok.gender_id}_${pok.gmax_id}_${pok.subform_index}_f_${showShiny ? 'r' : 'n'}.webp`"
								@error="(e) => (e.target as HTMLImageElement).src = '/sprites/webps/poke_icon_0000_000_uk_n_00000000_f_n.webp'">
							<span class="text-center text-3xs font-medium sm:text-xs">{{ pok.name }}</span>
							<span class="whitespace-pre-wrap text-center text-3xs font-medium text-neutral-focus">{{
								pok.form }}</span>
						</div>
						<label class="flex cursor-pointer items-center gap-1">
							<input type="checkbox" :checked="isPokCaught(pok.index)"
								class="checkbox-secondary checkbox checkbox-sm border-2" @click="catchPok(pok.index)">
							<span class="text-sm font-medium">Obtained</span>
						</label>
					</div>
				</div>
				<p class="text-xl font-semibold text-secondary">
					Info:
				</p>
				<p>{{ selectedPok }}</p>
			</div>
		</Modal>
	</div>
</template>