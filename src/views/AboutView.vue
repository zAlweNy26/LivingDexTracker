<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Member {
	name: string
	avatar?: string
	description: string
	links: {
		icon: string
		url: string
	}[]
}

const devTeam: Member[] = [
	{
		name: 'Daniele Nicosia',
		avatar: "/dany.png",
		description: 'Project Manager\nFull-Stack Developer',
		links: [
			{
				icon: 'mdi:web',
				url: 'https://zalweny26.github.io'
			},
			{
				icon: 'bxl:linkedin',
				url: 'https://www.linkedin.com/in/daniele-nicosia'
			},
			{
				icon: 'bxl:github',
				url: 'https://github.com/zAlweNy26'
			}
		]
	},
	{
		name: 'Federico Agnello',
		avatar: "/fede.jpg",
		description: 'Ideator\nDesigner',
		links: [
			{
				icon: 'bxl:instagram',
				url: 'https://www.instagram.com/fededc512/'
			},
			{
				icon: 'bxl:github',
				url: 'https://github.com/FedeDC512'
			},
		]
	}
]
</script>

<template>
	<div class="flex w-full grow flex-col gap-8">
		<div class="flex flex-col text-center">
			<h1 class="mb-4 text-center text-4xl font-bold text-primary">
				Development team
			</h1>
			<p class="mx-auto w-2/3 leading-relaxed">
				Those behind this work, rest assured, have put their heart and soul into completing it and making it available to all.
			</p>
		</div>
		<div class="flex flex-wrap justify-evenly gap-4">
			<div v-for="dev in devTeam" :key="dev.name" class="flex h-full flex-col items-center text-center">
				<img :src="dev.avatar" class="mb-4 h-32 w-32 shrink-0 rounded-2xl" :alt="dev.name">
				<div class="w-full">
					<h2 class="text-lg font-semibold">
						{{ dev.name }}
					</h2>
					<h3 class="mb-3 whitespace-pre-wrap text-sm">
						{{ dev.description }}
					</h3>
					<span class="inline-flex gap-2">
						<a v-for="(link, index) in dev.links" :key="index" :href="link.url">
							<Icon class="h-6 w-6" :icon="link.icon" />
						</a>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
