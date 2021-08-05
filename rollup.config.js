import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import vuePlugin from 'rollup-plugin-vue'

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		output: {
			name: 'vueGooglemapsAddressAutocomplete',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
      peerDepsExternal(),
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
      vuePlugin()
		]
	},
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['ms'],
		output: [
			{ name: 'vueGooglemapsAddressAutocomplete', file: pkg.main, format: 'cjs', sourcemap: true },
			{ name: 'vueGooglemapsAddressAutocomplete', file: pkg.module, format: 'es', sourcemap: true },
			{ name: 'vueGooglemapsAddressAutocomplete', file: pkg.unpkg, format: 'iife', sourcemap: true }
		],
		plugins: [
      peerDepsExternal(),
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
      vuePlugin()
		]
	}
];
