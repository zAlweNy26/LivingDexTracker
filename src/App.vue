<script setup lang="ts">
</script>

<template>
	<div class="flex min-h-screen flex-col scroll-smooth text-sm text-neutral transition-colors selection:bg-primary md:text-base">
		<Header />
		<main class="flex grow flex-col items-center p-4 text-neutral">
			<RouterView v-slot="{ Component }">
				<template v-if="Component">
					<Transition mode="out-in"
						enterActiveClass="animate__animated animate__fadeIn animate__fastest"
						leaveActiveClass="animate__animated animate__fadeOut animate__fastest">
						<KeepAlive>
							<Suspense>
								<component :is="Component" />
								<template #fallback>
									<div class="flex flex-col items-center justify-center gap-2">
										<span class="loading loading-spinner loading-lg text-primary" />
										<span class="text-lg font-medium text-neutral">Loading...</span>
									</div>
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
