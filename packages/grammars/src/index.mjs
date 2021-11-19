import { clike } from './grammars/clike.mjs'
import { go } from './grammars/go.mjs'
import { Grammar } from './structures/Grammar.mjs'
import { GrammarManager } from './structures/GrammarManager.mjs'
import { javascript } from './grammars/javascript.mjs'
import { regex } from './grammars/regex.mjs'
import aliases from './aliases.mjs'

export {
	// Grammars
	clike,
	go,
	javascript,
	regex,

	// Utilities
	aliases,
	Grammar,
	GrammarManager,
}
