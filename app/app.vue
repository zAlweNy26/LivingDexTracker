<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const { title } = useAppConfig()

useHead({
	titleTemplate: t => t ? `${t} - ${title}` : title,
})

const lang = computed(() => locales[locale.value].code)
const dir = computed(() => locales[locale.value].dir)

const { y: topPosition } = useWindowScroll({ behavior: 'smooth' })

useHead({
	htmlAttrs: {
		lang,
		dir,
	},
})
</script>

<template>
	<NuxtLayout>
		<NuApp :locale="locales[locale]">
			<NavHeader />
			<main class="flex grow flex-col p-2 md:p-4">
				<NuxtPage />
				<NuButton v-if="topPosition > 0" class="fixed z-50 bottom-4 right-4 rounded-full" size="xl"
					square :aria-label="$t('aria.goTop')" @click="topPosition = 0">
					<NuIcon name="i-tabler-arrow-up" class="size-4 md:size-6" />
				</NuButton>
			</main>
			<NavFooter />
		</NuApp>
	</NuxtLayout>
</template>
