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
			height: {
				screen: 'calc(100vh - 76px)',
				88: '22rem',
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
	plugins: [require('@kamona/tailwindcss-perspective')],
}
