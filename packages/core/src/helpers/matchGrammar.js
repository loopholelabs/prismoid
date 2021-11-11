// Module imports
import { LinkedList } from '../structures/LinkedList.js'
import { matchPattern } from './matchPattern.js'
import { tokenize } from './tokenize.js'
import { Token } from '../structures/Token.js'





/**
 * @param {string} text
 * @param {LinkedList<string | Token>} tokenList
 * @param {any} grammar
 * @param {LinkedListNode<string | Token>} startNode
 * @param {number} startPosition
 * @param {RematchOptions} [rematch]
 * @returns {void}
 * @private
 *
 * @typedef RematchOptions
 * @property {string} cause
 * @property {number} reach
 */
export function matchGrammar(text, tokenList, grammar, startNode, startPosition, rematch) {
	for (const token in grammar) {
		if (!grammar.hasOwnProperty(token) || !grammar[token]) {
			continue
		}

		let patterns = grammar[token]

		if (!Array.isArray(patterns)) {
			patterns = [patterns]
		}

		let patternIndex = 0
		while (patternIndex < patterns.length) {
			if (rematch && rematch.cause == `${token},${patternIndex}`) {
				return
			}

			const patternObject = patterns[patternIndex]
			const inside = patternObject.inside
			const lookbehind = !!patternObject.lookbehind
			const greedy = !!patternObject.greedy
			const alias = patternObject.alias

			if (greedy && !patternObject.pattern.global) {
				// Without the global flag, lastIndex won't work
				const flags = patternObject.pattern.toString().match(/[imsuy]*$/)[0]
				patternObject.pattern = RegExp(patternObject.pattern.source, flags + 'g')
			}

			/** @type {RegExp} */
			const pattern = patternObject.pattern || patternObject

			// iterate the token list and keep track of the current token/string position
			let currentNode = startNode.next
			let position = startPosition

			// while (currentNode !== tokenList.tail) {
			for (; currentNode !== tokenList.tail; position += currentNode.value.length, currentNode = currentNode.next) {
				if (rematch && (position >= rematch.reach)) {
					break
				}

				if (tokenList.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					return
				}

				let string = currentNode.value

				if (string instanceof Token) {
					continue
				}

				let removeCount = 1 // this is the to parameter of removeBetween
				let match = null

				if (greedy) {
					match = matchPattern(pattern, position, text, lookbehind)

					if (!match || (match.index >= text.length)) {
						break
					}

					const from = match.index
					const to = match.index + match[0].length
					let p = position

					// find the node that contains the match
					p += currentNode.value.length

					while (from >= p) {
						currentNode = currentNode.next
						p += currentNode.value.length
					}

					// adjust position (and p)
					p -= currentNode.value.length
					position = p

					// if the current node is a Token, then the match starts inside another Token, which is invalid
					if (currentNode.value instanceof Token) {
						continue
					}

					// find the last node which is affected by this match
					let lastAffectedNodeIndex = currentNode
					while (lastAffectedNodeIndex !== tokenList.tail && (p < to || typeof lastAffectedNodeIndex.value === 'string')) {
						removeCount += 1
						p += lastAffectedNodeIndex.value.length
						lastAffectedNodeIndex = lastAffectedNodeIndex.next
					}
					removeCount -= 1

					// replace with the new match
					string = text.slice(position, p)
					match.index -= position
				} else {
					match = matchPattern(pattern, 0, string, lookbehind)
					if (!match) {
						continue
					}
				}

				const from = match.index
				const matchString = match[0]
				const before = string.slice(0, from)
				const after = string.slice(from + matchString.length)

				const reach = position + string.length

				if (rematch && (reach > rematch.reach)) {
					rematch.reach = reach
				}

				let removeFrom = currentNode.prev

				if (before) {
					removeFrom = tokenList.addAfter(removeFrom, before)
					position += before.length
				}

				tokenList.removeRange(removeFrom, removeCount)

				const wrapped = new Token(token, inside ? tokenize(matchString, inside) : matchString, alias, matchString)
				currentNode = tokenList.addAfter(removeFrom, wrapped)

				if (after) {
					tokenList.addAfter(currentNode, after)
				}

				if (removeCount > 1) {
					// at least one Token object was removed, so we have to do some rematching
					// this can only happen if the current pattern is greedy

					/** @type {RematchOptions} */
					const nestedRematch = {
						cause: `${token},${patternIndex}`,
						reach,
					}
					matchGrammar(text, tokenList, grammar, currentNode.prev, position, nestedRematch)

					// the reach might have been extended because of the rematching
					if (rematch && (nestedRematch.reach > rematch.reach)) {
						rematch.reach = nestedRematch.reach
					}
				}
			}

			patternIndex += 1
		}
	}
}
