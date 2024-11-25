<script lang="ts" setup>
import type { DropdownMenuItem } from '#ui/types'

const { t } = useI18n()
const localePath = useLocalePath()
const user = useCurrentUser()
const settings = useSettingsStore()
const { toggleTheme } = settings
const { isDark } = storeToRefs(settings)

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: t('header.home'),
    to: localePath('index'),
    icon: 'i-tabler-home'
  },
  {
    label: t('header.guide'),
    to: localePath('guide'),
    icon: 'i-tabler-book-2'
  },
  {
    label: 'Pokédex',
    to: localePath('pokedex'),
    icon: 'i-tabler-pokeball'
  },
  {
    label: t('header.boxes'),
    to: localePath('boxes'),
    icon: 'i-tabler-box'
  },
  {
    label: t('header.faqs'),
    to: localePath('faqs'),
    icon: 'i-tabler-question-mark'
  }
])

const userItems = computed<DropdownMenuItem[]>(() => [
  {
    label: t('account.profile', [user.value?.displayName || user.value?.email]),
		disabled: true,
  },
  {
    label: t('theme.toggle'),
		icon: isDark.value ? 'i-tabler-sun' : 'i-tabler-moon',
		onSelect: toggleTheme
  },
  {
    label: t('account.logout'),
    icon: 'i-tabler-logout',
    onSelect: () => console.log('sign out')
  }
])
</script>

<template>
  <header class="sticky top-0 z-40 flex items-center justify-between bg-[var(--ui-bg-elevated)] p-2 shadow-lg">
    <NuDropdownMenu :items :content="{ align: 'start', sideOffset: 16 }">
      <NuButton class="sm:hidden" variant="outline" color="neutral" icon="i-tabler-menu-2" />
    </NuDropdownMenu>
    <NuLink :to="$localePath('index')">
      <NuAvatar alt="App Logo" src="/logo.webp" />
    </NuLink>
    <div class="hidden h-full items-center gap-4 sm:flex">
      <NuLink v-for="({ label, to, slot }) in items" :key="label"
        class="nav-link relative font-title font-semibold text-gray-700 transition-all dark:text-gray-100"
        :active="to === $route.path" activeClass="nav-link-active" :to>
        {{ label }}
      </NuLink>
    </div>
    <div class="items-center gap-2 flex">
      <NuDropdownMenu v-if="user" :items="userItems" :content="{ align: 'end', sideOffset: 16 }">
        <NuButton variant="ghost" color="neutral" icon="i-tabler-user-filled" />
      </NuDropdownMenu>
      <NuButton v-else :to="$localePath('auth')" :label="$t('button.login')" />
      <ThemeSwitch />
      <LanguageSwitch />
    </div>
  </header>
</template>

<style>
.nav-link::after {
	content: '';
	position: absolute;
	bottom: -12px;
	left: 0;
	width: 0;
	height: 2px;
	background: var(--ui-primary);
	transition: width 0.25s ease, left 0.25s ease;
}

.nav-link.nav-link-active::after {
	width: 100%;
}
</style>