<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import Modal from '@components/Modal.vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import pokJson from '@assets/pokemon_all.json'

type Pokemon = typeof pokJson[0]

enum Region {
  Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, RealWorld, Galar, Hisui, Paldea
}

const orderOptions = [ "National Dex", "Release", "Region", "Generation", "Alphabetical" ]
const whereAltsOptions = [ "After everything", "Near the original", "Hidden" ]
const variantsOptions = [ "Regional", "Generic", "Gender", "Cap Pikachu", "Unown", "Vivillon", "Alcremie", "Totem", "Partner LGPE" ]
const transformsOptions = [ "Mega Evolution", "Primal Reversion", "Bond Phenomenon", "Ultra Burst", "Gigantamax", "Eternamax" ]
const selectWhereAlts = ref(whereAltsOptions[2])
const selectVariants = ref<string[]>([])
const selectTransforms = ref<string[]>([])
const selectOrder = ref(orderOptions[0])

const basicFilter = (name: string, formIndex: number) => {
  return !(
    (name == 'Scatterbug' && ![0, 1].includes(formIndex)) || 
    (name == 'Spewpa' && formIndex != 0) || 
    (name == 'Mothim' && formIndex != 0)
  )
}
const onlyRegionals = (form: string) => ["Alolan", "Galarian", "Hisuian", "Paldean"].some(r => form.includes(r))
const onlyTotems = (form: string) => form.includes("Totem")
const onlyMega = (form: string) => form.includes("Mega")
const onlyGiga = (form: string) => form.includes("Gigantamax")
const onlyBonds = (form: string) => form.includes("Battle Bond")
const onlyFemale = (form: string) => form.includes("Female")
const onlyPrimal = (form: string) => form.includes("Primal")
const onlyCaps = (form: string) => form.includes("Cap")
const onlyLGPE = (subGen: string) => subGen.includes("LGPE")
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
    (name == 'Gourgeist' && formIndex != 0)
  )
}

const allPok = (JSON.parse(JSON.stringify(pokJson)) as typeof pokJson).filter(p => basicFilter(p.name, parseInt(p.form_index)))
const catchedPok = ref<boolean[]>(new Array(allPok.length).fill(false))
const boxNames = ref<string[][]>(new Array(Math.ceil(allPok.length / 30)).fill([]))
const selectedPok = ref<typeof allPok[0]>()
const modalCard = ref<InstanceType<typeof Modal>>()

const orderBy = computed(() => {
  let orderedPok = JSON.parse(JSON.stringify(allPok)) as typeof pokJson
  let j = 0

  orderedPok = orderedPok.filter(p => {
    if (selectWhereAlts.value === "Hidden") {
      return !(
        onlyRegionals(p.form ?? "") || onlyTotems(p.form ?? "") || onlyMega(p.form ?? "") ||
        onlyGiga(p.form ?? "") || onlyFemale(p.form ?? "") || onlyPrimal(p.form ?? "") ||
        onlyCaps(p.form ?? "") || onlyLGPE(p.sub_gen) || onlyAlcremie(p.name, p.form_type) ||
        onlyUnown(p.name, parseInt(p.form_index)) || onlyVivillon(p.name, parseInt(p.form_index)) ||
        onlyGeneric(p.name, parseInt(p.form_index)) || onlyBonds(p.form ?? "")
      )
    } else {
      return !(
        (!selectVariants.value.includes("Regional") && onlyRegionals(p.form ?? "")) || 
        (!selectVariants.value.includes("Totem") && onlyTotems(p.form ?? "")) ||
        (!selectTransforms.value.includes("Mega Evolution") && onlyMega(p.form ?? "")) ||
        (!selectTransforms.value.includes("Gigantamax") && onlyGiga(p.form ?? "")) ||
        (!selectTransforms.value.includes("Bond Phenomenon") && onlyBonds(p.form ?? "")) ||
        (!selectVariants.value.includes("Gender") && onlyFemale(p.form ?? "")) ||
        (!selectVariants.value.includes("Cap Pikachu") && onlyCaps(p.form ?? "")) ||
        (!selectVariants.value.includes("Partner LGPE") && onlyLGPE(p.sub_gen)) ||
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

const showLabel = (pok: Pokemon) => { //TODO: typeof brutto da fixare
  const hidden = selectWhereAlts.value === "Hidden"
  const genderIncluded = selectVariants.value.includes("Gender")
  const vivillonIncluded = selectVariants.value.includes("Vivillon")
  const unownIncluded = selectVariants.value.includes("Unown")
  const genericIncluded = selectVariants.value.includes("Generic")
  const ndex = parseInt(pok.ndex, 10)
  
  if (pok.form === 'Male') return genderIncluded && !hidden
  if ([664, 665, 666].includes(ndex)) return vivillonIncluded && !hidden
  if (pok.form === 'F') return unownIncluded && !hidden

  if (!genericIncluded || hidden) {
    const excludedNames = [
      "Castform", "Deoxys", "Burmy", "Wormadam", "Cherrim", "Shellos", "Gastrodon", 
      "Rotom", "Dialga", "Palkia", "Giratina", "Shaymin", "Arceus", "Basculin", "Deerling", 
      "Sawsbuck", "Darmanitan", "Tornadus", "Thundurus", "Landorus", "Keldeo", "Meloetta", "Genesect",
      "Flabébé", "Floette", "Florges", "Furfrou", "Aegislash", "Pumpkaboo", "Gourgeist"
    ]
    return !excludedNames.includes(pok.name)
  }
  
  return true
}
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
      <Listbox multiple v-model="selectVariants" v-if="selectWhereAlts != 'Hidden'">
        <div class="relative flex flex-col border-neutral">
          <ListboxButton class="flex items-center gap-2 px-2 py-1 text-sm rounded-lg shadow-lg cursor-pointer bg-base-200 outline-0 disabled:bg-base-300">
            <p class="font-semibold">Variants shown</p>
            <Icon icon="fluent:chevron-up-down-16-filled" class="w-4 h-4 shrink-0" />
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
        <div class="relative flex flex-col border-neutral">
          <ListboxButton class="flex items-center gap-2 px-2 py-1 text-sm rounded-lg shadow-lg cursor-pointer bg-base-200 outline-0 disabled:bg-base-300">
            <p class="font-semibold">Transformations shown</p>
            <Icon icon="fluent:chevron-up-down-16-filled" class="w-4 h-4 shrink-0" />
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
            <span class="font-semibold">#{{ pok.ndex }}</span>
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
