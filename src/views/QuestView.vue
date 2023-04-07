<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { QuestSpriteTypes } from '@/utility'
import type { PokemonQuest, QuestSpriteType } from '@/utility'

const pokJson: PokemonQuest[] = await fetch('/pokemon_quest.json').then(d => d.json())

const searchItem = ref("")
const showChineseNames = ref(false), showChineseExclusives = ref(true)
const selectSpriteType = ref<QuestSpriteType>("Model")

const scrollToTop = () => window.scrollTo({ behavior: 'smooth', left: 0, top: 0 })

const resultPok = computed(() => {
    let resPok = JSON.parse(JSON.stringify(pokJson)) as typeof pokJson

    if (!showChineseExclusives.value) {
        showChineseNames.value = false
        resPok = resPok.filter(p => !p.chinese)
    }

    return resPok
})

const searchFilter = computed(() => {
    let filteredPok = JSON.parse(JSON.stringify(pokJson)) as typeof pokJson
    filteredPok = filteredPok.filter(v => v.name.toLowerCase().includes(searchItem.value.toLowerCase()))
    return filteredPok
})
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full gap-4 grow">
        <p class="flex items-center gap-2 font-medium">
            <span>Total Pokémons: {{ pokJson.length }}</span>
            <Icon icon="ic:baseline-catching-pokemon" class="w-6 h-6 swap-on" />
        </p>
        <div class="flex flex-col items-center justify-center gap-4">
            <div class="flex flex-wrap items-center gap-4">
                <div class="w-min input-group-bordered">
                    <input v-model="searchItem" type="text" class="border-2 !border-secondary input !input-sm"
                        placeholder="Search a Pokémon...">
                    <button class="btn-secondary btn-square btn-sm btn" aria-label="Search a Pokémon">
                        <Icon class="w-6 h-6" icon="fluent:search-24-filled" />
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-4">
                <Listbox v-model="selectSpriteType">
                    <div class="relative flex flex-col">
                        <div class="px-2 py-1 text-sm font-medium text-center rounded-t-lg text-base-100 bg-secondary">
                            <span>Sprite Type</span>
                        </div>
                        <ListboxButton
                            class="flex items-center justify-between gap-2 px-2 py-1 text-sm rounded-b-lg shadow-lg cursor-pointer bg-base-200 outline-0">
                            <p class="font-semibold">{{ selectSpriteType }}</p>
                            <Icon icon="ion:chevron-expand" class="w-4 h-4 shrink-0" />
                        </ListboxButton>
                        <Transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                            <ListboxOptions
                                class="absolute z-40 w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
                                <ListboxOption v-slot="{ active, selected }" v-for="option in QuestSpriteTypes" :key="option"
                                    :value="option" as="template">
                                    <li :class="{ 'bg-primary text-base-100': active, 'bg-secondary text-base-100 font-bold': selected }"
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
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input v-model="showChineseExclusives" type="checkbox" class="!toggle !toggle-primary">
                        <p class="text-sm font-medium select-none shrink-0">Show Chinese exclusives</p>
                    </label>
                    <label v-if="showChineseExclusives" class="flex items-center gap-2 cursor-pointer">
                        <input v-model="showChineseNames" type="checkbox" class="!toggle !toggle-primary">
                        <p class="flex items-center justify-center gap-2 text-sm font-medium select-none shrink-0">
                            <span>Show Chinese names</span>
                            <Icon class="w-6 h-6" icon="twemoji:flag-china" />
                        </p>
                    </label>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4 grow">
            <div v-if="searchItem" class="flex flex-col items-center gap-4">
                <p class="text-xl font-bold text-secondary">Search result:</p>
                <div class="flex flex-wrap select-none rounded-xl bg-base-300 max-w-fit grow justify-items-center sm:p-2">
                    <div v-if="searchFilter.length" v-for="pok in searchFilter" :key="pok.index"
                        class="flex flex-col items-center justify-center w-20 h-auto cursor-pointer sm:w-24 sm:h-auto">
                        <img v-if="selectSpriteType == 'Model'" loading="lazy" class="w-12 h-12 transition-all sm:w-16 sm:h-16"
                            :src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-2.png`">
                        <img v-else-if="selectSpriteType == 'Icon'"  loading="lazy" class="w-12 h-12 transition-all sm:w-16 sm:h-16"
                            :src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-1.png`">
                        <img v-else-if="selectSpriteType == 'Shiny Model'"  loading="lazy" class="w-12 h-12 transition-all sm:w-16 sm:h-16"
                            :src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-3.png`">
                        <span class="font-bold text-2xs sm:text-xs">#{{ pok.ndex }}</span>
                        <span class="font-medium text-center text-3xs sm:text-xs">{{ pok.name }}</span>
                    </div>
                    <p v-else class="font-medium">No Pokémons found!</p>
                </div>
            </div>
            <div v-else
                class="flex flex-wrap items-center justify-center gap-2 p-2 select-none rounded-xl bg-base-300 max-w-fit text-2xs sm:text-xs sm:p-4">
                <div v-for="pok in resultPok" :key="pok.index"
                    class="flex flex-col items-center justify-center w-20 h-auto cursor-pointer sm:w-24">
                    <img v-if="selectSpriteType == 'Model'" loading="lazy" class="w-auto h-12 transition-all sm:h-16"
                        :src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-2.png`">
                    <img v-else-if="selectSpriteType == 'Icon'"  loading="lazy" class="w-auto h-12 transition-all sm:h-16"
                        :src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-1.png`">
                    <img v-else-if="selectSpriteType == 'Shiny Model'"  loading="lazy" class="w-auto h-12 transition-all sm:h-16"
                        :src="`/sprites/pokemon_quest/${parseInt(pok.ndex)}${pok.form_index ?? ''} Quest-3.png`">
                    <span class="font-bold">#{{ pok.ndex }}</span>
                    <span class="font-medium text-center whitespace-pre-wrap">{{ showChineseNames ? pok.c_name : pok.name }}</span>
                    <span v-if="pok.form_type && !showChineseNames" 
                        class="font-medium text-center whitespace-pre-wrap text-neutral-focus text-3xs">{{ pok.form_type }}</span>
                </div>
            </div>
        </div>
        <button class="sticky z-50 self-end bottom-6 btn-secondary btn-circle btn" aria-label="Go at the top"
            @click="scrollToTop">
            <Icon class="w-6 h-6" icon="ph:arrow-up-bold" />
        </button>
    </div>
</template>
