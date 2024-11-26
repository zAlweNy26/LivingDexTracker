<script lang="ts" setup>
import type { MagikarpJump } from '#imports'

defineProps<MagikarpJump>()
</script>

<template>
	<LazyNuModal>
		<template #title>
			<div class="flex items-center gap-2 mb-2">
				<img loading="lazy" class="size-32 magikarp-bounce"
					:alt="english_name" :src="`/sprites/magikarp_jump/pattern-${index}.webp`">
				<div class="space-y-1">
					<NuBadge color="neutral" :label="type" />
					<p class="text-lg">
						{{ english_name }}
					</p>
					<div class="space-x-2">
						<NuBadge color="neutral" variant="subtle" :label="rod" />
					</div>
				</div>
			</div>
		</template>
		<template #description>
			{{ description }}
		</template>
	</LazyNuModal>
</template>
