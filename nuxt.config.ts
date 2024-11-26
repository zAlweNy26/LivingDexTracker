// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	ssr: true,
	experimental: {
		typedPages: true,
	},
	future: {
		compatibilityVersion: 4,
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
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/i18n',
		'@nuxtjs/seo',
		'@nuxt/ui',
		'@nuxt/image',
		'@nuxt/scripts',
		'nuxt-vuefire',
		'nuxt-security',
		'nuxt-lodash',
	],
	vuefire: {
		config: {
			apiKey: '',
			authDomain: '',
			databaseURL: '',
			projectId: '',
			storageBucket: '',
			messagingSenderId: '',
			appId: '',
		},
		auth: {
			enabled: true,
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
		quality: 100,
	},
	seo: {
		redirectToCanonicalSiteUrl: true,
		debug: process.env.NODE_ENV === 'development',
	},
	i18n: {
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
	nitro: {
		routeRules: {
			'/img/**': { headers: { 'cache-control': `public,max-age=${60 * 60 * 24 * 7},s-maxage=${60 * 60 * 24 * 7}` } },
			'/_ipx/**': { headers: { 'cache-control': `public,max-age=${60 * 60 * 24 * 7},s-maxage=${60 * 60 * 24 * 7}` } },
			'/_nuxt/**': { headers: { 'cache-control': `public,max-age=${60 * 60 * 24 * 7},s-maxage=${60 * 60 * 24 * 7}` } },
		},
	},
	routeRules: {
		'/': { prerender: true },
		'/guide': { prerender: true },
		'/faqs': { prerender: true },
		'/boxes': { ssr: false },
		'/auth': { ssr: false },
		'/privacy-policy': { prerender: true },
		'/terms': { prerender: true },
		'/api/**': { cors: true },
	},
})
