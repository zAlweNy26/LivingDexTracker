<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-8 text-center grow">
		<div class="flex flex-col items-center">
			<img alt="Page Not Found Image" src="/luxio.gif" />
			<h1 class="text-3xl font-bold">A wild Luxio appeared!</h1>
		</div>
		<div>
			<p>Sorry about that,</p>
			<p>but you can't add the <span class="font-bold text-error">#404</span> Pokémon to your LivingDex!</p>
		</div>
		<a class="gap-2 text-lg btn btn-primary" href="/">
			<Icon class="w-6 h-6 shrink-0" icon="fluent:home-20-filled" />
			Go back to Home!
		</a>
	</div>
</template>
