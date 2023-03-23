<script setup lang="ts">
import { Icon } from '@iconify/vue'
import pokJson from '@assets/pokemon_all.json'

type Pokemon = typeof pokJson[0]

enum Games {
  "Gen. 1: <span style='color:#FF1111;'>Red</span> - <span style='color:#11BB11;'>Green</span> - <span style='color:#1111FF;'>Blue</span> - <span style='color:#FFD733;'>Yellow</span>",
  "Gen. 2: <span style='color:#DAA520;'>Gold</span> - <span style='color:#C0C0C0;'>Silver</span> - <span style='color:#4FD9FF;'>Crystal</span>",
  "Gen. 3: <span style='color:#A00000;'>Ruby</span> - <span style='color:#0000A0;'>Sapphire</span> - <span style='color:#FF7327;'>FireRed</span> - <span style='color:#00DD00;'>LeafGreen</span> - <span style='color:#00A000;'>Emerald</span>",
  "Gen. 4: <span style='color:#AAAAFF;'>Diamond</span> - <span style='color:#FFAAAA;'>Pearl</span> - <span style='color:#999999;'>Platinum</span> - <span style='color:#B69E00;'>HeartGold</span> - <span style='color:#C0C0E1;'>SoulSilver</span>",
  "Gen. 5: <span style='color:#444444;'>Black</span> - <span style='color:#C3C3C3;'>White</span> - <span style='color:#424B50;'>Black 2</span> - <span style='color:#E3CED0;'>White 2</span>",
  "Gen. 6: <span style='color:#025DA6;'>X</span> - <span style='color:#EA1A3E;'>Y</span> - <span style='color:#AB2813;'>Omega Ruby</span> - <span style='color:#26649C;'>Alpha Sapphire</span>",
  "Gen. 7: <span style='color:#F2952D;'>Sun</span> - <span style='color:#5599C8;'>Moon</span> - <span style='color:#EE7936;'>Ultra Sun</span> - <span style='color:#884799;'>Ultra Moon</span> - <span style='color:#ffcf11;'>Let's Go, Pikachu!</span> - <span style='color:#c47e39;'>Let's Go, Eevee!</span>",
  "Gen. 8: <span style='color:#00AEEF;'>Sword</span> - <span style='color:#ED1165;'>Shield</span> - <span style='color:#01A4E7;'>Brilliant Diamond</span> - <span style='color:#C584DD;'>Shining Pearl</span> - <span style='color:#CECDBE;'>Legends: Arceus</span>",
  "Gen. 9: <span style='color:#D90D19;'>Scarlet</span> - <span style='color:#842F8C;'>Violet</span>"
}

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
          <div id="game_title" class="text-xl font-bold text-neutral" v-html="Games[i]"></div>
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