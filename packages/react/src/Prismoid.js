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
		language,
		source,
	} = props

	const hasToolbar = useMemo(() => {
		return Children
			.toArray(children)
			.some(child => child.type === Toolbar(props))
	}, [children])

	const providerValue = useMemo(() => {
		return {
			language,
			source,
		}
	}, [
		language,
		source,
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

Prismoid.propTypes = {
	children: PropTypes.node,
	language: PropTypes.string,
	source: PropTypes.string,
}
