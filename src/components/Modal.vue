<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { ref } from 'vue'

const isOpen = ref(false)

const openModal = () => isOpen.value = true

const closeModal = () => isOpen.value = false

defineExpose({
    isOpen,
    openModal,
    closeModal
})
</script>

<template>
	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" class="relative z-10" @close="closeModal">
			<TransitionChild as="template" enter="duration-200 ease-out" enter-from="opacity-0" enter-to="opacity-100"
				leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-base-100/50" />
			</TransitionChild>
			<div class="fixed inset-0 overflow-y-auto selection:bg-secondary-focus">
				<div class="flex items-center justify-center min-h-full p-4 text-center">
					<TransitionChild as="template" enter="duration-200 ease-out" enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95">
						<DialogPanel
							class="w-full max-w-lg p-4 text-left align-middle transition-all shadow-xl rounded-2xl bg-base-300 text-neutral">
							<slot />
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>
