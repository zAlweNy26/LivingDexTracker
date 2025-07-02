<script lang="ts" setup>
import type { MagikarpJump } from '#shared/utils/interfaces'
import { MagikarpCard } from '#components'

const { data: pokJson } = useLazyFetch('/api/games/magikarp-jump', {
  default: () => [] as MagikarpJump[],
})

const pokPerPattern = computed(() => _GroupBy(pokJson.value, p => p.type))
const totPatterns = Object.keys(pokPerPattern).length

const modal = useOverlay().create(MagikarpCard)
</script>

<template>
  <section class="flex w-full grow flex-col gap-4">
    <div class="flex flex-col items-center gap-2 font-medium">
      <div class="flex items-center gap-2">
        <span>{{ $t('total.patterns', [totPatterns]) }}</span>
        <UIcon name="i-tabler-palette" class="size-6" />
      </div>
      <div class="flex items-center gap-2">
        <span>{{ $t('total.magikarp', [pokJson.length]) }}</span>
        <UIcon name="i-tabler-fish" class="size-6" />
      </div>
    </div>
    <div class="flex flex-wrap justify-center gap-4 md:gap-8">
      <div v-for="(pattern, i) in pokPerPattern" :key="`pattern_${i}`">
        <p class="text-lg font-semibold">
          {{ i }}
        </p>
        <div class="flex flex-wrap justify-center items-center gap-2 p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
          <div v-for="pok in pattern" :key="pok.index"
               class="flex cursor-pointer flex-col items-center p-1 transition-colors rounded-md hover:bg-[var(--ui-bg-accented)] justify-center"
               @click="modal.open(pok)">
            <img loading="lazy" class="mb-1 size-12 md:size-16 magikarp-bounce" :style="{ animationDelay: `${Math.random() * 0.5}s` }"
                 :alt="pok.english_name" :src="`/sprites/magikarp_jump/pattern-${pok.index}.webp`">
            <span class="whitespace-pre-wrap text-center text-xs font-medium">{{ pok.english_name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.magikarp-bounce {
  animation: magikarp-bounce 1.5s cubic-bezier(0.28, 0.84, 0.42, 1);
}

@keyframes magikarp-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-50px);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(-7px);
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
