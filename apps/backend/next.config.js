const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding');
		return config;
	},
	output: 'standalone',
	experimental: {
		// this includes files from the monorepo base two directories up
		outputFileTracingRoot: path.join(__dirname, '../../'),
		turbotrace: {
			logLevel: 'warning'
		}
	}
};

module.exports = nextConfig;