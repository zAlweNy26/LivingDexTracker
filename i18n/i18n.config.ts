import deDE from './locales/de-DE.json'
import enGB from './locales/en-GB.json'
import esES from './locales/es-ES.json'
import frFR from './locales/fr-FR.json'
import itIT from './locales/it-IT.json'

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	fallbackLocale: 'en',
	allowComposition: true,
	warnHtmlInMessage: 'off',
	warnHtmlMessage: false,
	datetimeFormats: {
		de: {
			date: {
				year: 'numeric', month: 'short', day: '2-digit',
			},
			time: {
				hour: '2-digit', minute: '2-digit',
			},
			datetime: {
				year: 'numeric', month: 'short', day: '2-digit',
				hour: '2-digit', minute: '2-digit',
			},
		},
		en: {
			date: {
				year: 'numeric', month: 'short', day: '2-digit',
			},
			time: {
				hour: '2-digit', minute: '2-digit',
			},
			datetime: {
				year: 'numeric', month: 'short', day: '2-digit',
				hour: '2-digit', minute: '2-digit',
			},
		},
		es: {
			date: {
				year: 'numeric', month: 'short', day: '2-digit',
			},
			time: {
				hour: '2-digit', minute: '2-digit',
			},
			datetime: {
				year: 'numeric', month: 'short', day: '2-digit',
				hour: '2-digit', minute: '2-digit',
			},
		},
		fr: {
			date: {
				year: 'numeric', month: 'short', day: '2-digit',
			},
			time: {
				hour: '2-digit', minute: '2-digit',
			},
			datetime: {
				year: 'numeric', month: 'short', day: '2-digit',
				hour: '2-digit', minute: '2-digit',
			},
		},
		it: {
			date: {
				year: 'numeric', month: 'short', day: '2-digit',
			},
			time: {
				hour: '2-digit', minute: '2-digit',
			},
			datetime: {
				year: 'numeric', month: 'short', day: '2-digit',
				hour: '2-digit', minute: '2-digit',
			},
		},
	},
	messages: {
		en: enGB,
		it: itIT,
		es: esES,
		fr: frFR,
		de: deDE,
	},
}))
