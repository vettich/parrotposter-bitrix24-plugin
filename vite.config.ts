import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	return {
		base: env.BASE_URL,
		define: {
			__API_URL__: JSON.stringify(env.API_URL),
			__WS_URI__: JSON.stringify(env.WS_URI),
		},
		plugins: [svelte(), tsconfigPaths()],
		resolve: {
			alias: {
				'assets/': path.join(__dirname, 'src/assets/'),
			},
		},
		server: {
			port: parseInt(process.env.PORT) || 3000,
			strictPort: true,
		}
	}
})
