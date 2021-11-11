// Local imports
import { expect } from 'chai'
import { Token } from '../../src/structures/Token.js'
import { tokenize } from '../../src/helpers/tokenize.js'





function testTokens({ grammar, code, expected }) {
	const tokens = tokenize(code, grammar)
	expect(tokens).to.deep.equal(expected)
}

describe('tokenize()', function () {
	describe('Greedy matching', function () {
		it('should correctly handle tokens with the same name', function () {
			const code = '// /*\n/* comment */'
			const grammar = {
				'comment': [
					/\/\/.*/,
					{
						pattern: /\/\*[\s\S]*?(?:\*\/|$)/,
						greedy: true
					}
				]
			}
			const tokens = tokenize(code, grammar)

			expect(tokens).to.deep.equal([
				new Token('comment', '// /*', undefined, '// /*'),
				'\n',
				new Token('comment', '/* comment */', undefined, '/* comment */'),
			])
		})

		it('should support patterns with top-level alternatives that do not contain the lookbehind group', function () {
			const grammar = {
				'a': /'[^']*'/,
				'b': {
					// This pattern has 2 top-level alternatives:  foo  and  (^|[^\\])"[^"]*"
					pattern: /foo|(^|[^\\])"[^"]*"/,
					lookbehind: true,
					greedy: true
				}
			}
			const code = 'foo "bar" \'baz\''
			const tokens = tokenize(code, grammar)

			expect(tokens).to.deep.equal([
				new Token('b', 'foo', undefined, 'foo'),
				' ',
				new Token('b', '"bar"', undefined, '"bar"'),
				' ',
				new Token('a', '\'baz\'', undefined, '\'baz\''),
			])
		})

		it('should correctly rematch tokens', function () {
			const grammar = {
				'a': {
					pattern: /'[^'\r\n]*'/,
				},
				'b': {
					pattern: /"[^"\r\n]*"/,
					greedy: true,
				},
				'c': {
					pattern: /<[^>\r\n]*>/,
					greedy: true,
				}
			}
			const code = `<'> '' ''\n<"> "" ""`
			const tokens = tokenize(code, grammar)
			expect(tokens).to.deep.equal([
				new Token('c', '<\'>', undefined, '<\'>'),
				' \'',
				new Token('a', '\' \'', undefined, '\' \''),
				'\'\n',
				new Token('c', '<">', undefined, '<">'),
				' ',
				new Token('b', '""', undefined, '""'),
				' ',
				new Token('b', '""', undefined, '""'),
			])
		})

		it('should always match tokens against the whole text', function () {
			// this is to test for a bug where greedy tokens where matched like non-greedy ones if the token stream ended on
			// a string
			const grammar = {
				'a': /a/,
				'b': {
					pattern: /^b/,
					greedy: true
				}
			}
			const code = 'bab'
			const tokens = tokenize(code, grammar)

			expect(tokens).to.deep.equal([
				new Token('b', 'b', undefined, 'b'),
				new Token('a', 'a', undefined, 'a'),
				'b',
			])
		})

		it('issue 3052 (https://github.com/PrismJS/prism/issues/3052)', function () {
			// If a greedy pattern creates an empty token at the end of the string, then this token should be discarded
			const grammar = {
				'oh-no': {
					pattern: /$/,
					greedy: true
				}
			}
			const code = 'foo'
			const tokens = tokenize(code, grammar)

			expect(tokens).to.deep.equal(['foo'])
		})
	})
})
