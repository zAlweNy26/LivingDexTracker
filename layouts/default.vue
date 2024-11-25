<script setup lang="ts">
const head = useLocaleHead({
	dir: true,
	seo: true,
	lang: true,
	key: 'id',
})
</script>

<template>
	<div class="h-dvh flex flex-col">
		<NuxtLoadingIndicator :duration="3000" :throttle="300"
			color="repeating-linear-gradient(to right, rgb(var(--color-primary-400)) 0%,rgb(var(--color-primary-900)) 100%)" />
		<Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
			<Head>
				<template v-for="link in head.link" :key="link.id">
					<Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
				</template>
				<template v-for="meta in head.meta" :key="meta.id">
					<Meta :id="meta.id" :property="meta.property" :content="meta.content" />
				</template>
			</Head>
			<Body class="flex min-h-screen flex-col scroll-smooth antialiased transition-colors">
				<slot />
			</Body>
		</Html>
	</div>
</template>

<style>
.page-enter-active, .layout-enter-active {
    transition: all 0.25s ease-out;
}

.page-leave-active, .layout-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}

.page-enter-from, .page-leave-to, .layout-enter-from, .layout-leave-to {
    transform: translateY(20px);
    opacity: 0;
    filter: blur(0.5rem);
}
</style>
