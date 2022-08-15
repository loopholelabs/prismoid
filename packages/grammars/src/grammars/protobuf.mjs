/**
 * Copied from Prism.js
 * https://github.com/PrismJS/prism/blob/master/components/prism-protobuf.js
 */





// Local imports
import { Grammar } from '../structures/Grammar.mjs'





// Constants
const BUILTIN_TYPES = /\b(?:bool|bytes|double|s?fixed(?:32|64)|float|[su]?int(?:32|64)|string)\b/





export const protobuf = new Grammar('protobuf', {
	'class-name': [
		{
			pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
			lookbehind: true,
		},
		{
			pattern: /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s*\))/,
			lookbehind: true,
		},
	],
	'keyword': /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
	'function': /\b[a-z_]\w*(?=\s*\()/i,
})

protobuf.insertBefore('operator', {
	'map': {
		pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i,
		alias: 'class-name',
		inside: {
			'punctuation': /[<>.,]/,
			'builtin': BUILTIN_TYPES,
		},
	},
	'builtin': BUILTIN_TYPES,
	'positional-class-name': {
		pattern: /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i,
		alias: 'class-name',
		inside: {
			'punctuation': /\./,
		},
	},
	'annotation': {
		pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i,
		lookbehind: true,
	},
})
