<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { logoutAccount } from '@/firebase'
import { useUserStore } from '@stores/userStore'

const { userInfo } = storeToRefs(useUserStore())

const logOut = async () => {
	userInfo.value = undefined
	await logoutAccount()
}
</script>

<template>
	<div class="navbar sticky top-0 z-50 min-h-fit bg-base-200">
		<div class="navbar-start">
			<Menu v-slot="{ open }" as="div" class="relative inline-block rounded-lg font-medium md:hidden">
				<MenuButton class="btn btn-square btn-ghost btn-sm" title="Menu">
					<Icon v-if="!open" icon="eva:menu-outline" class="h-6 w-6" aria-hidden="true" />
					<Icon v-else icon="eva:close-outline" class="h-6 w-6" aria-hidden="true" />
				</MenuButton>
				<Transition enter-active-class="transition duration-200 ease-out"
					enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-200 ease-in"
					leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-90 opacity-0">
					<MenuItems as="ul"
						class="menu menu-md absolute left-0 z-50 mt-4 w-min origin-top-left gap-2 whitespace-nowrap rounded-xl bg-base-200 shadow-xl">
						<MenuItem as="li">
							<RouterLink to="/guide">
								<Icon icon="ph:scroll-fill" class="h-5 w-5" aria-hidden="true" />
								Guide
							</RouterLink>
						</MenuItem>
						<MenuItem as="li">
							<RouterLink to="/pokedex">
								<Icon icon="ic:baseline-catching-pokemon" class="h-5 w-5" aria-hidden="true" />
								Pokédex
							</RouterLink>
						</MenuItem>
						<MenuItem as="li">
							<RouterLink to="/boxes">
								<Icon icon="ph:cube" class="h-5 w-5" aria-hidden="true" />
								Box Layout
							</RouterLink>
						</MenuItem>
						<MenuItem as="li">
							<RouterLink to="/faqs">
								<Icon icon="ph:question-fill" class="h-5 w-5" aria-hidden="true" />
								FAQ
							</RouterLink>
						</MenuItem>
						<Menu v-slot="{ subOpen }" as="li" class="relative inline-block rounded-lg">
							<MenuButton class="flex items-center gap-2 rounded-lg">
								<span>Other Games</span>
								<Icon v-if="!subOpen" icon="eva:arrow-ios-forward-fill" class="h-4 w-4 shrink-0"
									aria-hidden="true" />
								<Icon v-else icon="eva:arrow-ios-back-fill" class="h-4 w-4 shrink-0"
									aria-hidden="true" />
							</MenuButton>
							<Transition enter-active-class="transition duration-200 ease-out"
								enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
								leave-active-class="transition duration-200 ease-in"
								leave-from-class="transform scale-100 opacity-100"
								leave-to-class="transform scale-90 opacity-0">
								<MenuItems as="ul"
									class="menu-compact menu rounded-box menu-horizontal absolute left-full top-0 z-50 ml-4 flex w-min origin-left flex-col gap-2 bg-base-200 p-2 shadow-lg">
									<MenuItem as="li">
										<RouterLink to="/games/pokemon_quest" class="flex items-center justify-center gap-2">
											<img src="/pokemon_quest.webp" class="h-5 w-5">
											Pokémon Quest
										</RouterLink>
									</MenuItem>
									<MenuItem as="li">
										<RouterLink to="/games/magikarp_jump" class="flex items-center justify-center gap-2">
											<img src="/magikarp_jump.webp" class="h-5 w-5">
											Magikarp Jump
										</RouterLink>
									</MenuItem>
									<MenuItem as="li">
										<RouterLink to="/games/pokemon_conquest" class="flex items-center justify-center gap-2">
											<img src="/pokemon_conquest.webp" class="h-5 w-5">
											Pokémon Conquest
										</RouterLink>
									</MenuItem>
								</MenuItems>
							</Transition>
						</Menu>
					</MenuItems>
				</Transition>
			</Menu>
			<RouterLink to="/" class="hidden shrink-0 md:block" title="Home">
				<img class="h-10 w-10" src="/favicon.ico" alt="Logo">
			</RouterLink>
		</div>
		<div class="navbar-center gap-2">
			<RouterLink to="/" class="shrink-0 md:hidden" title="Home">
				<img class="h-10 w-10" src="/favicon.ico" alt="Logo">
			</RouterLink>
			<ul class="menu-compact menu menu-horizontal hidden gap-2 font-medium md:flex">
				<li>
					<RouterLink to="/" class="rounded-lg">
						Home
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/guide" class="rounded-lg">
						Guide
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/pokedex" class="rounded-lg">
						Pokédex
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/boxes" class="rounded-lg">
						Box Layout
					</RouterLink>
				</li>
				<li>
					<RouterLink to="/faqs" class="rounded-lg">
						FAQ
					</RouterLink>
				</li>
				<Menu v-slot="{ open }" as="li" class="relative inline-block rounded-lg">
					<MenuButton class="flex items-center gap-2 rounded-lg">
						<span>Other Games</span>
						<Icon v-if="!open" icon="eva:arrow-ios-downward-fill" class="h-4 w-4 shrink-0"
							aria-hidden="true" />
						<Icon v-else icon="eva:arrow-ios-upward-fill" class="h-4 w-4 shrink-0"
							aria-hidden="true" />
					</MenuButton>
					<Transition enter-active-class="transition duration-200 ease-out"
						enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
						leave-active-class="transition duration-200 ease-in"
						leave-from-class="transform scale-100 opacity-100"
						leave-to-class="transform scale-90 opacity-0">
						<MenuItems as="ul"
							class="menu-compact menu rounded-box absolute left-0 z-50 mt-6 flex w-min origin-top-left flex-col gap-2 bg-base-200 p-2 shadow-lg">
							<MenuItem as="li">
								<RouterLink to="/games/pokemon_quest" class="flex items-center justify-center gap-2">
									<img src="/pokemon_quest.webp" class="h-5 w-5">
									Pokémon Quest
								</RouterLink>
							</MenuItem>
							<MenuItem as="li">
								<RouterLink to="/games/magikarp_jump" class="flex items-center justify-center gap-2">
									<img src="/magikarp_jump.webp" class="h-5 w-5">
									Magikarp Jump
								</RouterLink>
							</MenuItem>
							<MenuItem as="li">
								<RouterLink to="/games/pokemon_conquest" class="flex items-center justify-center gap-2">
									<img src="/pokemon_conquest.webp" class="h-5 w-5">
									Pokémon Conquest
								</RouterLink>
							</MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
			</ul>
			<a v-if="!userInfo" class="btn btn-square btn-outline btn-sm hidden gap-2 !border-[#7289da] text-[#7289da] hover:bg-[#7289da] sm:!w-auto sm:!px-3 md:inline-flex" 
				target="_blank" href="https://discord.gg" aria-label="Dona con PayPal">
				<Icon icon="logos:discord-icon" class="h-5 w-5 text-[#7289da]" aria-hidden="true" />
				<span class="hidden lg:inline-block">Discord</span>
			</a>
			<a v-if="!userInfo" class="btn btn-square btn-outline btn-sm hidden gap-2 !border-[#0093d5] text-[#0093d5] hover:bg-[#0093d5] sm:!w-auto sm:!px-3 md:inline-flex" 
				target="_blank" href="https://paypal.me/danyalwe" aria-label="Dona con PayPal">
				<Icon icon="logos:paypal" class="h-5 w-5" aria-hidden="true" />
				<span class="hidden lg:inline-block">PayPal</span>
			</a>
		</div>
		<div class="navbar-end gap-2">
			<ThemeButton class="block" />
			<Menu v-if="userInfo" as="div" class="relative inline-block rounded-lg font-medium">
				<MenuButton class="btn btn-square btn-ghost btn-sm" :title="userInfo.name">
					<Icon icon="mingcute:user-3-fill" class="h-6 w-6" aria-hidden="true" />
				</MenuButton>
				<Transition enter-active-class="transition duration-200 ease-out"
					enter-from-class="transform scale-90 opacity-0" enter-to-class="transform scale-100 opacity-100"
					leave-active-class="transition duration-200 ease-in"
					leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-90 opacity-0">
					<MenuItems as="ul"
						class="menu-compact menu rounded-box absolute right-0 z-50 mt-4 flex w-min origin-top-right flex-col items-end gap-2 bg-base-200 p-2 shadow-lg">
						<MenuItem as="li">
							<RouterLink to="/settings">
								Settings
								<Icon icon="ph:gear-six-fill" class="h-5 w-5" aria-hidden="true" />
							</RouterLink>
						</MenuItem>
						<MenuItem as="li">
							<a href="https://discord.gg">
								Discord
								<Icon icon="ic:round-discord" class="h-5 w-5" aria-hidden="true" />
							</a>
						</MenuItem>
						<MenuItem as="li">
							<a href="https://paypal.me/danyalwe">
								Donate
								<Icon icon="ic:round-paypal" class="h-5 w-5" aria-hidden="true" />
							</a>
						</MenuItem>
						<MenuItem as="li">
							<RouterLink to="/auth" @click="logOut">
								Log out
								<Icon icon="eva:log-out-fill" class="h-5 w-5" aria-hidden="true" />
							</RouterLink>
						</MenuItem>
					</MenuItems>
				</Transition>
			</Menu>
			<RouterLink v-else class="btn btn-square btn-primary btn-sm" to="/auth" rel="prefetch">
				<Icon icon="eva:log-in-fill" class="h-6 w-6" aria-hidden="true" />
			</RouterLink>
		</div>
	</div>
</template>