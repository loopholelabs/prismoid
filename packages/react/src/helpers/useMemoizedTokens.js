// Module imports
import { useMemo } from 'react'





// Local imports
import { mapTokens } from './mapTokens.js'
import { reduceLines } from './reduceLines.js'
import { usePrismoid } from '../usePrismoid.js'





export function useMemoizedTokens(props) {
	const {
		children,
		language,
		wrapLines,
	} = props

	const { tokenizeWithLanguage } = usePrismoid({
		languages: [language],
	})

	const tokens = useMemo(() => {
		return tokenizeWithLanguage(children, language)
	}, [
		children,
		language,
		tokenizeWithLanguage,
	])

	return useMemo(() => {
		if (wrapLines) {
			return tokens.reduce(reduceLines, [])
		}

		return tokens.map(mapTokens)
	}, [
		mapTokens,
		tokens,
	])
}
