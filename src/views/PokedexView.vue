<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { GenTitle, Pokemon } from '@/utility'

const pokJson: Pokemon[] = await fetch('/pokemon_all.json').then(d => d.json())

const allPok = pokJson.filter(p => p.original)
const totGens = 9
const pokGens: Pokemon[][] = []

for (let i = 1; i <= totGens; i++) {
  const first = allPok.findIndex(p => p.gen == i)
  const last = i == totGens ? allPok.length : allPok.findIndex(p => p.gen == i + 1)
  pokGens.push(allPok.slice(first, last))
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-center w-full gap-8 grow">
    <Disclosure v-for="(gen, i) in pokGens" :key="`gen_${i+1}`" :defaultOpen="true" as="div" v-slot="{ open }" 
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
        <DisclosurePanel as="div" class="flex flex-wrap items-center justify-center select-none text-2xs sm:text-xs sm:p-2">
          <div v-for="pok in gen" :key="pok.index"
            class="flex flex-col items-center justify-center w-20 h-24 cursor-pointer sm:w-24 sm:h-28">
            <img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" 
              :src="`/sprites/gen9/${parseInt(pok.ndex)}.png`">
            <span class="font-bold">#{{ pok.ndex }}</span>
            <span class="font-medium text-center whitespace-pre-wrap">{{ pok.name }}</span>
          </div>
        </DisclosurePanel>
      </Transition>
    </Disclosure>
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