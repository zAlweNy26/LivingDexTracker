<script setup lang="ts">
interface Package {
	name: string
	icon: string
	url: string
	color: string
}

const packages: Package[] = [
	{
		name: "Tailwind",
		icon: "https://tailwindcss.com/favicons/favicon-32x32.png?v=3",
		url: "https://tailwindcss.com/",
		color: "#38BDF8"
	},
	{
		name: "DaisyUI",
		icon: "https://daisyui.com/favicon.ico",
		url: "https://daisyui.com/",
		color: "#F2DB43"
	},
	{
		name: "UnDraw",
		icon: "https://undraw.co/favicon-32x32.png",
		url: "https://undraw.co/",
		color: "#544AF4"
	},
	{
		name: "Iconify",
		icon: "https://avatars.githubusercontent.com/u/50354982?s=200&v=4",
		url: "https://iconify.design/",
		color: "#1769AA"
	},
	{
		name: "Vue",
		icon: "https://vuejs.org/logo.svg",
		url: "https://vuejs.org/",
		color: "#42D392"
	},
	{
		name: "Firebase",
		icon: "https://www.gstatic.com/devrel-devsite/prod/vc7c98be6f4d139e237c3cdaad6a00bb295b070a83e505cb2fa4435daae3d0901/firebase/images/favicon.png",
		url: "https://firebase.google.com/",
		color: "#FFCC30"
	},
	{
		name: "Headless UI",
		icon: "https://headlessui.com/favicon-32x32.png",
		url: "https://headlessui.com/",
		color: "#6BA1FC"
	},
	{
		name: "ESLint",
		icon: "https://eslint.org/favicon.ico",
		url: "https://eslint.org",
		color: "#4B32C3"
	},
	{
		name: "Vitest",
		icon: "https://vitest.dev/favicon.ico",
		url: "https://vitest.dev",
		color: "#94c56a"
	},
	{
		name: "TypeScript",
		icon: "https://www.typescriptlang.org/favicon-32x32.png",
		url: "https://www.typescriptlang.org",
		color: "#3178C6"
	},
	{
		name: "Vite",
		icon: "https://vitejs.dev/logo.svg",
		url: "https://vitejs.dev",
		color: "#8779FE"
	},
	{
		name: "PlayWright",
		icon: "https://playwright.dev/img/playwright-logo.svg",
		url: "https://playwright.dev",
		color: "#1D8D22"
	},
	{
		name: "Pinia",
		icon: "https://pinia.vuejs.org/logo.svg",
		url: "https://pinia.vuejs.org/",
		color: "#FFD859"
	}
]
</script>

<template>
	<div class="flex grow flex-col items-center justify-center gap-8">
		<div class="flex flex-col items-center justify-center">
			<h2 class="mb-4 text-center text-4xl font-bold text-primary">
				Attributions
			</h2>
			<p class="text-center">
				This website was developed thanks to this projects!
			</p>
		</div>
		<div class="flex flex-wrap items-center justify-center gap-8">
			<a v-for="pack in packages" :key="pack.name"
				class="btn btn-ghost h-fit gap-4 border-2 bg-transparent py-2 normal-case text-neutral md:text-lg"
				:href="pack.url" :style="`border-color: ${pack.color}`">
				<img :alt="pack.name" class="h-6 w-6 rounded-sm" :src="pack.icon">
				{{ pack.name }}
			</a>
		</div>
	</div>
</template>
