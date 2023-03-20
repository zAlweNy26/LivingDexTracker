/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,js,ts,vue}'],
	theme: {
		screens: {
			'xs': '475px',
			...defaultTheme.screens,
		},
		linearGradientColors: {
			'amber-orange': ['#FD0D35', '#B00832'],
			'orange-amber': ['#B00832', '#FD0D35'],
			'purple-ube': ['#502488', '#6C38A1'],
			'ube-purple': ['#6C38A1', '#502488'],
		},
		repeatingLinearGradientColors: theme => theme('linearGradientColors'),
		extend: {
			fontSize: {
				"2xs": ['0.675rem', '0.75rem'],
				"3xs": ['0.5rem', '0.5rem']
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'width': 'width',
				'fadetransform': 'opacity, transform',
			},
			maxWidth: {
				'1/2': '50%',
			},
			minWidth: {
				'1/2': '50%',
			},
			rotate: {
				'135': '135deg',
			},
			aspectRatio: {
				'4/3': '4 / 3',
				'phone': '9 / 16',
			},
			borderRadius: {
				'4xl': '2rem',
			},
			translate: {
				'15p': '15%',
				'1/5': '20%',
				'1/10': '10%',
			},
			width: {
				'65p': '65%',
				'90p': '90%',
			},
			height: {
				'65p': '65%',
				'90p': '90%',
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('tailwindcss-gradients'),
		require('tailwind-children'),
		require('daisyui'),
	],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		themes: [
			{
				light: {
					"primary": "#B00832",
					"secondary": "#FD0D35",
					"accent": "#6C38A1",
					"neutral": "#27272A",
					"base-100": "#F4F4F5",
					"info": "#38BDF8",
					"success": "#22C55E",
					"warning": "#EAB308",
					"error": "#EF4444",
				},
			},
			{
				dark: {
					"primary": "#502488",
					"secondary": "#6C38A1",
					"accent": "#FD0D35",
					"neutral": "#F4F4F5",
					"base-100": "#27272A",
					"info": "#38BDF8",
					"success": "#22C55E",
					"warning": "#EAB308",
					"error": "#EF4444",
				},
			},
		],
	},
}

