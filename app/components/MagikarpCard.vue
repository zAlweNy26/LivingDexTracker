<script lang="ts" setup>
import type { MagikarpJump } from '#imports'

defineProps<MagikarpJump>()
</script>

<template>
  <LazyUModal>
    <template #title>
      <div class="flex items-center gap-2 mb-2">
        <img loading="lazy" class="size-32 magikarp-bounce"
             :alt="english_name" :src="`/sprites/magikarp_jump/pattern-${index}.webp`">
        <div class="space-y-1">
          <UBadge color="neutral" :label="type" />
          <p class="text-lg">
            {{ english_name }}
          </p>
          <div class="space-x-2">
            <UBadge color="neutral" variant="subtle" :label="rod" />
          </div>
        </div>
      </div>
    </template>
    <template #description>
      {{ description }}
    </template>
  </LazyUModal>
</template>
