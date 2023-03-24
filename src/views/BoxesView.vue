<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import Modal from '@components/Modal.vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption,
  Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Region, Game, Pokemon } from '@/utility'

const pokJson: Pokemon[] = await fetch('/pokemon_all.json').then(d => d.json())

const orderOptions = [ "National Dex", "Release", "Region", "Generation", "Alphabetical" ]
const whereAltsOptions = [ "Hidden", "Near the original", /*"After everything"*/ ]
const variantsOptions = [ "Regional", "Generic", "Gender", "Cap Pikachu", "Unown", "Vivillon", "Alcremie", "Totem", "Titan", "Partner LGPE" ]
const transformsOptions = [ "Mega Evolution", "Primal Reversion", "Bond Phenomenon", "Ultra Burst", "Gigantamax", "Eternamax" ]
const selectWhereAlts = ref(whereAltsOptions[0])
const selectVariants = ref<string[]>([])
const selectTransforms = ref<string[]>([])
const selectOrder = ref(orderOptions[0])
const isAllCollapsed = ref(false)

const basicFilter = (name: string, formIndex: number) => {
  return !(
    (name == 'Scatterbug' && ![0, 1].includes(formIndex)) || 
    (name == 'Spewpa' && formIndex != 0) || 
    (name == 'Mothim' && formIndex != 0) ||
    (name == "Minior" && (formIndex != 0 && formIndex < 7)) ||
    (name == 'Koraidon' && ![0, 1].includes(formIndex)) || 
    (name == 'Miraidon' && ![0, 1].includes(formIndex))
  )
}
const onlyRegionals = (form: string) => ["Alolan", "Galarian", "Hisuian", "Paldean"].some(r => form.includes(r))
const onlyTotems = (form: string) => form.includes("Totem")
const onlyMega = (form: string) => form.includes("Mega")
const onlyGiga = (form: string) => form.includes("Gigantamax")
const onlyTitan = (form: string) => form.includes("Titan")
const onlyBonds = (form: string) => form.includes("Battle Bond")
const onlyFemale = (form: string) => form.includes("Female")
const onlyPrimal = (form: string) => form.includes("Primal")
const onlyEterna = (form: string) => form.includes("Eternamax")
const onlyCaps = (form: string) => form.includes("Cap")
const onlyLGPE = (name: string, subGen: string) => subGen.includes("LGPE") && (name == "Pikachu" || name == "Eevee")
const onlyAlcremie = (name: string, formType: string) => name == "Alcremie" && formType != "Default"
const onlyUnown = (name: string, formIndex: number) => name == 'Unown' && formIndex != 5
const onlyVivillon = (name: string, formIndex: number) => {
  return ((name == 'Vivillon' && formIndex != 6) || (name == 'Scatterbug' && formIndex != 0))
}
const onlyGeneric = (name: string, formIndex: number) => {
  return (
    (name == 'Castform' && formIndex != 0) || (name == 'Deoxys' && formIndex != 0) || 
    (name == 'Burmy' && formIndex != 0) ||  (name == 'Wormadam' && formIndex != 0) || 
    (name == 'Cherrim' && formIndex != 0) || (name == 'Shellos' && formIndex != 0) || 
    (name == 'Gastrodon' && formIndex != 0) || (name.includes('Rotom') && formIndex != 0) || 
    (name == 'Dialga' && formIndex != 0) || (name == 'Palkia' && formIndex != 0) || 
    (name == 'Giratina' && formIndex != 0) || (name == 'Shaymin' && formIndex != 0) || 
    (name == 'Arceus' && formIndex != 0) || (name == 'Basculin' && formIndex != 0) || 
    (name == 'Deerling' && formIndex != 0) || (name == 'Sawsbuck' && formIndex != 0) || 
    (name == 'Darmanitan' && formIndex != 0) || (name == 'Tornadus' && formIndex != 0) || 
    (name == 'Thundurus' && formIndex != 0) || (name == 'Landorus' && formIndex != 0) || 
    (name.includes('Kyurem') && formIndex != 0) || (name == 'Keldeo' && formIndex != 0) || 
    (name == 'Meloetta' && formIndex != 0) || (name == 'Genesect' && formIndex != 0) ||
    (name == 'Flabébé' && formIndex != 0) || (name == 'Floette' && formIndex != 0) ||
    (name == 'Florges' && formIndex != 0) || (name == 'Furfrou' && formIndex != 0) ||
    (name == 'Aegislash' && formIndex != 0) || (name == 'Pumpkaboo' && formIndex != 0) ||
    (name == 'Gourgeist' && formIndex != 0) || (name == "Minior" && formIndex != 7) ||
    (name.includes("Pichu") && formIndex != 0) || (name == 'Xerneas' && formIndex != 1) || 
    (name == 'Zygarde' && formIndex != 0) || (name == 'Rockruff' && formIndex != 0) || 
    (name == 'Lycanroc' && formIndex != 0) || (name == 'Wishiwashi' && formIndex != 0) || 
    (name == 'Hoopa' && formIndex != 0) || (name == 'Oricorio' && formIndex != 0) || 
    (name == 'Silvally' && formIndex != 0) || (name == 'Mimikyu' && ![0, 2].includes(formIndex)) || 
    (name.includes("Necrozma") && formIndex != 0) || (name == 'Magearna' && formIndex != 0) ||
    (name == 'Sinistea' && formIndex != 0) || (name == 'Polteageist' && formIndex != 0) ||
    (name == 'Cramorant' && formIndex != 0) || (name == 'Toxtricity' && formIndex != 0) ||
    (name == 'Eiscue' && formIndex != 0) || (name == 'Morpeko' && formIndex != 0) ||
    (name == 'Zacian' && formIndex != 1) || (name == 'Zamazenta' && formIndex != 1) ||
    (name == 'Urshifu' && formIndex != 0) || (name.includes('Zarude') && formIndex != 0) ||
    (name.includes('Calyrex') && formIndex != 0) || (name == 'Enamorus' && formIndex != 0) || 
    (name == 'Maushold' && formIndex != 1) || (name == 'Squawkabilly' && formIndex != 0) ||
    (name == 'Palafin' && formIndex != 0) || (name == 'Tatsugiri' && formIndex != 0) ||
    (name == 'Dudunsparce' && formIndex != 0) || (name == 'Gimmighoul' && formIndex != 0) ||
    (name == 'Koraidon' && formIndex != 0) || (name == 'Miraidon' && formIndex != 0)
  )
}

const allPok = (JSON.parse(JSON.stringify(pokJson)) as typeof pokJson).filter(p => basicFilter(p.name, parseInt(p.form_index)))
const catchedPok = ref<boolean[]>(new Array(allPok.length).fill(false))
const boxNames = ref<string[][]>(new Array(Math.ceil(allPok.length / 30)).fill([]))
const selectedPok = ref<typeof allPok[0]>()
const showShiny = ref(false)
const modalCard = ref<InstanceType<typeof Modal>>()
const searchItem = ref("")

const searchForItem = () => {
	console.log("search")
}

const orderBy = computed(() => {
  let orderedPok = JSON.parse(JSON.stringify(allPok)) as typeof pokJson
  let j = 0

  orderedPok = orderedPok.filter(p => {
    if (selectWhereAlts.value === "Hidden") return p.original
    else {
      return !(
        (!selectVariants.value.includes("Regional") && onlyRegionals(p.form ?? "")) || 
        (!selectVariants.value.includes("Totem") && onlyTotems(p.form ?? "")) ||
        (!selectVariants.value.includes("Titan") && onlyTitan(p.form ?? "")) ||
        (!selectTransforms.value.includes("Mega Evolution") && onlyMega(p.form ?? "")) ||
        (!selectTransforms.value.includes("Gigantamax") && onlyGiga(p.form ?? "")) ||
        (!selectTransforms.value.includes("Bond Phenomenon") && onlyBonds(p.form ?? "")) ||
        (!selectTransforms.value.includes("Eternamax") && onlyEterna(p.form ?? "")) ||
        (!selectTransforms.value.includes("Primal Reversion") && onlyPrimal(p.form ?? "")) ||
        (!selectVariants.value.includes("Gender") && onlyFemale(p.form ?? "")) ||
        (!selectVariants.value.includes("Cap Pikachu") && onlyCaps(p.form ?? "")) ||
        (!selectVariants.value.includes("Partner LGPE") && onlyLGPE(p.name, p.sub_gen)) ||
        (!selectVariants.value.includes("Alcremie") && onlyAlcremie(p.name, p.form_type)) ||
        (!selectVariants.value.includes("Unown") && onlyUnown(p.name, parseInt(p.form_index))) ||
        (!selectVariants.value.includes("Vivillon") && onlyVivillon(p.name, parseInt(p.form_index))) ||
        (!selectVariants.value.includes("Generic") && onlyGeneric(p.name, parseInt(p.form_index)))
      )
    }
  })

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
    orderedPok = orderedPok.sort((p1, p2) => p1.gen - p2.gen || p1.ndex.localeCompare(p2.ndex))
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
  } else if (selectOrder.value == "Release") {
    orderedPok = orderedPok.sort((p1, p2) => p1.game - p2.game || p1.ndex.localeCompare(p2.ndex))
    orderedPok.forEach((e, i) => {
      if (i > 0 && i % 30 == 0) boxNames.value[++j] = []
      if (!boxNames.value[j].includes(Game[e.game])) boxNames.value[j].push(Game[e.game])
    })
  }

  /*if (selectWhereAlts.value == "After everything") { //TODO: Farlo funzionare
    orderedPok = orderedPok.sort((p1, p2) => (((p2.original ?? false) ? 1 : 0) - ((p1.original ?? false) ? 1 : 0)) || p1.ndex.localeCompare(p2.ndex))
  }*/

  return orderedPok
})

const openPokInfo = (Dex: number) => {
  selectedPok.value = allPok[Dex - 1]
  modalCard.value?.openModal()
}

const showLabel = (pok: Pokemon) => {
  if (selectWhereAlts.value === "Hidden") return false

  const genderIncluded = selectVariants.value.includes("Gender")
  const vivillonIncluded = selectVariants.value.includes("Vivillon")
  const unownIncluded = selectVariants.value.includes("Unown")
  const alcremieIncluded = selectVariants.value.includes("Alcremie")
  const genericIncluded = selectVariants.value.includes("Generic")
  const totemIncluded = selectVariants.value.includes("Totem")
  
  if (pok.form === 'Male') return genderIncluded
  if ([664, 665, 666].includes(parseInt(pok.ndex))) return vivillonIncluded
  if (pok.form === 'F') return unownIncluded
  if (pok.name === 'Alcremie') return alcremieIncluded
  if (pok.name === 'Mimikyu' && !pok.form?.includes("Totem")) return genericIncluded
  else if (pok.name === 'Mimikyu') return totemIncluded

  if (!genericIncluded) {
    const excludedNames = [
      "Castform", "Deoxys", "Burmy", "Wormadam", "Cherrim", "Shellos", "Gastrodon", 
      "Rotom", "Dialga", "Palkia", "Giratina", "Shaymin", "Arceus", "Basculin", "Deerling", 
      "Sawsbuck", "Darmanitan", "Tornadus", "Thundurus", "Landorus", "Keldeo", "Meloetta", "Genesect",
      "Flabébé", "Floette", "Florges", "Furfrou", "Aegislash", "Pumpkaboo", "Gourgeist", "Xerneas",
      "Zygarde", "Rockruff", "Lycanroc", "Wishiwashi", "Hoopa", "Oricorio", "Silvally",
      "Sinistea", "Polteageist", "Toxtricity", "Eiscue", "Morpeko", "Zacian", "Zamazenta", "Urshifu",
      "Enamorus", "Maushold", "Squawkabilly", "Palafin", "Tatsugiri", "Dudunsparce", "Gimmighoul",
      "Koraidon", "Miraidon"
    ]
    return !excludedNames.includes(pok.name)
  }
  
  return true
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full gap-8 grow">
    <div class="flex flex-wrap items-center gap-4">
      <div class="input-group-bordered w-min outline outline-offset-0 outline-secondary outline-2">
        <input v-model="searchItem" type="text" class="input !input-sm" placeholder="Search a Pokémon..." @keyup.enter="searchForItem">
        <button class="btn-secondary btn-square btn-sm btn" aria-label="Search a Pokémon" @click="searchForItem">
          <Icon class="w-6 h-6" icon="fluent:search-24-filled" />
        </button>
      </div>
      <label class="swap btn-secondary btn-sm btn swap-rotate" aria-label="Expand/Collapse">
        <input type="checkbox" class="modal-toggle" :checked="isAllCollapsed" @click="isAllCollapsed = !isAllCollapsed">
        <span class="ml-8 text-sm capitalize">{{ isAllCollapsed ? 'Expand' : 'Collapse' }} all</span>
        <Icon icon="ion:chevron-expand" class="w-6 h-6 swap-on" />
        <Icon icon="ion:chevron-collapse" class="w-6 h-6 swap-off" />
      </label>
      <Listbox v-model="selectOrder">
        <div class="relative flex flex-col">
          <div class="px-2 py-1 text-sm font-medium text-center rounded-t-lg text-base-100 bg-secondary">
            <span>Order by</span>
          </div>
          <ListboxButton class="flex items-center justify-between gap-2 px-2 py-1 text-sm rounded-b-lg shadow-lg cursor-pointer bg-base-200 outline-0">
            <p class="font-semibold">{{ selectOrder }}</p>
            <Icon icon="ion:chevron-expand" class="w-4 h-4 shrink-0" />
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
        <div class="relative flex flex-col">
          <div class="px-2 py-1 text-sm font-medium text-center rounded-t-lg text-base-100 bg-secondary">
            <span>Alt Forms position</span>
          </div>
          <ListboxButton class="flex items-center justify-between gap-2 px-2 py-1 text-sm rounded-b-lg shadow-lg cursor-pointer bg-base-200 outline-0">
            <p class="font-semibold">{{ selectWhereAlts }}</p>
            <Icon icon="ion:chevron-expand" class="w-4 h-4 shrink-0" />
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
      <Listbox multiple v-model="selectVariants" v-if="selectWhereAlts != 'Hidden'">
        <div class="relative flex flex-col">
          <ListboxButton class="flex items-center gap-2 px-2 py-1 text-sm rounded-lg shadow-lg cursor-pointer bg-base-200 outline-0 disabled:bg-base-300">
            <p class="font-semibold">Variants shown</p>
            <Icon icon="ion:chevron-expand" class="w-4 h-4 shrink-0" />
          </ListboxButton>
          <Transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-40 w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
              <ListboxOption v-slot="{ active, selected }" v-for="option in variantsOptions" :key="option" :value="option" as="template">
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
      <Listbox multiple v-model="selectTransforms" v-if="selectWhereAlts != 'Hidden'">
        <div class="relative flex flex-col">
          <ListboxButton class="flex items-center gap-2 px-2 py-1 text-sm rounded-lg shadow-lg cursor-pointer bg-base-200 outline-0 disabled:bg-base-300">
            <p class="font-semibold">Transformations shown</p>
            <Icon icon="ion:chevron-expand" class="w-4 h-4 shrink-0" />
          </ListboxButton>
          <Transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions class="absolute z-40 w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
              <ListboxOption v-slot="{ active, selected }" v-for="option in transformsOptions" :key="option" :value="option" as="template">
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
      <label class="flex items-center justify-between gap-2 cursor-pointer">
        <input v-model="showShiny" type="checkbox" class="!toggle !toggle-primary">
        <span class="text-sm font-medium select-none shrink-0">Show Shiny</span>
      </label>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-8 grow">
      <div v-if="searchItem" class="grid grid-cols-6 grid-rows-5 select-none justify-items-center text-2xs sm:text-xs sm:p-2">
        Ciao
      </div>
      <Disclosure v-else v-for="i in Math.ceil(orderBy.length / 30)" :key="`box_${i}`" as="div" 
        v-slot="{ open }" :defaultOpen="true" class="flex flex-col self-stretch p-2 grow rounded-xl bg-base-300 max-w-fit">
        <div class="flex items-center justify-between gap-2">
          <div class="text-xl font-bold text-secondary">
            {{ boxNames[i - 1].join(" - ") }}
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
          <DisclosurePanel as="div" class="grid grid-cols-6 grid-rows-5 select-none grow justify-items-center sm:p-2">
            <div v-for="pok in orderBy.slice((i - 1) * 30, i * 30)" :key="pok.index"
              class="flex flex-col items-center justify-center w-20 h-auto cursor-pointer sm:w-24 sm:h-auto"
              @contextmenu.prevent="openPokInfo(parseInt(pok.ndex))"
              @click="catchedPok[parseInt(pok.ndex) - 1] = !catchedPok[parseInt(pok.ndex) - 1]">
              <img loading="lazy" class="w-12 h-12 mb-1 transition-all sm:w-16 sm:h-16" 
                :class="{ 'brightness-[.25]': catchedPok[parseInt(pok.ndex) - 1] }" 
                :src="showShiny ? 
                  `/sprites/webps/poke_icon_${pok.ndex}_${pok.form_index}_${pok.gender_id}_${pok.gmax_id}_${pok.subform_index}_f_r.webp` : 
                  `/sprites/webps/poke_icon_${pok.ndex}_${pok.form_index}_${pok.gender_id}_${pok.gmax_id}_${pok.subform_index}_f_n.webp`"
                @error="(e) => (e.target as HTMLImageElement).src = '/sprites/webps/poke_icon_0000_000_uk_n_00000000_f_n.webp'">
              <span class="font-bold text-2xs sm:text-xs">#{{ pok.ndex }}</span>
              <span class="font-medium text-center text-3xs sm:text-xs">{{ pok.name }}</span>
              <!-- TODO: Aggiustare testi per mobile -->
              <span v-if="showLabel(pok)"
                class="font-medium text-center whitespace-pre-wrap text-neutral-focus text-3xs">{{ pok.form }}</span>
            </div>
          </DisclosurePanel>
        </Transition>
      </Disclosure>
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
