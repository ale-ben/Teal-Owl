import { defineConfig } from 'vite';
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

import baseConfig from './vite.config';

// https://vitejs.dev/config/
export default defineConfig({
	...baseConfig,
	build: {
		outDir: 'dist/prod'
	},
	plugins: [
		...baseConfig.plugins ?? [],
		crx({ manifest })
	]
});
