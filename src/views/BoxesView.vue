<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const orderOptions = ["National Dex", "Region", "Generation", "Alphabetical"]
const whereAltsOptions = ["After everything", "End of Generation", "End of Region", "Near the Original", "Hidden"]
const altsOptions = [ "Regional", "Generic", "Event", "Unown", "Vivillon", "Alcremie", "Gender" ]
const selectWhereAlts = ref(whereAltsOptions[0])
const selectAlts = ref([...altsOptions])
const selectOrder = ref(orderOptions[0])

watch(selectAlts, (arr, prev) => {
  if (arr.length == 0) selectAlts.value.push(...prev)
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
            <ListboxOptions class="absolute w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
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
            <ListboxOptions class="absolute w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
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
            <ListboxOptions class="absolute w-full mt-2 overflow-hidden text-sm rounded-lg shadow-lg cursor-pointer min-w-max top-full bg-base-200">
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
      Ciao
    </div>
  </div>
</template>
