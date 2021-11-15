// Module imports
const { expect } = require('chai')





// Local imports
const { LinkedList } = require('../../dist')





describe('LinkedList', () => {
	describe('new LinkedList', () => {
		let list = null

		before(() => {
			list = new LinkedList
		})

		after(() => {
			list = undefined
		})

		it('creates a new LinkedList', () => {
			expect(list).to.be.instanceOf(LinkedList)
		})

		it('has no nodes besides the head and tail', () => {
			expect(list.length).to.equal(0)
		})

		describe('list.head', () => {
			it('has no value', () => {
				expect(list.head.value).to.be.null
			})

			it('precedes the tail', () => {
				expect(list.head.next).to.equal(list.tail)
			})
		})

		describe('list.tail', () => {
			it('has no value', () => {
				expect(list.tail.value).to.be.null
			})

			it('follows the head', () => {
				expect(list.tail.prev).to.equal(list.head)
			})
		})
	})

	describe('addAfter()', () => {
		let expectedNewNode = null
		let list = null
		let newNode = null

		before(() => {
			list = new LinkedList
			newNode = list.addAfter(list.head, 'foo')
			expectedNewNode = {
				value: 'foo',
				prev: list.head,
				next: list.tail,
			}
		})

		after(() => {
			list = undefined
			newNode = undefined
		})

		it('adds a node', () => {
			expect(list.head.next).to.deep.equal(expectedNewNode)
			expect(list.tail.prev).to.deep.equal(expectedNewNode)
		})

		it('returns the new node', () => {
			expect(newNode).to.deep.equal(expectedNewNode)
		})

		it('increases the list\'s length', () => {
			expect(list.length).to.equal(1)
		})
	})

	describe('removeRange()', () => {
		let list = null
		let nodes = null

		beforeEach(() => {
			const valuesToAdd = ['foo', 'bar', 'baz']
			list = new LinkedList
			nodes = []

			valuesToAdd.reduce((currentNode, value) => {
				const newNode = list.addAfter(currentNode, value)
				nodes.push(newNode)
				return newNode
			}, list.head)
		})

		afterEach(() => {
			list = undefined
			nodes = undefined
		})

		it('removes a single node', () => {
			list.removeRange(list.head, 1)
			expect(list.length).to.equal(2)
			expect(list.head.next).to.deep.equal(nodes[1])
			expect(list.tail.prev).to.deep.equal(nodes[2])
		})

		it('removes multiple nodes', () => {
			list.removeRange(list.head, 2)
			expect(list.length).to.equal(1)
			expect(list.head.next).to.deep.equal(nodes[2])
			expect(list.tail.prev).to.deep.equal(nodes[2])
		})

		it('removes all nodes', () => {
			list.removeRange(list.head, 3)
			expect(list.length).to.equal(0)
			expect(list.head.next).to.deep.equal(list.tail)
			expect(list.tail.prev).to.deep.equal(list.head)
		})

		it('removes all nodes when remove count is higher than list length', () => {
			list.removeRange(list.head, list.length * 10)
			expect(list.length).to.equal(0)
			expect(list.head.next).to.deep.equal(list.tail)
			expect(list.tail.prev).to.deep.equal(list.head)
		})
	})

	describe('toArray()', () => {
		it('returns an empty array', () => {
			const list = new LinkedList
			expect(list.toArray()).to.deep.equal([])
		})

		it('returns an array with items', () => {
			const list = new LinkedList

			list.addAfter(list.head, 'foo')

			expect(list.toArray()).to.deep.equal(['foo'])
		})
	})
})
