<template>
	<div class="sticky top-0 z-50 navbar bg-base-200 min-h-fit">
		<div class="navbar-start">
			<Menu v-slot="{ open }" as="div" class="relative inline-block font-medium rounded-lg md:hidden">
				<MenuButton class="btn btn-ghost btn-square btn-sm" title="Menu">
					<Icon v-if="!open" icon="eva:menu-outline" class="w-6 h-6" aria-hidden="true" />
					<Icon v-else icon="eva:close-outline" class="w-6 h-6" aria-hidden="true" />
				</MenuButton>
				<Transition enter-active-class="transition duration-200 ease-out"
					enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-200 ease-in"
					leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-90 opacity-0">
					<MenuItems as="ul"
						class="absolute left-0 z-50 flex flex-col gap-2 p-2 mt-4 origin-top-left shadow-lg whitespace-nowrap w-min menu menu-compact rounded-box bg-base-200">
						<MenuItem as="li">
							<a href="/guide">
								<Icon icon="ph:scroll-fill" class="w-5 h-5" aria-hidden="true" />
								Guide
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="/pokedex">
								<Icon icon="ic:baseline-catching-pokemon" class="w-5 h-5" aria-hidden="true" />
								Pokédex
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="/boxes">
								<Icon icon="ph:cube" class="w-5 h-5" aria-hidden="true" />
								Box Layout
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="/faqs">
								<Icon icon="ph:question-fill" class="w-5 h-5" aria-hidden="true" />
								FAQ
							</a>
						</MenuItem>
						<Menu v-slot="{ open }" as="li" class="relative inline-block rounded-lg">
							<MenuButton class="flex items-center gap-2 rounded-lg">
								<span>Other Games</span>
								<Icon v-if="!open" icon="eva:arrow-ios-forward-fill" class="w-4 h-4 shrink-0"
									aria-hidden="true" />
								<Icon v-else icon="eva:arrow-ios-back-fill" class="w-4 h-4 shrink-0"
									aria-hidden="true" />
							</MenuButton>
							<Transition enter-active-class="transition duration-200 ease-out"
								enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
								leave-active-class="transition duration-200 ease-in"
								leave-from-class="transform scale-100 opacity-100"
								leave-to-class="transform scale-90 opacity-0">
								<MenuItems as="ul"
									class="absolute top-0 z-50 flex flex-col gap-2 p-2 ml-4 origin-left shadow-lg left-full w-min menu menu-horizontal menu-compact rounded-box bg-base-200">
									<MenuItem>
										<li>
											<a href="/games/pokemon_quest" class="flex items-center justify-center gap-2">
												<img src="/pokemon_quest.webp" class="w-5 h-5" />
												Pokémon Quest
											</a>
										</li>
									</MenuItem>
									<MenuItem>
										<li>
											<a href="/games/magikarp_jump" class="flex items-center justify-center gap-2">
												<img src="/magikarp_jump.webp" class="w-5 h-5" />
												Magikarp Jump
											</a>
										</li>
									</MenuItem>
								</MenuItems>
							</Transition>
						</Menu>
					</MenuItems>
				</Transition>
			</Menu>
			<a href="/" class="hidden shrink-0 md:block" title="Home">
				<img class="w-6 h-6" src="/favicon.ico" alt="Logo">
			</a>
		</div>
		<div class="gap-2 navbar-center">
			<a href="/" class="shrink-0 md:hidden" title="Home">
				<img class="w-6 h-6" src="/favicon.ico" alt="Logo">
			</a>
			<ul class="hidden gap-2 font-medium menu menu-compact menu-horizontal md:flex">
				<li>
					<a href="/" class="rounded-lg">Home</a>
				</li>
				<li>
					<a href="/guide" class="rounded-lg">Guide</a>
				</li>
				<li>
					<a href="/pokedex" class="rounded-lg">Pokédex</a>
				</li>
				<li>
					<a href="/boxes" class="rounded-lg">Box Layout</a>
				</li>
				<li>
					<a href="/faqs" class="rounded-lg">FAQ</a>
				</li>
				<Menu v-slot="{ open }" as="li" class="relative inline-block rounded-lg">
					<MenuButton class="flex items-center gap-2 rounded-lg">
						<span>Other Games</span>
						<Icon v-if="!open" icon="eva:arrow-ios-downward-fill" class="w-4 h-4 shrink-0"
							aria-hidden="true" />
						<Icon v-else icon="eva:arrow-ios-upward-fill" class="w-4 h-4 shrink-0"
							aria-hidden="true" />
					</MenuButton>
					<Transition enter-active-class="transition duration-200 ease-out"
						enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
						leave-active-class="transition duration-200 ease-in"
						leave-from-class="transform scale-100 opacity-100"
						leave-to-class="transform scale-90 opacity-0">
						<MenuItems as="ul"
							class="absolute left-0 z-50 flex flex-col gap-2 p-2 mt-4 origin-top-left shadow-lg w-min menu menu-compact rounded-box bg-base-200">
							<MenuItem>
								<li>
									<a href="/games/pokemon_quest" class="flex items-center justify-center gap-2">
										<img src="/pokemon_quest.webp" class="w-5 h-5" />
										Pokémon Quest
									</a>
								</li>
							</MenuItem>
							<MenuItem>
								<li>
									<a href="/games/magikarp_jump" class="flex items-center justify-center gap-2">
										<img src="/magikarp_jump.webp" class="w-5 h-5" />
										Magikarp Jump
									</a>
								</li>
							</MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
			</ul>
			<a v-if="!userInfo" class="hidden md:inline-flex btn btn-sm btn-square hover:bg-[#7289da] !border-[#7289da] text-[#7289da] btn-outline gap-2 sm:!w-auto sm:!px-3" 
				target="_blank" href="https://discord.gg" aria-label="Dona con PayPal">
				<Icon icon="logos:discord-icon" class="w-5 h-5 text-[#7289da]" aria-hidden="true" />
				<span class="hidden lg:inline-block">Discord</span>
			</a>
			<a v-if="!userInfo" class="hidden md:inline-flex btn btn-sm btn-square hover:bg-[#0093d5] !border-[#0093d5] text-[#0093d5] btn-outline gap-2 sm:!w-auto sm:!px-3" 
				target="_blank" href="https://paypal.me/danyalwe" aria-label="Dona con PayPal">
				<Icon icon="logos:paypal" class="w-5 h-5" aria-hidden="true" />
				<span class="hidden lg:inline-block">PayPal</span>
			</a>
		</div>
		<div class="gap-2 navbar-end">
			<ThemeButton class="block" />
			<Menu v-if="userInfo" as="div" class="relative inline-block font-medium rounded-lg">
				<MenuButton class="btn btn-ghost btn-square btn-sm" :title="userInfo.name">
					<Icon icon="mingcute:user-3-fill" class="w-6 h-6" aria-hidden="true" />
				</MenuButton>
				<Transition enter-active-class="transition duration-200 ease-out"
					enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-200 ease-in"
					leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-90 opacity-0">
					<MenuItems as="ul"
						class="absolute right-0 z-50 flex flex-col items-end gap-2 p-2 mt-4 origin-top-right shadow-lg w-min menu menu-compact rounded-box bg-base-200">
						<MenuItem as="li">
							<a href="/settings">
								Settings
								<Icon icon="ph:gear-six-fill" class="w-5 h-5" aria-hidden="true" />
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="https://discord.gg">
								Discord
								<Icon icon="ic:round-discord" class="w-5 h-5" aria-hidden="true" />
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="https://paypal.me/danyalwe">
								Donate
								<Icon icon="ic:round-paypal" class="w-5 h-5" aria-hidden="true" />
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="/auth" @click="logOut">
								Log out
								<Icon icon="eva:log-out-fill" class="w-5 h-5" aria-hidden="true" />
							</a>
						</MenuItem>
					</MenuItems>
				</Transition>
			</Menu>
			<a v-else class="btn btn-sm btn-primary btn-square" href="/auth" rel="prefetch">
				<Icon icon="eva:log-in-fill" class="w-6 h-6" aria-hidden="true" />
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import ThemeButton from '@components/ThemeButton.vue'
import { logoutAccount } from '@/firebase'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@stores/userStore'

const { userInfo } = storeToRefs(useUserStore())

const logOut = async () => {
	userInfo.value = undefined
	await logoutAccount()
}
</script>