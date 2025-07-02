<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const { loggedIn, user } = useAuth()
const settings = useSettingsStore()
const { toggleTheme } = settings
const { isDark } = storeToRefs(settings)

const items = computed<DropdownMenuItem[]>(() => [
  {
    label: t('header.home'),
    to: localePath('index'),
    icon: 'i-tabler-home',
  },
  {
    label: t('header.guide'),
    to: localePath('guide'),
    icon: 'i-tabler-book-2',
  },
  {
    label: 'Pokédex',
    to: localePath('pokedex'),
    icon: 'i-tabler-pokeball',
  },
  {
    label: t('header.boxes'),
    to: localePath('boxes'),
    icon: 'i-tabler-box',
  },
  {
    label: t('header.faqs'),
    to: localePath('faqs'),
    icon: 'i-tabler-question-mark',
  },
  {
    label: t('header.games'),
    icon: 'i-tabler-device-gamepad',
    slot: 'games',
    children: [
      {
        label: otherGames.quest,
        to: localePath('games-quest'),
        class: 'font-semibold',
        avatar: {
          ui: { root: 'rounded-none' },
          src: '/pokemon-quest.webp',
          alt: otherGames.quest,
        },
      },
      {
        label: otherGames['magikarp-jump'],
        to: localePath('games-magikarp-jump'),
        class: 'font-semibold',
        avatar: {
          ui: { root: 'rounded-none' },
          src: '/magikarp-jump.webp',
          alt: otherGames['magikarp-jump'],
        },
      },
      {
        label: otherGames.conquest,
        to: localePath('games-conquest'),
        class: 'font-semibold',
        avatar: {
          ui: { root: 'rounded-none' },
          src: '/pokemon-conquest.webp',
          alt: otherGames.conquest,
        },
      },
    ],
  },
])

const userItems = computed<DropdownMenuItem[]>(() => [
  {
    label: t('account.profile', [user.value?.name || user.value?.email]),
    type: 'label' as const,
  },
  {
    label: t('theme.toggle'),
    icon: isDark.value ? 'i-tabler-sun' : 'i-tabler-moon',
    onSelect: toggleTheme,
  },
  {
    label: t('account.logout'),
    icon: 'i-tabler-logout',
    onSelect: () => console.log('sign out'),
  },
])
</script>

<template>
  <header class="sticky top-0 z-40 flex items-center justify-between bg-[var(--ui-bg-elevated)] p-2 shadow-lg">
    <UDropdownMenu :items :content="{ align: 'start', sideOffset: 16 }">
      <UButton class="sm:hidden" variant="outline" color="neutral" icon="i-tabler-menu-2" />
    </UDropdownMenu>
    <ULink :to="$localePath('index')">
      <UAvatar alt="App Logo" src="/logo.webp" />
    </ULink>
    <div class="hidden h-full items-center gap-4 sm:flex">
      <template v-for="({ label, to, children }) in items" :key="label">
        <UDropdownMenu v-if="children" v-slot="{ open }" :items="children" :content="{ align: 'start', sideOffset: 16 }">
          <ULink class="nav-link inline-flex items-center gap-1.5 relative font-semibold cursor-pointer text-gray-700 transition-all dark:text-gray-100"
                 :active="$route.path.includes('games')" activeClass="nav-link-active">
            <span>{{ label }}</span>
            <UIcon class="transition-transform duration-200" :class="{ 'rotate-180': open }" name="i-tabler-chevron-down" />
          </ULink>
        </UDropdownMenu>
        <ULink v-else class="nav-link relative font-semibold text-gray-700 transition-all dark:text-gray-100"
               :active="to === $route.path" activeClass="nav-link-active" :to>
          {{ label }}
        </ULink>
      </template>
    </div>
    <div class="items-center gap-2 flex">
      <ClientOnly>
        <UDropdownMenu v-if="loggedIn" :items="userItems" :content="{ align: 'end', sideOffset: 16 }">
          <UButton variant="ghost" color="neutral" icon="i-tabler-user-filled" />
        </UDropdownMenu>
        <template v-else>
          <ThemeSwitch />
          <UButton :to="$localePath('auth')" icon="i-tabler-login-2" :label="$t('button.login')" />
        </template>
      </ClientOnly>
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
  transition:
    width 0.25s ease,
    left 0.25s ease;
}

.nav-link.nav-link-active::after {
  width: 100%;
}
</style>
