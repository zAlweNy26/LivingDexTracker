<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
	<div class="flex grow flex-col items-center justify-center gap-8 text-center">
		<div class="flex flex-col items-center gap-4">
			<img alt="Page Not Found Image" class="h-auto w-1/3" src="/luxio.webp">
			<h1 class="text-3xl font-bold">
				A wild Luxio appeared!
			</h1>
		</div>
		<div>
			<p>Sorry about that,</p>
			<p>but you can't add the <span class="font-bold text-error">#404</span> Pokémon to your LivingDex!</p>
		</div>
		<a class="btn btn-primary gap-2 text-lg" href="/">
			<Icon class="h-6 w-6 shrink-0" icon="fluent:home-20-filled" />
			Go back Home
		</a>
	</div>
</template>
