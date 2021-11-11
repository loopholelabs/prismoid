export class Token {
	/**
	 * The alias(es) of the token.
	 */
	alias = null

	/**
	 * The strings or tokens contained by this token.
	 *
	 * This will be a token stream if the pattern matched also defined an `inside` grammar.
	 */
	content = null

	/**
	 * The type of the token.
	 */
	type = null

	/**
	 * Creates a new token.
	 */
	constructor(type, content, alias, matchedString) {
		this.alias = alias
		this.content = content
		this.type = type

		// Copy of the full string this token was created from
		this.length = (matchedString || '').length | 0
	}
}
