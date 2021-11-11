export class LinkedList {
	head = null
	tail = null
	length = 0

	/**
	 * Adds a new node with the given value to the list.
	 */
	addAfter(node, value) {
		const next = node.next

		const newNode = {
			value,
			prev: node,
			next,
		}

		node.next = newNode
		next.prev = newNode
		this.length += 1

		return newNode
	}

	constructor() {
		this.head = {
			value: null,
			prev: null,
			next: null,
		}
		this.tail = {
			value: null,
			prev: null,
			next: null,
		}

		this.head.next = this.tail
		this.tail.prev = this.head
	}

	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 */
	removeRange(node, count) {
		let next = node.next
		let index = 0

		while ((index < count) && (next !== this.tail)) {
			next = next.next
			index += 1
		}

		node.next = next
		next.prev = node
		this.length -= index
	}

	toArray() {
		const array = []
		let node = this.head.next

		while (node !== this.tail) {
			array.push(node.value)
			node = node.next
		}

		return array
	}
}
