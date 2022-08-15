// Module imports
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import { PrismoidContext } from './PrismoidContext.js'





export function Prismoid(props) {
	const {
		children,
		language,
		source,
	} = props

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
			{children}
		</PrismoidContext.Provider>
	)
}

Prismoid.propTypes = {
	children: PropTypes.node,
	language: PropTypes.string,
	source: PropTypes.string,
}
