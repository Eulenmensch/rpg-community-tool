/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#276a78',
					50: '#f4f8f8',
					100: '#e9f0f2',
					200: '#c9dadd',
					300: '#a9c3c9',
					400: '#6897a1',
					500: '#276a78',
					600: '#235f6c',
					700: '#1d505a',
					800: '#174048',
					900: '#13343b'
				}
			}
		}
	},
	plugins: []
};
