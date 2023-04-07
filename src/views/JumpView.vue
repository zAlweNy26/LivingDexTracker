<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Modal from '@components/Modal.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ref } from 'vue'
import type { MagikarpJump } from '@/utility'

const pokJson: MagikarpJump[] = await fetch('/magikarp_jump.json').then(d => d.json())
const magikarpTypes = new Set(pokJson.map(p => p.type))

const modalCard = ref<InstanceType<typeof Modal>>()
const selectedPok = ref<MagikarpJump>()

const pokTypes: MagikarpJump[][] = []

magikarpTypes.forEach(t => pokTypes.push(pokJson.filter(p => p.type == t)))

const scrollToTop = () => window.scrollTo({ behavior: 'smooth', left: 0, top: 0 })

const openPokInfo = (ndex: number) => {
    selectedPok.value = pokJson[ndex - 1]
    modalCard.value?.openModal()
}
</script>

<template>
    <div class="flex flex-col items-center justify-center w-full gap-4 grow">
        <p class="flex flex-col items-center gap-2 font-medium">
            <div class="flex items-center gap-2">
                <span>Total Patterns: {{ magikarpTypes.size }}</span>
                <Icon icon="ion:color-palette" class="w-6 h-6" />
            </div>
            <div class="flex items-center gap-2">
                <span>Total Magikarp: {{ pokJson.length }}</span>
                <Icon icon="ion:fish" class="w-6 h-6" />
            </div>
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 grow">
            <div v-for="(type, i) in pokTypes" :key="`type_${i + 1}`"
                class="self-stretch p-2 grow rounded-xl bg-base-300 max-w-fit">
                <p id="game_title" class="text-xl font-bold">{{ Array.from(magikarpTypes)[i] }}</p>
                <div class="flex flex-wrap items-center justify-center gap-4 p-4 select-none text-2xs sm:text-xs">
                    <div v-for="pok in type" :key="pok.index"
                        class="flex flex-col items-center justify-center w-24 h-auto cursor-pointer sm:w-28"
                        @click="openPokInfo(pok.index)">
                        <img loading="lazy" class="w-auto h-16 transition-all"
                            :src="`/sprites/magikarp_jump/Magikarp Pattern-${pok.index}.webp`"/>
                        <span class="font-medium text-center whitespace-pre-wrap">{{ pok.english_name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <button class="sticky z-50 self-end bottom-6 btn-secondary btn-circle btn" aria-label="Go at the top"
            @click="scrollToTop">
            <Icon class="w-6 h-6" icon="ph:arrow-up-bold" />
        </button>
        <Modal ref="modalCard">
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-2 text-xl">
                    <p class="font-bold">{{ selectedPok?.english_name }} Magikarp</p>
                    <button class="btn btn-sm btn-square btn-error" @click="modalCard?.closeModal()">
                        <Icon class="w-6 h-6" icon="eva:close-outline" />
                    </button>
                </div>
                <div class="flex flex-wrap justify-center gap-4">
                    <div class="flex flex-col justify-between gap-1">
                        <div class="flex flex-col items-center justify-center w-24 h-auto gap-1 cursor-pointer sm:w-28">
                            <img loading="lazy" class="w-auto h-16 transition-all magikarp-bounce"
                                :src="`/sprites/magikarp_jump/Magikarp Pattern-${selectedPok?.index}.webp`">
                        </div>
                    </div>
                </div>
                <div class="flex flex-col">
                    <p>
                        <span class="font-semibold text-secondary">Pattern name:</span>
                        {{ selectedPok?.english_name }} 
                        <span class="mx-2 text-xl text-secondary">|</span> 
                        {{ selectedPok?.japanese_name }}
                    </p>
                    <p><span class="font-semibold text-secondary">Pattern type:</span> {{ selectedPok?.type }}</p>
                    <p><span class="font-semibold text-secondary">Rod:</span> {{ selectedPok?.rod }}</p>
                    <p><span class="font-semibold text-secondary">Description:</span> {{ selectedPok?.description }}</p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<style>
#game_title>span {
    text-shadow: 0px 0px 3px #FFF, 0px -0px 3px #FFF, -0px 0px 3px #FFF,
        -0px -0px 3px #FFF, 0px 0px 3px #FFF, 0px 0px 3px #FFF,
        -0px 0px 3px #FFF, 0px -0px 3px #FFF, 0px 0px 3px #FFF;
}

[data-theme="dark"] #game_title>span {
    text-shadow: 0px 0px 3px #000, 0px -0px 3px #000, -0px 0px 3px #000,
        -0px -0px 3px #000, 0px 0px 3px #000, 0px 0px 3px #000,
        -0px 0px 3px #000, 0px -0px 3px #000, 0px 0px 3px #000;
}

.magikarp-bounce {
    animation: magikarp-bounce 1.5s cubic-bezier(0.280, 0.840, 0.420, 1) 0s 1;
}

@keyframes magikarp-bounce {
    0%   { transform: scale(1,1)      translateY(0); }
    10%  { transform: scale(1.1,.9)   translateY(0); }
    30%  { transform: scale(.9,1.1)   translateY(-50px); }
    50%  { transform: scale(1.05,.95) translateY(0); }
    57%  { transform: scale(1,1)      translateY(-7px); }
    64%  { transform: scale(1,1)      translateY(0); }
    100% { transform: scale(1,1)      translateY(0); }
}
</style>