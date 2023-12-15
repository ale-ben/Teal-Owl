import { baseConfig } from '@teal-owl/config-prettier/base.mjs';

export default {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
		"prettier-plugin-tailwindcss"
	]
};
