// Module imports
import {
	Children,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { PrismoidContext } from './PrismoidContext.js'
import { Toolbar } from './Toolbar.js'





export function Prismoid(props) {
	const {
		children,
		className,
		firstLineNumber,
		insertFinalNewline,
		language,
		showLineNumbers,
		source,
		trimFinalNewlines,
		wrapLines,
	} = props

	const hasToolbar = useMemo(() => {
		return Children
			.toArray(children)
			.some(child => child.type === Toolbar(props))
	}, [children])

	const providerValue = useMemo(() => {
		return {
			className,
			firstLineNumber,
			insertFinalNewline,
			language,
			showLineNumbers,
			source,
			trimFinalNewlines,
			wrapLines,
		}
	}, [
		className,
		firstLineNumber,
		insertFinalNewline,
		language,
		showLineNumbers,
		source,
		trimFinalNewlines,
		wrapLines,
	])

	return (
		<PrismoidContext.Provider value={providerValue}>
			{hasToolbar && (
				<div className="code-toolbar">
					{children}
				</div>
			)}

			{!hasToolbar && (
				{children}
			)}
		</PrismoidContext.Provider>
	)
}

Prismoid.defaultProps = {
	children: null,
	className: '',
	firstLineNumber: 1,
	insertFinalNewline: false,
	language: '',
	showLineNumbers: false,
	source: '',
	trimFinalNewlines: false,
	wrapLines: false,
}

Prismoid.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	firstLineNumber: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	insertFinalNewline: PropTypes.bool,
	language: PropTypes.string,
	showLineNumbers: PropTypes.bool,
	source: PropTypes.string,
	trimFinalNewlines: PropTypes.bool,
	wrapLines: PropTypes.bool,
}
