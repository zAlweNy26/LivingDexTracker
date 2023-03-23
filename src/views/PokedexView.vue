<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { GenTitle, Pokemon } from '@/utility'

const pokJson: Pokemon[] = await fetch('/pokemon_all.json').then(d => d.json())

const allPok = pokJson.filter(p => p.original)
const totGens = 9
const pokGens: Pokemon[][] = []

for (let i = 1; i <= totGens; i++) {
  const first = allPok.findIndex(p => p.gen == i)
  const last = i == totGens ? allPok.length : allPok.findIndex(p => p.gen == i + 1) - 1
  pokGens.push(allPok.slice(first, last))
}

</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-8 grow">
    <div class="flex flex-wrap items-center justify-center gap-8 grow">
      <div v-for="(gen, i) in pokGens" :key="`box_${i}`" class="p-2 grow rounded-xl bg-base-300 max-w-fit">
        <div class="flex items-center justify-between gap-2">
          <div id="game_title" class="text-xl font-bold text-neutral" v-html="GenTitle[i]"></div>
          <label class="swap btn-ghost btn-sm btn-square btn swap-rotate" aria-label="Expand/Collapse">
            <input type="checkbox" class="modal-toggle">
            <Icon icon="fluent:chevron-down-12-filled" class="w-6 h-6 swap-on" />
            <Icon icon="fluent:chevron-up-12-filled" class="w-6 h-6 swap-off" />
          </label>
        </div>
        <div class="flex flex-wrap select-none sm:gap-4 text-2xs sm:text-xs sm:p-2">
          <div v-for="pok in gen" :key="pok.index"
            class="flex flex-col items-center justify-center w-20 cursor-pointer h-28">
            <img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" 
              :src="`/sprites/gen9/${parseInt(pok.ndex)}.png`">
            <span class="font-semibold">#{{ pok.ndex }}</span>
            <span class="font-medium text-center whitespace-pre-wrap">{{ pok.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #game_title > span {
    text-shadow: 1.5px 1.5px 0 #FFF, 1.5px -1.5px 0 #FFF, -1.5px 1.5px 0 #FFF, 
      -1.5px -1.5px 0 #FFF, 1.5px 0px 0 #FFF, 0px 1.5px 0 #FFF, 
      -1.5px 0px 0 #FFF, 0px -1.5px 0 #FFF, 1.5px 1.5px 0px #FFF;
  }

  [data-theme="dark"] #game_title > span {
    text-shadow: 1.5px 1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 
      -1.5px -1.5px 0 #000, 1.5px 0px 0 #000, 0px 1.5px 0 #000, 
      -1.5px 0px 0 #000, 0px -1.5px 0 #000, 1.5px 1.5px 0px #000;
  }
</style>