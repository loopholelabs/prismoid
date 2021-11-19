// Module imports
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import fs from 'fs'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'





// Constants
const plugins = [
	babel({ exclude: 'node_modules' }),
	external(),
	commonjs(),
	resolve(),
]





function getGrammarFiles() {
	const grammarsPath = path.join('.', 'src', 'grammars')
	const grammarFiles = fs.readdirSync(grammarsPath)
	return grammarFiles.reduce((accumulator, filename) => {
		accumulator[path.join('grammars', filename.replace(/\.mjs$/, ''))] = path.join(grammarsPath, filename)
		return accumulator
	}, {})
}

export default [
	{
		input: {
			'index': path.join('.', 'src', 'index.mjs'),
			...getGrammarFiles(),
		},
		output: [
			{
				dir: 'dist',
				entryFileNames: '[name].js',
				format: 'cjs',
			},
		],
		plugins,
	},
]
