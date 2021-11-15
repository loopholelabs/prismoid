// Module imports
const { expect } = require('chai')





// Local imports
const { Token } = require('../../dist')





describe('LinkedList', () => {
	describe('new Token', () => {
		it('creates a new token', () => {
			const type = 'foo'
			const content = 'bar'
			const alias = undefined
			const matchedString = content

			const token = new Token(type, content, alias, matchedString)

			expect(token).to.be.an.instanceOf(Token)
			expect(token.alias).to.equal(alias)
			expect(token.content).to.equal(content)
			expect(token.type).to.equal(type)
			expect(token.length).to.equal(content.length)
		})
	})
})
