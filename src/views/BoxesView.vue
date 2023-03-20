<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, watch, computed } from 'vue'
import Modal from '@components/Modal.vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import pokJson from '@assets/pokemon_all.json'

enum Region {
  Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, RealWorld, Galar, Hisui, Paldea
}

const orderOptions = [ "National Dex", "Release", "Region", "Generation", "Alphabetical" ]
const whereAltsOptions = [ "After everything", "Near the original", "Hidden" ]
const altsOptions = [ "Regional", "Generic", "Mega Evolution", "Gigantamax", "Gender", "Cap Pikachu", "Unown", "Vivillon", "Alcremie", "Totem", "Partner LGPE" ]
const selectWhereAlts = ref(whereAltsOptions[2])
const selectAlts = ref<string[]>([])
const selectOrder = ref(orderOptions[0])

const allPok = (JSON.parse(JSON.stringify(pokJson)) as typeof pokJson)
  .filter(p => !((p.name == 'Scatterbug' && ![0, 1].includes(parseInt(p.form_index))) 
    || (p.name == 'Spewpa' && parseInt(p.form_index) != 0)
    || (p.name == 'Mothim' && parseInt(p.form_index) != 0)
    || (p.name.includes('Greninja') && ![0, 2].includes(parseInt(p.form_index)))))
const catchedPok = ref<boolean[]>(new Array(allPok.length).fill(false))
const boxNames = ref<string[][]>(new Array(Math.ceil(allPok.length / 30)).fill([]))
const selectedPok = ref<typeof allPok[0]>()
const modalCard = ref<InstanceType<typeof Modal>>()

const orderBy = computed(() => {
  let orderedPok = JSON.parse(JSON.stringify(allPok)) as typeof pokJson
  let j = 0

  /*if (selectWhereAlts.value == "Hidden") {
    orderedPok = orderedPok.filter(p => {
      return selectWhereAlts.value != "Hidden" && (
        (selectAlts.value.includes("Regional") && !["Alolan", "Galarian", "Hisuian", "Paldean"].includes(p.form_type))
      )
    })
  }*/

  if (!selectAlts.value.includes("Regional")) {
    orderedPok = orderedPok.filter(p => !["Alolan", "Galarian", "Hisuian", "Paldean"].includes(p.form_type))
  }
  if (!selectAlts.value.includes("Totem")) {
    orderedPok = orderedPok.filter(p => !p.form?.includes("Totem"))
  }
  if (!selectAlts.value.includes("Mega Evolution")) {
    orderedPok = orderedPok.filter(p => !(p.form_type.includes("Mega") || p.name.includes("Primal")))
  }
  if (!selectAlts.value.includes("Gigantamax")) {
    orderedPok = orderedPok.filter(p => !p.form_type.includes("Gigantamax"))
  }
  if (!selectAlts.value.includes("Gender")) {
    orderedPok = orderedPok.filter(p => !p.form?.includes("Female"))
  }
  if (!selectAlts.value.includes("Cap Pikachu")) {
    orderedPok = orderedPok.filter(p => !p.form?.includes("Cap"))
  }
  if (!selectAlts.value.includes("Partner LGPE")) {
    orderedPok = orderedPok.filter(p => !p.sub_gen.includes("LGPE"))
  }
  if (!selectAlts.value.includes("Alcremie")) {
    orderedPok = orderedPok.filter(p => !((p.name == 'Alcremie' || p.name == 'G-Max Alcremie')
      && !(parseInt(p.subform_index) == 0 && parseInt(p.form_index) == 0)))
  }
  if (!selectAlts.value.includes("Vivillon")) {
    orderedPok = orderedPok.filter(p => !((p.name == 'Vivillon' && parseInt(p.form_index) != 6) 
      || (p.name == 'Scatterbug' && parseInt(p.form_index) != 0)))
  }
  if (!selectAlts.value.includes("Unown")) {
    orderedPok = orderedPok.filter(p => !(p.name == 'Unown' && parseInt(p.form_index) != 5))
  }
  if (!selectAlts.value.includes("Generic")) {
    orderedPok = orderedPok.filter(p => !((p.name == 'Castform' && parseInt(p.form_index) != 0)
      || (p.name == 'Deoxys' && parseInt(p.form_index) != 0) || (p.name == 'Burmy' && parseInt(p.form_index) != 0)
      || (p.name == 'Wormadam' && parseInt(p.form_index) != 0)
      || (p.name == 'Cherrim' && parseInt(p.form_index) != 0)
      || (p.name == 'Shellos' && parseInt(p.form_index) != 0)
      || (p.name == 'Gastrodon' && parseInt(p.form_index) != 0)
      || (p.name.includes('Rotom') && parseInt(p.form_index) != 0)
      || (p.name == 'Dialga' && parseInt(p.form_index) != 0)
      || (p.name == 'Palkia' && parseInt(p.form_index) != 0)
      || (p.name == 'Giratina' && parseInt(p.form_index) != 0)
      || (p.name == 'Shaymin' && parseInt(p.form_index) != 0)
      || (p.name == 'Arceus' && parseInt(p.form_index) != 0)
      || (p.name == 'Basculin' && parseInt(p.form_index) != 0)
      || (p.name == 'Deerling' && parseInt(p.form_index) != 0)
      || (p.name == 'Sawsbuck' && parseInt(p.form_index) != 0)
      || (p.name == 'Darmanitan' && parseInt(p.form_index) != 0)
      || (p.name == 'Tornadus' && parseInt(p.form_index) != 0)
      || (p.name == 'Thundurus' && parseInt(p.form_index) != 0)
      || (p.name == 'Landorus' && parseInt(p.form_index) != 0)
      || (p.name.includes('Kyurem') && parseInt(p.form_index) != 0)
      || (p.name == 'Keldeo' && parseInt(p.form_index) != 0)
      || (p.name == 'Meloetta' && parseInt(p.form_index) != 0)
      || (p.name == 'Genesect' && parseInt(p.form_index) != 0)
      || (p.name.includes('Greninja') && parseInt(p.form_index) != 0)))
  }

  boxNames.value = new Array(Math.ceil(allPok.length / 30)).fill([])

  if (selectOrder.value == "Alphabetical") {
    orderedPok = orderedPok.sort((p1, p2) => p1.name.localeCompare(p2.name))
    orderedPok.forEach((e, i) => {
      if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
      if (!boxNames.value[j].includes(e.name[0])) boxNames.value[j].push(e.name[0])
    })
  } else if (selectOrder.value == "Region") {
    orderedPok = orderedPok.sort((p1, p2) => p1.region - p2.region || p1.ndex.localeCompare(p2.ndex))
    orderedPok.forEach((e, i) => {
      if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
      if (!boxNames.value[j].includes(Region[e.region])) boxNames.value[j].push(Region[e.region])
    })
  } else if (selectOrder.value == "Generation") {
    orderedPok = orderedPok.sort((p1, p2) => p1.gen - p2.gen)
    orderedPok.forEach((e, i) => {
      if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
      if (!boxNames.value[j].includes(`Gen. ${e.gen}`)) boxNames.value[j].push(`Gen. ${e.gen}`)
    })
  } else if (selectOrder.value == "National Dex") {
    orderedPok = orderedPok.sort((p1, p2) => p1.ndex.localeCompare(p2.ndex))
    orderedPok.forEach((e, i) => {
      if ((i > 0 && (i - 29) % 30 == 0) || i == orderedPok.length - 1) boxNames.value[j].push(e.ndex) //TODO: ottimizzare codice (non so perchè funzioni)
      if ((i > 0 && i % 30 == 0)) boxNames.value[++j] = []
      if (boxNames.value[j].length == 0) boxNames.value[j].push(e.ndex)
    })
  }

  return orderedPok
})

const openPokInfo = (Dex: number) => {
  selectedPok.value = allPok[Dex - 1]
  modalCard.value?.openModal()
}

const showLabel = (pok: typeof allPok[0]) => { //TODO: typeof brutto da fixare
  if (selectAlts.value.includes("Gender") && pok.form == 'Male') return true
  else if (!selectAlts.value.includes("Gender") && pok.form == 'Male') return false
  
  if (selectAlts.value.includes('Vivillon') && [664, 665, 666].includes(parseInt(pok.ndex))) return true
  else if (!selectAlts.value.includes('Vivillon') && [664, 665, 666].includes(parseInt(pok.ndex))) return false

  if (selectAlts.value.includes('Unown') && pok.form == 'F') return true
  else if (!selectAlts.value.includes('Unown') && pok.form == 'F') return false

  if (!selectAlts.value.includes('Generic')) {
    if (pok.name == "Castform") return false
    if (pok.name == "Deoxys") return false
    if (pok.name == "Burmy") return false
    if (pok.name == "Wormadam") return false
    if (pok.name == "Cherrim") return false
    if (pok.name == "Shellos") return false
    if (pok.name == "Gastrodon") return false
    if (pok.name == "Rotom") return false
    if (pok.name == "Dialga") return false
    if (pok.name == "Palkia") return false
    if (pok.name == "Giratina") return false
    if (pok.name == "Shaymin") return false
    if (pok.name == "Arceus") return false
    if (pok.name == "Basculin") return false
    if (pok.name == "Deerling") return false
    if (pok.name == "Sawsbuck") return false
    if (pok.name == "Darmanitan") return false
    if (pok.name == "Tornadus") return false
    if (pok.name == "Thundurus") return false
    if (pok.name == "Landorus") return false
    if (pok.name == "Keldeo") return false
    if (pok.name == "Meloetta") return false
    if (pok.name == "Genesect") return false
  }

  return true
}

watch(selectAlts, (arr, prev) => {
  if (arr.length == 0) {
    selectWhereAlts.value = "Hidden"
  } //selectAlts.value.push(...prev)
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-8 grow">
    <div class="flex flex-wrap items-center gap-2">
      <Listbox v-model="selectOrder">
        <div class="relative flex flex-col border-neutral">
          <div class="px-2 py-1 text-sm font-medium text-center rounded-t-lg text-base-100 bg-primary">
            <span>Order by</span>
          </div>
          <ListboxButton class="flex items-center justify-between gap-2 px-2 py-1 text-sm rounded-b-lg shadow-lg cursor-pointer bg-base-200 outline-0">
            <p class="font-semibold">{{ selectOrder }}</p>
            <Icon icon="fluent:chevron-up-down-16-filled" class="w-4 h-4 shrink-0" />
          </ListboxButton>
          <Transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-40 w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
              <ListboxOption v-slot="{ active, selected }" v-for="option in orderOptions" :key="option" :value="option" as="template">
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
      <Listbox v-model="selectWhereAlts">
        <div class="relative flex flex-col border-neutral">
          <div class="px-2 py-1 text-sm font-medium text-center rounded-t-lg text-base-100 bg-primary">
            <span>Alt Forms position</span>
          </div>
          <ListboxButton class="flex items-center justify-between gap-2 px-2 py-1 text-sm rounded-b-lg shadow-lg cursor-pointer bg-base-200 outline-0">
            <p class="font-semibold">{{ selectWhereAlts }}</p>
            <Icon icon="fluent:chevron-up-down-16-filled" class="w-4 h-4 shrink-0" />
          </ListboxButton>
          <Transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-40 w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
              <ListboxOption v-slot="{ active, selected }" v-for="option in whereAltsOptions" :key="option" :value="option" as="template">
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
      <Listbox multiple v-model="selectAlts" v-if="selectWhereAlts != 'Hidden'">
        <div class="relative flex flex-col border-neutral">
          <ListboxButton class="flex items-center gap-2 px-2 py-1 text-sm rounded-lg shadow-lg cursor-pointer bg-base-200 outline-0 disabled:bg-base-300">
            <p class="font-semibold">Alt Forms shown</p>
            <Icon icon="fluent:chevron-up-down-16-filled" class="w-4 h-4 shrink-0" />
          </ListboxButton>
          <Transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-40 w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
              <ListboxOption v-slot="{ active, selected }" v-for="option in altsOptions" :key="option" :value="option" as="template">
                <li :class="{ 'bg-primary text-base-100': active }" class="flex items-center gap-2 px-2 py-1 font-medium transition-colors">
                  <input type="checkbox" :checked="selected" class="border-2 checkbox checkbox-sm checkbox-secondary" />
                  <p class="truncate">
                    {{ option }}
                  </p>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-8 grow">
      <div v-for="i in Math.ceil(orderBy.length / 30)" :key="`box_${i}`" class="p-2 grow rounded-xl bg-base-300 max-w-fit">
        <div class="flex items-center justify-between gap-2">
          <div class="text-xl font-bold text-secondary">
            {{ boxNames[i - 1].join(" - ") }}
          </div>
          <label class="swap btn-ghost btn-sm btn-square btn swap-rotate" aria-label="Expand/Collapse">
            <input type="checkbox" class="modal-toggle">
            <Icon icon="fluent:chevron-down-12-filled" class="w-6 h-6 swap-on" />
            <Icon icon="fluent:chevron-up-12-filled" class="w-6 h-6 swap-off" />
          </label>
        </div>
        <div class="grid grid-cols-6 grid-rows-5 select-none sm:gap-4 text-2xs sm:text-xs sm:p-2">
          <div v-for="pok in orderBy.slice((i - 1) * 30, i * 30)" :key="pok.index"
            class="flex flex-col items-center justify-center w-20 cursor-pointer h-28" @contextmenu.prevent="openPokInfo(parseInt(pok.ndex))"
            @click="catchedPok[parseInt(pok.ndex) - 1] = !catchedPok[parseInt(pok.ndex) - 1]">
            <img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" 
              :class="{ 'brightness-[.25]': catchedPok[parseInt(pok.ndex) - 1] }" 
              :src="`/sprites/home/poke_icon_${pok.ndex}_${pok.form_index}_${pok.gender_id}_${pok.gmax_id}_${pok.subform_index}_f_n.png`"
              @error="(e) => (e.target as HTMLImageElement).src = '/sprites/home/poke_icon_0000_000_uk_n_00000000_f_n.png'">
            <!--<img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" 
              :class="{ 'brightness-[.25]': !catchedPok[parseInt(pok.ndex) - 1] }" 
              :src="`/sprites/gen9/${parseInt(pok.form_index) > 0 ? `${parseInt(pok.ndex)}-${parseInt(pok.form_index)}` : parseInt(pok.ndex)}.png`">-->
            <span class="font-semibold">{{ pok.ndex }}</span>
            <span class="font-medium text-center whitespace-pre-wrap">{{ pok.name }}</span>
            <span v-if="showLabel(pok)" 
              class="font-medium text-center whitespace-pre-wrap text-neutral-focus text-3xs">{{ pok.form }}</span>
          </div>
        </div>
      </div>
    </div>
    <Modal ref="modalCard">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col">
          <p class="text-sm font-semibold">#{{ selectedPok?.ndex }}</p>
          <p class="text-xl font-medium">{{ selectedPok?.name }}</p>
        </div>
        <div class="flex justify-between gap-2">
          <label class="flex items-center justify-between gap-2 cursor-pointer">
            <input type="checkbox" :checked="catchedPok[parseInt(selectedPok?.ndex ?? '')]"
              @click="catchedPok[parseInt(selectedPok?.ndex ?? '')] = !catchedPok[parseInt(selectedPok?.ndex ?? '')]"
              class="border-2 checkbox checkbox-sm checkbox-secondary" />
            <span class="text-sm font-medium">Obtained</span> 
          </label>
        </div>
      </div>
    </Modal>
  </div>
</template>
