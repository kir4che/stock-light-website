/** @type {import('tailwindcss').Config} */

module.exports = {
	mode: 'jit',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	important: true,
	theme: {
		extend: {
			screens: {
				md: '800px',
			},
			width: {
				25: '6.25rem',
			},
			height: {
				screen: 'calc(100vh - 76px)',
				88: '22rem',
			},
			inset: {
				22: '5.5rem',
			},
			colors: {
				amber: {
					300: '#FFD852',
				},
				sky: {
					300: '#85CFFF',
					400: '#52BBFF',
					500: '#3AADF8',
				},
				zinc: {
					800: '#202024',
				},
				primary_yellow: '#FFDE6B',
				secondary_blue: '#40B4FF',
				stock_red: '#EE3234',
				stock_green: '#05AA02',
			},
		},
	},
	plugins: [
		require('postcss-import'),
		require('tailwindcss/nesting')(require('postcss-nesting')),
		require('autoprefixer'),
		require('tailwindcss'),
		require('@kamona/tailwindcss-perspective'),
	],
}
