<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@components/Header.vue'
import Footer from '@components/Footer.vue'
</script>

<template>
	<div class="flex min-h-screen flex-col scroll-smooth bg-base-100 transition-colors selection:bg-secondary-focus">
		<Header />
		<main class="flex grow flex-col items-center p-4 text-neutral">
			<RouterView v-slot="{ Component }">
				<template v-if="Component">
					<Transition mode="out-in">
						<KeepAlive>
							<Suspense>
								<component :is="Component" />
								<template #fallback>
									Loading...
								</template>
							</Suspense>
						</KeepAlive>
					</Transition>
				</template>
			</RouterView>
		</main>
		<Footer />
	</div>
</template>
