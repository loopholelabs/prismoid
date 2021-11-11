// Module imports
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'





export default [
	{
		input: './src/index.js',
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
			},
			{
				file: 'dist/index.mjs',
				format: 'es',
				exports: 'named',
			},
		],
		external: [
			'prop-types',
			'react',
			'react-dom',
		],
		plugins: [
			babel({
				exclude: 'node_modules',
				presets: ['@babel/preset-react'],
			}),
			external(),
			commonjs(),
			resolve(),
		],
	}
]
