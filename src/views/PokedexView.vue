<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { GenTitle } from '@/utility'
import type { Pokemon } from '@/utility'
import { ref, computed } from 'vue'

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
  <div class="flex flex-col items-center justify-center w-full gap-4 grow">
    <p class="flex items-center gap-2 font-medium">
      <span>Total Pokémons: {{ pokJson.length }}</span>
      <Icon icon="ic:baseline-catching-pokemon" class="w-6 h-6 swap-on" />
    </p>
    <div class="flex flex-wrap items-center gap-4">
      <div class="w-min input-group-bordered">
        <input v-model="searchItem" type="text" class="border-2 !border-secondary input !input-sm" placeholder="Search a Pokémon...">
        <button class="btn-secondary btn-square btn-sm btn" aria-label="Search a Pokémon">
          <Icon class="w-6 h-6" icon="fluent:search-24-filled" />
        </button>
      </div>
      <label class="swap btn-secondary btn-sm btn swap-rotate" aria-label="Expand/Collapse">
        <input type="checkbox" class="modal-toggle" :checked="isAllCollapsed" @click="isAllCollapsed = !isAllCollapsed">
        <span class="ml-8 text-sm capitalize">{{ isAllCollapsed ? 'Expand' : 'Collapse' }} all</span>
        <Icon icon="ion:chevron-expand" class="w-6 h-6 swap-on" />
        <Icon icon="ion:chevron-collapse" class="w-6 h-6 swap-off" />
      </label>
      <label class="flex items-center justify-between gap-2 cursor-pointer">
        <input v-model="showOnlyIcons" type="checkbox" class="!toggle !toggle-primary">
        <span class="text-sm font-medium select-none shrink-0">Show only icons</span>
      </label>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-4 grow">
      <div v-if="searchItem" class="flex flex-col items-center gap-4">
        <p class="text-xl font-bold text-secondary">Search result:</p>
        <div class="flex flex-wrap select-none rounded-xl bg-base-300 max-w-fit grow justify-items-center sm:p-2">
          <div v-if="searchFilter.length" v-for="pok in searchFilter" :key="pok.index"
            class="flex flex-col items-center justify-center w-20 h-auto cursor-pointer sm:w-24 sm:h-auto">
            <img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" :src="`/sprites/gen9/${parseInt(pok.ndex)}.png`">
            <span class="font-bold text-2xs sm:text-xs">#{{ pok.ndex }}</span>
            <span class="font-medium text-center text-3xs sm:text-xs">{{ pok.name }}</span>
          </div>
          <p v-else class="font-medium">No Pokémons found!</p>
        </div>
      </div>
      <Disclosure v-else v-for="(gen, i) in pokGens" :key="`gen_${i+1}`" :defaultOpen="true" as="div" v-slot="{ open }" 
        class="p-2 grow rounded-xl bg-base-300 max-w-fit">
        <div class="flex items-center justify-between gap-2">
          <div class="flex flex-col text-neutral">
            <div id="game_title" class="text-xl font-bold" v-html="GenTitle[i]"></div>
            <p class="flex items-center gap-2 text-xs font-medium text-neutral-focus">
              <span>Total Pokémons: {{ gen.length }}</span>
              <Icon icon="ic:baseline-catching-pokemon" class="w-4 h-4 swap-on" />
            </p>
          </div>
          <DisclosureButton as="template">
            <button class="swap btn-ghost btn-sm btn-square btn swap-rotate" aria-label="Expand/Collapse">
              <input type="checkbox" class="modal-toggle" :checked="open">
              <Icon icon="fluent:chevron-down-12-filled" class="w-6 h-6 swap-on" />
              <Icon icon="fluent:chevron-up-12-filled" class="w-6 h-6 swap-off" />
            </button>
          </DisclosureButton>
        </div>
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-500 ease-out"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0">
          <DisclosurePanel as="div" class="flex flex-wrap items-center justify-center select-none gap-y-4 text-2xs sm:text-xs sm:p-2">
            <div v-for="pok in gen" :key="pok.index"
              class="flex flex-col items-center justify-center w-20 h-auto cursor-pointer sm:w-24">
              <img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" 
                :src="`/sprites/gen9/${parseInt(pok.ndex)}.png`">
              <span v-show="!showOnlyIcons" class="font-bold">#{{ pok.ndex }}</span>
              <span v-show="!showOnlyIcons" class="font-medium text-center whitespace-pre-wrap">{{ pok.name }}</span>
            </div>
          </DisclosurePanel>
        </Transition>
      </Disclosure>
    </div>
    <button class="sticky z-50 self-end bottom-6 btn-secondary btn-circle btn" 
      aria-label="Go at the top" @click="scrollToTop">
      <Icon class="w-6 h-6" icon="ph:arrow-up-bold" />
    </button>
  </div>
</template>

<style>
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