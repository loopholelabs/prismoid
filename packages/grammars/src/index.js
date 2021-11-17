import { clike } from './grammars/clike.js'
import { go } from './grammars/go.js'
import { Grammar } from './structures/Grammar.js'
import { GrammarManager } from './structures/GrammarManager.js'
import { javascript } from './grammars/javascript.js'
import { regex } from './grammars/regex.js'
import aliases from './aliases.js'

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
