import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy'
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const extensions = ['.ts', '.js', '.mjs', '.mts'];

const preventTreeShakingPlugin = () => {
	return {
		name: 'no-treeshaking',
		resolveId(id, importer) {
			if (!importer) {
				// let's not theeshake entry points, as we're not exporting anything in Apps Script files
				return { id, moduleSideEffects: 'no-treeshake' };
			}
			return null;
		}
	};
};

export default {
	input: './src/main.ts',
	output: {
		dir: 'build',
		format: 'esm'
	},
	plugins: [
		preventTreeShakingPlugin(),
		nodePolyfills(),
		commonjs(),
		nodeResolve({
			extensions,
			preferBuiltins: false,
			modulePaths: ['node_modules', '../../node_modules']
		}),
		babel({ extensions, babelHelpers: 'runtime', skipPreflightCheck: true }),
		copy({
			targets: [
			  { src: 'src/webpage/', dest: 'build/' },
			]
		  })
	]
};
