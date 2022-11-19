import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		proxy: {
			'/api': {
				target: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	plugins: [sveltekit()]
};

export default config;
