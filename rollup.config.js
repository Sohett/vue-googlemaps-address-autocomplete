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
	}
];
