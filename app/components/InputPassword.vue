<script setup lang="ts">
import type { InputEmits, InputProps } from '@nuxt/ui'
import { useForwardPropsEmits } from 'reka-ui'

const props = defineProps<InputProps>()
const emits = defineEmits<InputEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const show = ref(false)
</script>

<template>
  <UInput v-bind="forwarded" :type="show ? 'text' : 'password'">
    <template #trailing>
      <UButton variant="link" color="neutral" :size :icon="show ? 'i-tabler-eye-off' : 'i-tabler-eye'"
               :aria-label="$t('aria.password', Number(show))" :aria-pressed="show" aria-controls="password"
               @click="show = !show" />
    </template>
  </UInput>
</template>
