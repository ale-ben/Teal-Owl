import { defineConfig } from 'vite';
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

import baseConfig from './vite.config';

// Update manifest.json to use the dev version of the extension
manifest.name = `${manifest.name} (dev)`;

// https://vitejs.dev/config/
export default defineConfig({
	...baseConfig,
	build: {
		outDir: 'dist/dev'
	},
	plugins: [
		...baseConfig.plugins ?? [],
		crx({ manifest })
	]
});
