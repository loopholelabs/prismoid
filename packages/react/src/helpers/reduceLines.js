// Module imports
import { Fragment } from 'react'
import { Token } from '@prismoid/core'





// Local imports
import { LineRenderer } from '../LineRenderer.js'
import { TokenRenderer } from '../TokenRenderer.js'





export function reduceLines(accumulator, token, index, originalArray) {
	let targetArray = accumulator[accumulator.length - 1]

	if (!Array.isArray(targetArray)) {
		targetArray = []
		accumulator.push(targetArray)
	}

	if (token instanceof Token) {
		targetArray.push((
			<TokenRenderer
				key={targetArray.length}
				{...token} />
		))
	}

	if (typeof token === 'string') {
		let currentString = ''

		// Walk the string
		for (const character of token) {
			if (character === '\n') {
				// Push the current parsed string onto the array and reset the variable
				if (currentString) {
					targetArray.push(currentString)
					currentString = ''
				}

				// Create an array for the next line and push it onto the accumulator
				targetArray = []
				accumulator.push(targetArray)
			} else {
				// Push characters into the current parsed string
				currentString += character
			}
		}

		// If the current parsed string isn't empty after walking the string, it
		// means the token string did not end with a new line so we still need to
		// push the remaining string onto the target array
		if (currentString) {
			targetArray.push(currentString)
		}
	}

	if (index === (originalArray.length - 1)) {
		return accumulator.map((line, lineIndex, originalLinesArray) => {
			const isLastLine = lineIndex === (originalLinesArray.length - 1)

			return (
				<LineRenderer
					key={lineIndex}
					includeNewLine={!isLastLine}>
					{line}
				</LineRenderer>
			)
		})
	}

	return accumulator
}
