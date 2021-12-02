// Module imports
import { useMemo } from 'react'





export function useMemoizedStyle(props) {
	const { firstLineNumber } = props

	return useMemo(() => {
		if (firstLineNumber) {
			return {
				counterReset: `linenumber ${firstLineNumber}`,
			}
		}

		return {}
	}, [firstLineNumber])
}
