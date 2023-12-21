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
				xs: '400px',
				md: '800px',
			},
			width: {
				25: '6.25rem',
				'1/7': '14.286%',
			},
			height: {
				screen: 'calc(100vh - 76px)',
				88: '22rem',
			},
			inset: {
				22: '5.5rem',
			},
			padding: {
				22: '5.5rem',
			},
			colors: {
				amber: {
					300: '#FFD852',
					400: '#FFCD19',
					500: '#FFC300',
				},
				sky: {
					50: '#FAFDFF',
					300: '#85CFFF',
					400: '#52BBFF',
					500: '#3AADF8',
				},
				zinc: {
					700: '#2E2E33',
					800: '#202024',
				},
				primary_yellow: '#FFDE6B',
				secondary_blue: '#40B4FF',
				deep_blue: '#3D4664',
				stock_red: '#EB5554',
				stock_green: '#46B262',
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
	variants: {
		scrollbar: ['rounded'],
	},
}
