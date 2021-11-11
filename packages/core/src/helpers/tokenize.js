// Module imports
import { LinkedList } from '../structures/LinkedList.js'
import { matchGrammar } from './matchGrammar.js'





export function tokenize(text, grammar) {
	const grammarRules = grammar.rules
	const { rest } = grammarRules

	if (rest) {
		for (const token in rest) {
			grammarRules[token] = rest[token]
		}

		delete grammarRules.rest
	}

	const tokenList = new LinkedList()

	tokenList.addAfter(tokenList.head, text)

	matchGrammar(text, tokenList, grammarRules, tokenList.head, 0)

	return tokenList.toArray()
}
