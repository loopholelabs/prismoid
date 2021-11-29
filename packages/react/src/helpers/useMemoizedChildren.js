// Module imports
import { useMemo } from 'react'





export function useMemoizedChildren(props) {
	const {
		children,
		insertFinalNewline,
		trimFinalNewlines,
	} = props

	return useMemo(() => {
		let processedChildren = children

		if (trimFinalNewlines) {
			processedChildren = processedChildren.replace(/\n+$/gu, '')
		}

		if (insertFinalNewline) {
			processedChildren = processedChildren.replace(/\n*$/, '\n')
		}

		return processedChildren
	}, [
		children,
		insertFinalNewline,
		trimFinalNewlines,
	])
}
