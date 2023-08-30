/** @type {import('tailwindcss').Config} */
module.exports = {
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
				screen: 'calc(100vh - 68px - 228px)',
				88: '22rem',
			},
			colors: {
				zinc: {
					800: '#202024',
				},
				primary_yellow: '#FFDC62',
				secondary_blue: '#4FBAFF',
				stock_red: '#EE3234',
				stock_green: '#05AA02',
			},
		},
	},
	plugins: [],
}
