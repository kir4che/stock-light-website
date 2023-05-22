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
	theme: {
		extend: {
			colors: {
				primary_yellow: '#FFDC62',
				secondary_blue: '#4FBAFF',
				stock_red: '#EE3234',
				stock_green: '#05AA02',
				text_black: '#252525',
			},
		},
	},
	plugins: [],
}
