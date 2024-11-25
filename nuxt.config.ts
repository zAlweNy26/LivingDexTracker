// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	ssr: true,
	experimental: {
		typedPages: true,
		sharedPrerenderData: true,
		cookieStore: true,
	},
	css: ['~/assets/main.css'],
	app: {
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
		layoutTransition: {
			name: 'layout',
			mode: 'out-in',
		},
	},
	modules: [
		'nuxt-vuefire',
		'@nuxt/ui',
		'@nuxtjs/i18n',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxt/image',
		'@nuxt/scripts',
		'nuxt-security',
	],
	vuefire: {
		config: {
			apiKey: "",
			authDomain: "",
			databaseURL: "",
			projectId: "",
			storageBucket: "",
			messagingSenderId: "",
			appId: ""
		},
		auth: {
			enabled: true
		},
		appCheck: {
			debug: process.env.NODE_ENV !== 'production',
			isTokenAutoRefreshEnabled: true,
			provider: 'ReCaptchaV3',
			key: '',
		},
	},
	ui: {
		prefix: 'Nu',
	},
	image: {
		quality: 100
	},
	i18n: {
		restructureDir: false, // TODO: Remove this when updating to Nuxt v4
		experimental: {
			typedOptionsAndMessages: 'all',
			typedPages: true,
		},
		compilation: {
			strictMessage: false,
		},
		locales: [
			{
				code: 'en',
				language: 'en-GB',
				name: 'English',
				domain: '🇬🇧',
				file: 'en-GB.json',
				isCatchallLocale: true,
			},
			{
				code: 'it',
				language: 'it-IT',
				name: 'Italiano',
				file: 'it-IT.json',
				domain: '🇮🇹',
			},
			{
				code: 'es',
				language: 'es-ES',
				name: 'Español',
				file: 'es-ES.json',
				domain: '🇪🇸',
			},
			{
				code: 'fr',
				language: 'fr-FR',
				name: 'Français',
				file: 'fr-FR.json',
				domain: '🇫🇷',
			},
			{
				code: 'de',
				language: 'de-DE',
				name: 'Deutsch',
				file: 'de-DE.json',
				domain: '🇩🇪',
			},
		],
		lazy: true,
		defaultLocale: 'en',
		langDir: './locales',
		strategy: 'no_prefix',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			alwaysRedirect: true,
			redirectOn: 'root',
		},
	},
	routeRules: {
		'/': { isr: true },
		'/boxes': { ssr: false },
		'/auth': { ssr: false },
	}
})