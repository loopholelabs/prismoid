/**
 * @param {RegExp} pattern
 * @param {number} position
 * @param {string} text
 * @param {boolean} lookbehind
 * @returns {RegExpExecArray | null}
 */
export function matchPattern(pattern, position, text, lookbehind) {
	pattern.lastIndex = position

	const match = pattern.exec(text)

	if (match && lookbehind && match[1]) {
		// change the match to remove the text matched by the Prism lookbehind group
		const lookbehindLength = match[1].length
		match.index += lookbehindLength
		match[0] = match[0].slice(lookbehindLength)
	}

	return match
}
