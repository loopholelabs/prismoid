// Module imports
import { useMemo } from 'react'





export function useMemoizedClassNames(props) {
	const {
		className,
		language,
		showLineNumbers,
	} = props

	return useMemo(() => {
		return {
			pre: `${className || ''} language-${language} ${showLineNumbers ? 'line-numbers' : ''}`,
			code: `language-${language}`,
		}
	}, [
		className,
		language,
		showLineNumbers,
	])
}
