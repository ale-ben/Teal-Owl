/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push('pino-pretty', 'lokijs', 'encoding');
		return config;
	},
	transpilePackages: ['@teal-owl/types', '@teal-owl/ipfs-utils', "@teal-owl/contract-utils"],
};

module.exports = nextConfig;